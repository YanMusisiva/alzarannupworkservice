import { z } from 'zod';
import { CITIES, SERVICE_CATEGORIES } from './types';

const phone = z.string().trim().regex(/^\+?[0-9 ]{9,16}$/, 'Numero de telephone invalide.');
export const registerSchema = z.object({
  name: z.string().trim().min(2).max(80), phone, city: z.enum(CITIES),
  role: z.enum(['client', 'provider']),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caracteres.'),
});
export const loginSchema = z.object({ phone, password: z.string().min(1) });
export const requestSchema = z.object({
  title: z.string().trim().min(5).max(120), description: z.string().trim().min(20).max(2000),
  city: z.enum(CITIES), category: z.enum(SERVICE_CATEGORIES),
  neighborhood: z.string().trim().max(100).optional(), budget: z.string().trim().max(80).optional(), phone,
});
export const providerSchema = z.object({
  headline: z.string().trim().min(5).max(120), description: z.string().trim().min(30).max(2000),
  category: z.enum(SERVICE_CATEGORIES), yearsExperience: z.coerce.number().int().min(0).max(70),
});
