import Link from 'next/link';
import { ArrowRight, BadgeCheck, Check, MapPin, Search, ShieldCheck, Sparkles, Star, UsersRound } from 'lucide-react';
import { Header } from '@/components/Header';

const popularServices = [
  ['Electricite', 'Installations & depannages', '⚡'], ['Plomberie', 'Fuites & sanitaires', '🔧'],
  ['Construction', 'Travaux & renovation', '🏗️'], ['Nettoyage', 'Maison & bureau', '✨'],
  ['Menuiserie', 'Meubles sur mesure', '🪚'], ['Informatique', 'Assistance & reseaux', '💻'],
];

export default function Home() {
  return <><Header /><main className="overflow-hidden bg-white">
    <section className="relative border-b border-slate-100">
      <div className="absolute -right-48 -top-48 h-[520px] w-[520px] rounded-full bg-violet-100/70 blur-3xl" />
      <div className="absolute left-1/3 top-32 h-64 w-64 rounded-full bg-emerald-100/60 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800"><Sparkles className="h-4 w-4" /> Le talent local, enfin accessible</div>
          <h1 className="mt-7 max-w-3xl text-5xl font-bold leading-[1.04] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl">Les meilleurs services, <span className="text-primary">juste à côté.</span></h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Trouvez un professionnel de confiance à Beni, Goma ou Bunia. Décrivez votre besoin, comparez les profils et contactez directement la bonne personne.</p>
          <form action="/prestataires" className="premium-shadow mt-9 flex max-w-2xl flex-col rounded-2xl border border-slate-200 bg-white p-2 sm:flex-row">
            <div className="flex flex-1 items-center gap-3 px-4"><Search className="h-5 w-5 text-slate-400" /><input name="categorie" className="h-12 w-full bg-transparent outline-none" placeholder="Quel service recherchez-vous ?" /></div>
            <div className="flex items-center gap-2 border-t px-4 sm:border-l sm:border-t-0"><MapPin className="h-5 w-5 text-violet-600" /><select name="ville" className="h-12 bg-transparent pr-4 outline-none"><option value="">Toutes les villes</option><option>Beni</option><option>Goma</option><option>Bunia</option></select></div>
            <button className="h-12 rounded-xl bg-primary px-6 font-bold text-white transition hover:bg-emerald-700">Rechercher</button>
          </form>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500"><span className="font-semibold text-slate-800">Populaire :</span><span>Électricien</span><span>Plombier</span><span>Nettoyage</span></div>
        </div>
        <div className="relative mx-auto w-full max-w-lg">
          <div className="purple-glow relative overflow-hidden rounded-[32px] bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-700 p-7 text-white sm:p-9">
            <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full border-[32px] border-white/10" />
            <p className="text-sm font-bold uppercase tracking-[.18em] text-violet-200">Professionnel recommandé</p>
            <div className="mt-8 flex items-center gap-4"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-2xl font-black text-violet-700">PK</div><div><div className="flex items-center gap-2"><h2 className="text-xl font-bold">Patrick Kambale</h2><BadgeCheck className="h-5 w-5 text-emerald-300" /></div><p className="mt-1 text-violet-100">Electricien résidentiel & solaire</p></div></div>
            <div className="mt-8 grid grid-cols-3 gap-3 border-y border-white/15 py-5 text-center"><div><strong className="block text-xl">4.9</strong><span className="text-xs text-violet-200">Note moyenne</span></div><div><strong className="block text-xl">8 ans</strong><span className="text-xs text-violet-200">Expérience</span></div><div><strong className="block text-xl">Beni</strong><span className="text-xs text-violet-200">Ville</span></div></div>
            <div className="mt-6 flex items-center justify-between"><div className="flex text-amber-300">{Array.from({length: 5}).map((_,i)=><Star key={i} className="h-4 w-4 fill-current" />)}</div><Link href="/prestataires" className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-violet-700">Voir le profil <ArrowRight className="h-4 w-4" /></Link></div>
          </div>
          <div className="absolute -bottom-6 -left-5 rounded-2xl border bg-white p-4 shadow-xl"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-100 text-primary"><Check className="h-5 w-5" /></span><div><strong className="block text-sm">Contact direct</strong><span className="text-xs text-slate-500">Simple et sans intermédiaire</span></div></div></div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="font-bold uppercase tracking-[.16em] text-violet-600">Explorez les métiers</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Des professionnels pour chaque besoin</h2></div><Link href="/prestataires" className="flex items-center gap-2 font-bold text-primary">Voir tous les services <ArrowRight className="h-4 w-4" /></Link></div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{popularServices.map(([name,desc,icon]) => <Link href={`/prestataires?categorie=${encodeURIComponent(name)}`} key={name} className="group flex items-center gap-5 rounded-2xl border border-slate-200 p-5 transition hover:border-violet-300 hover:shadow-lg"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-50 text-2xl transition group-hover:bg-violet-50">{icon}</span><div><h3 className="font-bold text-slate-900">{name}</h3><p className="mt-1 text-sm text-slate-500">{desc}</p></div><ArrowRight className="ml-auto h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-violet-600" /></Link>)}</div>
    </section>

    <section className="bg-slate-950 py-20 text-white"><div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8"><div><span className="text-sm font-bold uppercase tracking-[.16em] text-emerald-400">Comment ça marche</span><h2 className="mt-4 text-4xl font-bold tracking-tight">Un service trouvé en quelques minutes.</h2><p className="mt-5 max-w-xl leading-7 text-slate-400">Pas d'enchères compliquées. Pas de formulaires interminables. Alzar Group privilégie un contact local, humain et rapide.</p><Link href="/publier" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold">Publier gratuitement <ArrowRight className="h-4 w-4" /></Link></div><div className="grid gap-4">{[['01','Décrivez votre besoin','Indiquez le métier, la ville et les détails utiles.'],['02','Découvrez les bons profils','Comparez expérience, spécialité et proximité.'],['03','Échangez directement','Appelez le professionnel qui vous inspire confiance.']].map(([n,t,d])=><div key={n} className="flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-5"><span className="font-black text-emerald-400">{n}</span><div><h3 className="font-bold">{t}</h3><p className="mt-1 text-sm leading-6 text-slate-400">{d}</p></div></div>)}</div></div></section>

    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="overflow-hidden rounded-[32px] bg-gradient-to-r from-emerald-50 to-violet-50 p-8 sm:p-12"><div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]"><div><div className="flex gap-3"><ShieldCheck className="h-7 w-7 text-primary"/><UsersRound className="h-7 w-7 text-violet-600"/></div><h2 className="mt-5 text-3xl font-bold text-slate-950">Vous avez un savoir-faire ? Faites-le connaître.</h2><p className="mt-3 max-w-2xl text-slate-600">Créez gratuitement votre profil professionnel et trouvez de nouveaux clients dans votre ville.</p></div><Link href="/inscription" className="rounded-full bg-violet-700 px-7 py-4 text-center font-bold text-white transition hover:bg-violet-800">Devenir prestataire</Link></div></div></section>
  </main></>;
}
