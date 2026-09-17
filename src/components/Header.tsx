import Link from 'next/link';
import { ChevronDown, Menu } from 'lucide-react';
import { AnnLogo } from '@/components/AnnLogo';
import { getCurrentUser } from '@/lib/auth';
import { logoutAction } from '@/actions';

export async function Header() {
  const user = await getCurrentUser();
  return <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
    <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
      <Link href="/" aria-label="Accueil Alzar Group"><AnnLogo className="h-9 w-auto" /></Link>
      <nav className="hidden items-center gap-7 text-[15px] font-medium text-slate-700 lg:flex">
        <Link className="transition hover:text-primary" href="/prestataires">Trouver un professionnel</Link>
        <Link className="transition hover:text-primary" href="/demandes">Trouver une mission</Link>
        <span className="flex cursor-default items-center gap-1">Nos villes <ChevronDown className="h-4 w-4" /></span>
      </nav>
      <div className="flex items-center gap-3">
        {user ? <><Link className="hidden font-semibold text-slate-700 sm:block" href="/compte">{user.name}</Link><form action={logoutAction}><button className="text-sm text-slate-500">Quitter</button></form></> : <Link className="hidden px-3 py-2 text-sm font-semibold text-slate-700 sm:block" href="/connexion">Se connecter</Link>}
        <Link className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700" href="/publier">Publier un besoin</Link>
        <button className="rounded-lg border p-2 lg:hidden" aria-label="Ouvrir le menu"><Menu className="h-5 w-5" /></button>
      </div>
    </div>
  </header>;
}
