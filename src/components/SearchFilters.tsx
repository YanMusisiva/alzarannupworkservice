import { CITIES, SERVICE_CATEGORIES } from '@/lib/types';

export function SearchFilters({ action }: { action: string }) {
  return (
    <form action={action} className="premium-shadow grid gap-3 rounded-2xl border border-slate-200 bg-white p-3 sm:grid-cols-[1fr_1fr_auto]">
      <select name="ville" aria-label="Ville" className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:ring-2 focus:ring-emerald-500">
        <option value="">Toutes les villes</option>
        {CITIES.map(city => <option key={city}>{city}</option>)}
      </select>
      <select name="categorie" aria-label="Categorie" className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:ring-2 focus:ring-emerald-500">
        <option value="">Tous les services</option>
        {SERVICE_CATEGORIES.map(category => <option key={category}>{category}</option>)}
      </select>
      <button className="h-12 rounded-xl bg-primary px-7 font-bold text-white transition hover:bg-emerald-700">Rechercher</button>
    </form>
  );
}
