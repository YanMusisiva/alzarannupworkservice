import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { ProviderCard } from '@/components/ProviderCard';
import { SearchFilters } from '@/components/SearchFilters';
import { listProviders } from '@/lib/queries';
import { isDatabaseConfigured } from '@/lib/db';

export const metadata: Metadata = { title: 'Trouver un professionnel' };
export const dynamic = 'force-dynamic';

export default async function ProvidersPage({ searchParams }: { searchParams: Promise<{ ville?: string; categorie?: string }> }) {
  const filters = await searchParams;
  const providers = await listProviders(filters.ville, filters.categorie);
  return <><Header /><main className="min-h-screen bg-slate-50/70"><div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
    {!isDatabaseConfigured() && <p className="mb-6 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-medium text-violet-800">Mode démonstration — configurez PostgreSQL pour afficher les vrais prestataires.</p>}
    <p className="font-bold uppercase tracking-[.16em] text-violet-600">Prestataires locaux</p><h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Trouvez la personne qu'il vous faut</h1>
    <p className="mt-3 max-w-2xl text-muted-foreground">Filtrez par ville et par metier, consultez les profils puis appelez directement.</p>
    <div className="mt-8"><SearchFilters action="/prestataires" /></div>
    {providers.length ? <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{providers.map(p => <ProviderCard key={p.id} provider={p} />)}</div> : <div className="mt-10 rounded-2xl border border-dashed bg-white p-10 text-center text-muted-foreground">Aucun prestataire ne correspond encore a cette recherche.</div>}
  </div></main></>;
}
