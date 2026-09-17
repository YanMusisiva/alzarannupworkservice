import Link from 'next/link';
import { Header } from '@/components/Header';
import { loginAction } from '@/actions';
import { FormMessage, inputClass, labelClass } from '@/components/FormFields';

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ erreur?: string }> }) {
  const { erreur } = await searchParams;
  return <><Header /><main className="mx-auto max-w-md px-4 py-16"><div className="rounded-2xl border bg-card p-7 shadow-sm"><h1 className="text-3xl font-bold">Connexion</h1><p className="mt-2 text-muted-foreground">Retrouvez vos demandes et votre profil.</p><form action={loginAction} className="mt-8 grid gap-5"><FormMessage error={erreur} /><label className={labelClass}>Telephone<input className={inputClass} name="phone" type="tel" placeholder="+243..." required /></label><label className={labelClass}>Mot de passe<input className={inputClass} name="password" type="password" required /></label><button className="h-12 rounded-md bg-primary font-bold text-primary-foreground">Se connecter</button></form><p className="mt-6 text-center text-sm">Pas encore de compte ? <Link className="font-bold text-primary" href="/inscription">S'inscrire</Link></p></div></main></>;
}
