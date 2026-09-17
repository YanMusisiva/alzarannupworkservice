import { BadgeCheck, BriefcaseBusiness, MapPin, Phone } from 'lucide-react';
import type { PublicProvider } from '@/lib/types';

export function ProviderCard({ provider }: { provider: PublicProvider }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald-100 to-violet-100 text-xl font-black text-violet-700">{provider.name.charAt(0)}</div>
        {provider.verified && <span className="flex items-center gap-1 text-sm font-medium text-emerald-700"><BadgeCheck className="h-4 w-4" /> Verifie</span>}
      </div>
      <h2 className="text-xl font-bold">{provider.name}</h2>
      <p className="mt-1 font-semibold text-primary">{provider.headline}</p>
      <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{provider.city}</span>
        <span className="flex items-center gap-1"><BriefcaseBusiness className="h-4 w-4" />{provider.yearsExperience} an(s)</span>
      </div>
      <p className="mt-4 line-clamp-4 flex-1 text-sm leading-6">{provider.description}</p>
      <a href={`tel:${provider.phone}`} className="mt-5 flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 font-semibold text-white transition group-hover:bg-primary">
        <Phone className="h-4 w-4" /> Appeler {provider.phone}
      </a>
    </article>
  );
}
