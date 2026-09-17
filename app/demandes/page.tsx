import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { RequestCard } from '@/components/RequestCard';
import { SearchFilters } from '@/components/SearchFilters';
import { listRequests } from '@/lib/queries';
import { isDatabaseConfigured } from '@/lib/db';

export const metadata: Metadata = { title: 'Demandes de services' };
export const dynamic = 'force-dynamic';

export default async function RequestsPage({ searchParams }: { searchParams: Promise<{ ville?: string; categorie?: string }> }) {
  const filters = await searchParams;
  const requests = await listRequests(filters.ville, filters.categorie);
  return <><Header /><main className="min-h-screen bg-slate-50/70"><div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
    {!isDatabaseConfigured() && <p className="mb-6 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-medium text-violet-800">Mode démonstration — configurez PostgreSQL pour afficher les vraies demandes.</p>}
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="font-bold uppercase tracking-[.16em] text-violet-600">Opportunités locales</p><h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Les habitants ont besoin de vous</h1></div><Link className="rounded-full bg-primary px-6 py-3 font-bold text-white" href="/proposer">Proposer mes services</Link></div>
    <div className="mt-8"><SearchFilters action="/demandes" /></div>
    {requests.length ? <div className="mt-8 grid gap-6 lg:grid-cols-2">{requests.map(r => <RequestCard key={r.id} request={r} />)}</div> : <div className="mt-10 rounded-2xl border border-dashed bg-white p-10 text-center text-muted-foreground">Aucune demande ouverte ne correspond a cette recherche.</div>}
  </div></main></>;
}
