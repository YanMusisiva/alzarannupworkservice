import { Clock3, MapPin, Phone } from 'lucide-react';
import type { ServiceRequest } from '@/lib/types';

export function RequestCard({ request }: { request: ServiceRequest }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-200 hover:shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">{request.category}</span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock3 className="h-3.5 w-3.5" />{new Date(request.createdAt).toLocaleDateString('fr-CD')}</span>
      </div>
      <h2 className="mt-4 text-xl font-bold">{request.title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{request.description}</p>
      <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
        <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-primary" />{request.city}{request.neighborhood ? `, ${request.neighborhood}` : ''}</span>
        {request.budget && <span>Budget : {request.budget}</span>}
      </div>
      <div className="mt-5 flex items-center justify-between border-t pt-4">
        <span className="text-sm">Publie par <strong>{request.clientName}</strong></span>
        <a href={`tel:${request.phone}`} className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white"><Phone className="h-4 w-4" /> Appeler</a>
      </div>
    </article>
  );
}
