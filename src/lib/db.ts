import 'server-only';
import postgres from 'postgres';

const globalForDb = globalThis as unknown as { alzarSql?: ReturnType<typeof postgres> };

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function getDb() {
  if (!process.env.DATABASE_URL) throw new Error('La base de donnees Alzar Group doit etre configuree pour effectuer cette action.');
  if (!globalForDb.alzarSql) {
    globalForDb.alzarSql = postgres(process.env.DATABASE_URL, {
      max: process.env.NODE_ENV === 'production' ? 10 : 3,
      ssl: process.env.DATABASE_SSL === 'false' ? false : 'require',
    });
  }
  return globalForDb.alzarSql;
}
