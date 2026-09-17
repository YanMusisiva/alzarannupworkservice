export const CITIES = ['Beni', 'Goma', 'Bunia'] as const;
export type City = (typeof CITIES)[number];

export const SERVICE_CATEGORIES = [
  'Electricite', 'Plomberie', 'Construction', 'Menuiserie', 'Mecanique',
  'Nettoyage', 'Coiffure et beaute', 'Informatique',
  'Transport et livraison', 'Autre',
] as const;

export type UserRole = 'client' | 'provider';

export type PublicProvider = {
  id: string; name: string; city: City; category: string; headline: string;
  description: string; phone: string; yearsExperience: number; verified: boolean;
};

export type ServiceRequest = {
  id: string; clientName: string; city: City; category: string; title: string;
  description: string; neighborhood: string | null; phone: string;
  budget: string | null; status: 'open' | 'closed'; createdAt: string;
};

export type SessionUser = {
  id: string; name: string; phone: string; city: City; role: UserRole;
};
