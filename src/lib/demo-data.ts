import type { PublicProvider, ServiceRequest } from './types';

export const demoProviders: PublicProvider[] = [
  { id: 'demo-1', name: 'Patrick Kambale', city: 'Beni', category: 'Electricite', headline: 'Electricien residentiel & solaire', description: 'Installation, depannage et entretien electrique pour maisons et commerces. Travail soigne et intervention rapide.', phone: '+243 970 000 101', yearsExperience: 8, verified: true },
  { id: 'demo-2', name: 'Jeanne Mushagalusa', city: 'Goma', category: 'Nettoyage', headline: 'Nettoyage professionnel a domicile', description: 'Nettoyage complet de maisons, bureaux et logements apres travaux avec une petite equipe ponctuelle.', phone: '+243 970 000 202', yearsExperience: 5, verified: true },
  { id: 'demo-3', name: 'David Mbusa', city: 'Bunia', category: 'Plomberie', headline: 'Plombier et installateur sanitaire', description: 'Reparation de fuites, installation sanitaire et entretien de reservoirs pour particuliers et entreprises.', phone: '+243 970 000 303', yearsExperience: 6, verified: false },
  { id: 'demo-4', name: 'Sarah Kavira', city: 'Beni', category: 'Coiffure et beaute', headline: 'Coiffure femme a domicile', description: 'Tresses, soins capillaires et coiffures pour ceremonies. Deplacement sur rendez-vous dans la ville de Beni.', phone: '+243 970 000 404', yearsExperience: 4, verified: true },
];

export const demoRequests: ServiceRequest[] = [
  { id: 'request-1', clientName: 'Famille Kasereka', city: 'Beni', category: 'Electricite', title: 'Reparer une panne electrique dans une maison', description: 'Plusieurs prises ne fonctionnent plus depuis hier. Nous cherchons un electricien disponible rapidement.', neighborhood: 'Bungulu', phone: '+243 970 100 101', budget: 'A discuter', status: 'open', createdAt: new Date().toISOString() },
  { id: 'request-2', clientName: 'Hotel Virunga', city: 'Goma', category: 'Plomberie', title: 'Installer deux lavabos et reparer une fuite', description: 'Travail souhaite cette semaine. Le materiel principal est deja disponible sur place.', neighborhood: 'Les Volcans', phone: '+243 970 100 202', budget: '150 USD', status: 'open', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'request-3', clientName: 'Grace A.', city: 'Bunia', category: 'Menuiserie', title: 'Fabriquer une armoire sur mesure', description: 'Je cherche un menuisier experimente pour une armoire trois portes avec livraison a domicile.', neighborhood: 'Mudzipela', phone: '+243 970 100 303', budget: 'A convenir', status: 'open', createdAt: new Date(Date.now() - 172800000).toISOString() },
];
