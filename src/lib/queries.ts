import 'server-only';
import { getDb, isDatabaseConfigured } from './db';
import { demoProviders, demoRequests } from './demo-data';
import type { PublicProvider, ServiceRequest } from './types';

export async function listProviders(city?: string, category?: string) {
  if (!isDatabaseConfigured()) {
    return demoProviders.filter(provider => (!city || provider.city === city) && (!category || provider.category === category));
  }
  return getDb()<PublicProvider[]>`
    select u.id, u.name, u.city, p.category, p.headline, p.description,
      u.phone, p.years_experience as "yearsExperience", p.verified
    from provider_profiles p join users u on u.id = p.user_id
    where p.is_active = true
      and (${city ?? null}::text is null or u.city = ${city ?? null})
      and (${category ?? null}::text is null or p.category = ${category ?? null})
    order by p.verified desc, p.created_at desc`;
}

export async function listRequests(city?: string, category?: string) {
  if (!isDatabaseConfigured()) {
    return demoRequests.filter(request => (!city || request.city === city) && (!category || request.category === category));
  }
  return getDb()<ServiceRequest[]>`
    select r.id, u.name as "clientName", r.city, r.category, r.title,
      r.description, r.neighborhood, r.contact_phone as phone, r.budget,
      r.status, r.created_at::text as "createdAt"
    from service_requests r join users u on u.id = r.client_id
    where r.status = 'open'
      and (${city ?? null}::text is null or r.city = ${city ?? null})
      and (${category ?? null}::text is null or r.category = ${category ?? null})
    order by r.created_at desc`;
}

export async function getDashboardData(userId: string) {
  const requests = await getDb()`select id, title, city, category, status, created_at as "createdAt" from service_requests where client_id = ${userId} order by created_at desc`;
  const profiles = await getDb()`select category, headline, verified, is_active as "isActive" from provider_profiles where user_id = ${userId}`;
  return { requests, profile: profiles[0] ?? null };
}
