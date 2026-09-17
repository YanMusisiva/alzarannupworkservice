import 'server-only';
import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getDb, isDatabaseConfigured } from './db';
import type { SessionUser } from './types';

const SESSION_COOKIE = 'alzar_session';

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, 'hex');
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

const tokenHash = (token: string) => createHash('sha256').update(token).digest('hex');

export async function createSession(userId: string) {
  const token = randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + 30 * 86_400_000);
  await getDb()`insert into sessions (user_id, token_hash, expires_at) values (${userId}, ${tokenHash(token)}, ${expiresAt})`;
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production',
    path: '/', expires: expiresAt,
  });
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  if (!isDatabaseConfigured()) return null;
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const rows = await getDb()<SessionUser[]>`
    select u.id, u.name, u.phone, u.city, u.role
    from sessions s join users u on u.id = s.user_id
    where s.token_hash = ${tokenHash(token)} and s.expires_at > now() limit 1`;
  return rows[0] ?? null;
}

export async function requireUser(role?: SessionUser['role']) {
  const user = await getCurrentUser();
  if (!user) redirect('/connexion');
  if (role && user.role !== role) redirect('/compte');
  return user;
}

export async function destroySession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) await getDb()`delete from sessions where token_hash = ${tokenHash(token)}`;
  store.delete(SESSION_COOKIE);
}
