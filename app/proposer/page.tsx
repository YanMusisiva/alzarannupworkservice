import { Header } from '@/components/Header';
import { saveProviderAction } from '@/actions';
import { requireUser } from '@/lib/auth';
import { CategoryField, FormMessage, inputClass, labelClass, textareaClass } from '@/components/FormFields';

export const dynamic = 'force-dynamic';
export default async function OfferPage({ searchParams }: { searchParams: Promise<{ erreur?: string }> }) {
  await requireUser('provider'); const { erreur } = await searchParams;
  return <><Header /><main className="mx-auto max-w-2xl px-4 py-12"><div className="rounded-2xl border bg-card p-7 shadow-sm"><p className="font-bold text-primary">DEVENEZ VISIBLE</p><h1 className="mt-2 text-3xl font-bold">Presenter mes services</h1><p className="mt-2 text-muted-foreground">Expliquez clairement ce que vous savez faire et votre experience.</p><form action={saveProviderAction} className="mt-8 grid gap-5"><FormMessage error={erreur} /><CategoryField /><label className={labelClass}>Titre professionnel<input className={inputClass} name="headline" placeholder="Ex. Electricien residentiel disponible a Goma" required /></label><label className={labelClass}>Presentation<textarea className={textareaClass} name="description" placeholder="Votre experience, vos specialites et votre maniere de travailler..." required /></label><label className={labelClass}>Annees d'experience<input className={inputClass} name="yearsExperience" type="number" min="0" max="70" defaultValue="0" required /></label><button className="h-12 rounded-md bg-primary font-bold text-primary-foreground">Enregistrer mon profil</button></form></div></main></>;
}
