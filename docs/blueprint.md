# Alzar Group — vision produit

Alzar Group est une place de marche locale, simple, pour les services physiques et a domicile. La premiere zone de lancement couvre Beni, Goma et Bunia.

## Proposition de valeur

- Le client publie un besoin ou consulte directement l'annuaire.
- Le prestataire rend son savoir-faire visible dans sa ville.
- La prise de contact se fait par telephone, sans enchere ni parcours complexe.

## MVP actuel

- comptes client et prestataire ;
- sessions securisees par cookie HTTP-only ;
- demandes classees par ville et categorie ;
- profils de prestataires avec experience et statut de verification ;
- recherche et contact telephonique direct ;
- espace personnel ;
- stockage PostgreSQL independant de Firebase.

## Evolutions conseillees

1. Verification manuelle des prestataires et avis apres prestation.
2. Fermeture d'une demande et gestion du statut disponible/indisponible.
3. Photos de travaux stockees sur un service S3-compatible.
4. Signalement, moderation et administration.
5. Notifications SMS/WhatsApp avec consentement.
6. Ajout progressif de villes via une table administree.
7. Paiement ou commission uniquement apres validation du marche.
