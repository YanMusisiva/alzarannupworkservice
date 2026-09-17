import { CITIES, SERVICE_CATEGORIES } from '@/lib/types';

export const inputClass = 'h-11 w-full rounded-md border bg-background px-3 outline-none focus:ring-2 focus:ring-ring';
export const textareaClass = 'min-h-32 w-full rounded-md border bg-background px-3 py-3 outline-none focus:ring-2 focus:ring-ring';
export const labelClass = 'grid gap-2 text-sm font-semibold';

export function CityField({ defaultValue }: { defaultValue?: string }) {
  return <label className={labelClass}>Ville<select name="city" required defaultValue={defaultValue} className={inputClass}><option value="" disabled>Choisir une ville</option>{CITIES.map(x => <option key={x}>{x}</option>)}</select></label>;
}
export function CategoryField() {
  return <label className={labelClass}>Type de service<select name="category" required defaultValue="" className={inputClass}><option value="" disabled>Choisir un service</option>{SERVICE_CATEGORIES.map(x => <option key={x}>{x}</option>)}</select></label>;
}
export function FormMessage({ error }: { error?: string }) {
  return error ? <p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive">{error}</p> : null;
}
