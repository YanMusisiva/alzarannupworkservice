'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createSession, destroySession, hashPassword, requireUser, verifyPassword } from '@/lib/auth';
import { getDb, isDatabaseConfigured } from '@/lib/db';
import { loginSchema, providerSchema, registerSchema, requestSchema } from '@/lib/validation';

const value = (data: FormData, key: string) => String(data.get(key) ?? '');
const cleanPhone = (phone: string) => phone.replace(/\s+/g, '');
const fail = (path: string, message: string): never => redirect(`${path}?erreur=${encodeURIComponent(message)}`);
const requireDatabase = (path: string) => {
  if (!isDatabaseConfigured()) fail(path, 'La base PostgreSQL doit etre configuree avant de creer ou utiliser un compte. Consultez le README.');
};

export async function registerAction(formData: FormData) {
  requireDatabase('/inscription');
  const parsed = registerSchema.safeParse({
    name: value(formData, 'name'), phone: value(formData, 'phone'), city: value(formData, 'city'),
    role: value(formData, 'role'), password: value(formData, 'password'),
  });
  if (!parsed.success) fail('/inscription', parsed.error.issues[0].message);
  const data = parsed.data!;
  const sql = getDb();
  try {
    const users = await sql<{ id: string }[]>`
      insert into users (name, phone, city, role, password_hash)
      values (${data.name}, ${cleanPhone(data.phone)}, ${data.city}, ${data.role}, ${hashPassword(data.password)})
      returning id`;
    await createSession(users[0].id);
  } catch (error) {
    if (typeof error === 'object' && error && 'code' in error && error.code === '23505') {
      fail('/inscription', 'Ce numero de telephone possede deja un compte.');
    }
    throw error;
  }
  redirect(data.role === 'provider' ? '/proposer' : '/publier');
}

export async function loginAction(formData: FormData) {
  requireDatabase('/connexion');
  const parsed = loginSchema.safeParse({ phone: value(formData, 'phone'), password: value(formData, 'password') });
  if (!parsed.success) fail('/connexion', 'Informations de connexion invalides.');
  const data = parsed.data!;
  const users = await getDb()<({ id: string; passwordHash: string })[]>`
    select id, password_hash as "passwordHash" from users where phone = ${cleanPhone(data.phone)} limit 1`;
  if (!users[0] || !verifyPassword(data.password, users[0].passwordHash)) {
    fail('/connexion', 'Numero ou mot de passe incorrect.');
  }
  await createSession(users[0].id);
  redirect('/compte');
}

export async function logoutAction() {
  await destroySession();
  redirect('/');
}

export async function createRequestAction(formData: FormData) {
  requireDatabase('/publier');
  const user = await requireUser();
  const parsed = requestSchema.safeParse({
    title: value(formData, 'title'), description: value(formData, 'description'), city: value(formData, 'city'),
    category: value(formData, 'category'), neighborhood: value(formData, 'neighborhood') || undefined,
    budget: value(formData, 'budget') || undefined, phone: value(formData, 'phone'),
  });
  if (!parsed.success) fail('/publier', parsed.error.issues[0].message);
  const d = parsed.data!;
  await getDb()`insert into service_requests (client_id, city, category, title, description, neighborhood, budget, contact_phone)
    values (${user.id}, ${d.city}, ${d.category}, ${d.title}, ${d.description}, ${d.neighborhood ?? null}, ${d.budget ?? null}, ${cleanPhone(d.phone)})`;
  revalidatePath('/demandes');
  redirect('/compte?succes=demande');
}

export async function saveProviderAction(formData: FormData) {
  requireDatabase('/proposer');
  const user = await requireUser('provider');
  const parsed = providerSchema.safeParse({
    headline: value(formData, 'headline'), description: value(formData, 'description'),
    category: value(formData, 'category'), yearsExperience: value(formData, 'yearsExperience'),
  });
  if (!parsed.success) fail('/proposer', parsed.error.issues[0].message);
  const d = parsed.data!;
  await getDb()`insert into provider_profiles (user_id, category, headline, description, years_experience)
    values (${user.id}, ${d.category}, ${d.headline}, ${d.description}, ${d.yearsExperience})
    on conflict (user_id) do update set category = excluded.category, headline = excluded.headline,
      description = excluded.description, years_experience = excluded.years_experience, updated_at = now()`;
  revalidatePath('/prestataires');
  redirect('/compte?succes=profil');
}
