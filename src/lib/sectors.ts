export type Plan = {
  name: "Essentiel" | "Démarrage" | "Pro" | "Entreprise";
  price: string; // "0" or number in FCFA
  inclusions: string;
};

export type Sector = {
  slug: string;
  emoji: string;
  name: string;
  short: string; // hero tagline
  audience: string; // "Pour qui"
  description: string;
  commissionCategory: string;
  commissionRate: string; // e.g. "3 %"
  useCases: string[];
  plans: Plan[];
  fieldNote?: string;
  extras?: string[]; // modules transversaux / assurances partenaires
};

const P = (name: Plan["name"], price: string, inclusions: string): Plan => ({
  name,
  price,
  inclusions,
});

export const sectors: Sector[] = [
  {
    slug: "transport-mobilite",
    emoji: "🚌",
    name: "Transport & Mobilité",
    short: "VTC, livreurs, transporteurs : votre flotte digitalisée en une boutique.",
    audience: "Compagnies de transport, VTC, livreurs, loueurs de véhicules.",
    description:
      "Gérez vos véhicules, vos courses et vos chauffeurs depuis une seule interface. Encaissez chaque course en Mobile Money sous escrow — les fonds ne partent qu'après validation par le passager ou le destinataire.",
    commissionCategory: "Prestation de service (transport de personnes ou de marchandises)",
    commissionRate: "3 %",
    useCases: [
      "Réservation de courses VTC avec géolocalisation",
      "Suivi de livraisons de colis (0 à 30 kg, gros)",
      "Location de véhicules courte et longue durée",
      "Preuve GPS conservée 1 an, utilisable en cas de litige",
    ],
    plans: [
      P("Essentiel", "0", "1 véhicule, 5 courses/mois, messagerie limitée"),
      P("Démarrage", "10 000", "2 véhicules, 20 courses/mois, Mobile Money, messagerie basique"),
      P("Pro", "35 000", "Véhicules et courses illimités, stats avancées, 1 module transversal en option"),
      P("Entreprise", "75 000", "Tout Pro + module Logistique inclus + API + équipe illimitée + 2FA + support < 2 h"),
    ],
    fieldNote:
      "Un VTC avec 5 motos à 15 000 FCFA/jour génère ~2,25 M FCFA/mois. Le plan Pro à 35 000 FCFA représente 1,5 % du CA.",
    extras: ["Module Logistique", "Assurance responsabilité civile transport"],
  },
  {
    slug: "agriculture-vivrier",
    emoji: "🌾",
    name: "Agriculture & Marché Vivrier",
    short: "De la parcelle au marché de gros, une boutique pensée pour les producteurs.",
    audience: "Producteurs, maraîchers, vendeurs de vivriers, propriétaires de terres.",
    description:
      "Publiez vos récoltes, prenez les précommandes sur arrivage, gérez vos stocks et louez vos terres. Pensé pour le rythme réel de l'agriculture ivoirienne, y compris pour les petits producteurs ruraux.",
    commissionCategory: "Vente de biens physiques",
    commissionRate: "2 %",
    useCases: [
      "Vente directe et précommandes sur arrivage",
      "Marché de gros (plan Entreprise)",
      "Location de terres agricoles",
      "Groupement de producteurs et coopératives",
    ],
    plans: [
      P("Essentiel", "0", "2 annonces, vente directe, 5 ventes/mois"),
      P("Démarrage", "5 000", "5 annonces, gestion des stocks, Mobile Money"),
      P("Pro", "25 000", "Annonces illimitées, précommandes sur arrivage, stats avancées"),
      P("Entreprise", "60 000", "Tout Pro + marché de gros + location de terres + Module Marché Vivrier inclus + API"),
    ],
    fieldNote:
      "Un vendeur de vivriers au marché de gros d'Adjamé traite 2 à 5 M FCFA/mois. Le plan Pro à 25 000 FCFA représente moins de 1,5 % du CA.",
    extras: ["Module Marché Vivrier"],
  },
  {
    slug: "sante",
    emoji: "🩺",
    name: "Santé",
    short: "Cabinets, cliniques et pharmacies : la santé numérique, en toute confidentialité.",
    audience: "Médecins, cliniques, pharmacies, laboratoires, structures de soins à domicile.",
    description:
      "Prise de rendez-vous, carnet santé, téléconsultation, urgences SAMU : tout dans un environnement chiffré AES-256, conforme à la loi ivoirienne 2013-450 sur les données personnelles.",
    commissionCategory: "Soins / santé",
    commissionRate: "3 %",
    useCases: [
      "Prise de RDV avec confirmation Mobile Money",
      "Carnet santé partageable entre praticiens",
      "Téléconsultation intégrée (plan Pro)",
      "Pharmacie en ligne + labo + urgences SAMU (Entreprise)",
    ],
    plans: [
      P("Essentiel", "0", "1 professionnel, 5 consultations/mois, carnet santé basique"),
      P("Démarrage", "20 000", "2 professionnels, 30 consultations/mois, carnet santé complet"),
      P("Pro", "60 000", "Professionnels illimités, téléconsultation, carnet partageable, stats"),
      P("Entreprise", "140 000", "Tout Pro + soins à domicile + pharmacie + labo + urgences SAMU + API"),
    ],
    fieldNote:
      "Un généraliste avec 12 consultations/jour à 10 000 FCFA génère ~3,6 M FCFA/mois. Le plan Pro à 60 000 FCFA représente 1,7 % du CA.",
    extras: ["Assurance responsabilité médicale", "Validation par l'Ordre des Médecins"],
  },
  {
    slug: "immobilier",
    emoji: "🏠",
    name: "Immobilier",
    short: "Agents, gestionnaires, particuliers : louez et vendez sans arnaque.",
    audience: "Agents immobiliers, gestionnaires de biens, particuliers.",
    description:
      "Photos filigranées, géolocalisation, visites virtuelles, suivi des loyers. Chaque bail passe par un escrow qui libère la caution à l'état des lieux — plus jamais de dépôt volatilisé.",
    commissionCategory: "Location / bail (également pour la vente immobilière, par simplification tarifaire)",
    commissionRate: "5 %",
    useCases: [
      "Annonces avec géolocalisation et filigrane anti-copie",
      "Visites virtuelles + agenda partagé",
      "Gestion locative pour compte de tiers",
      "Co-location et sous-location encadrées",
    ],
    plans: [
      P("Essentiel", "0", "1 bien, photos, géolocalisation, messagerie, 3 visites/mois"),
      P("Démarrage", "20 000", "3 biens, messagerie complète, 10 visites/mois"),
      P("Pro", "60 000", "Biens illimités, vidéos, visites virtuelles, suivi des loyers, stats"),
      P("Entreprise", "140 000", "Tout Pro + gestion locative + co-location + 2FA + API"),
    ],
    fieldNote:
      "3 locations à 300 000 FCFA/mois génèrent 27 000 FCFA de commission SUGU. Le plan Pro devient rentable dès 3 à 4 transactions/mois.",
    extras: ["Assurance loyers impayés partenaire", "Détection de doublons d'annonces (pHash)"],
  },
  {
    slug: "emploi-recrutement",
    emoji: "💼",
    name: "Emploi & Recrutement",
    short: "Offres, CVthèque, freelance et stages — en confiance.",
    audience: "PME, agences de recrutement, freelances, cabinets de conseil.",
    description:
      "Publiez vos offres, consultez la CVthèque, menez vos entretiens vidéo. Pour le freelance, un escrow protège chaque mission jusqu'à la livraison validée.",
    commissionCategory: "Prestation de service",
    commissionRate: "3 %",
    useCases: [
      "Offres d'emploi et CVthèque intégrée",
      "Missions freelance avec escrow (plan Entreprise)",
      "Stages, alternance, contrats temporaires",
      "Entretiens vidéo (plan Pro et supérieur)",
    ],
    plans: [
      P("Essentiel", "0", "1 offre/mois, CVthèque 10 CV"),
      P("Démarrage", "10 000", "5 offres/mois, CVthèque 50 CV, 5 missions freelance/mois"),
      P("Pro", "40 000", "Offres et missions illimitées, CVthèque illimitée, entretiens vidéo, stats"),
      P("Entreprise", "80 000", "Tout Pro + équipe recruteurs illimitée + API + stages/alternance + escrow freelance"),
    ],
  },
  {
    slug: "services-artisans",
    emoji: "🛠️",
    name: "Services & Artisans",
    short: "Plombiers, coiffeurs, techniciens : chaque devis suivi, chaque paiement garanti.",
    audience: "Artisans, prestataires de proximité, réparateurs, indépendants.",
    description:
      "Publiez vos prestations, gérez vos rendez-vous, encaissez sous escrow. Vos clients confirment la fin de la prestation via un code à 4 chiffres — vous êtes payé immédiatement.",
    commissionCategory: "Prestation de service",
    commissionRate: "3 %",
    useCases: [
      "Devis, rendez-vous et paiement sur une seule fiche",
      "Contrats de maintenance annuelle (plan Entreprise)",
      "Suivi GPS des interventions",
      "Photos de fin de chantier attachées à la preuve",
    ],
    plans: [
      P("Essentiel", "0", "1 annonce, 3 prestations/mois, zone 5 km"),
      P("Démarrage", "5 000", "5 annonces, 10 prestations/mois, zone 15 km, Mobile Money"),
      P("Pro", "20 000", "Annonces et prestations illimitées, stats, zone illimitée"),
      P("Entreprise", "50 000", "Tout Pro + maintenance et contrats annuels + suivi GPS + API"),
    ],
    fieldNote:
      "Un plombier avec 3 interventions/semaine à 30 000 FCFA génère ~360 000 FCFA/mois. Le plan Pro à 20 000 FCFA représente 5,6 % du CA.",
  },
  {
    slug: "vente-produits",
    emoji: "🛍️",
    name: "Vente de produits",
    short: "Une vraie boutique en ligne, avec Mobile Money et livraison.",
    audience: "Commerçants, e-commerçants, distributeurs, marques locales.",
    description:
      "Catalogue produits, variantes, codes promo, stocks, ventes flash. Vos clients paient en Mobile Money, vous encaissez à la livraison confirmée.",
    commissionCategory: "Vente de biens physiques",
    commissionRate: "2 %",
    useCases: [
      "Catalogue avec variantes (taille, couleur, poids)",
      "Codes promo et ventes flash (plan Entreprise)",
      "Tontine digitale et enchères (plan Entreprise)",
      "Intégration Module Logistique pour la livraison",
    ],
    plans: [
      P("Essentiel", "0", "3 produits, 5 commandes/mois, 1 variante/produit"),
      P("Démarrage", "10 000", "15 produits, 20 commandes/mois, 3 variantes/produit, Mobile Money"),
      P("Pro", "35 000", "Produits et commandes illimités, variantes illimitées, codes promo, stats"),
      P("Entreprise", "70 000", "Tout Pro + tontine digitale + ventes flash + enchères + API"),
    ],
    extras: ["Module Logistique", "Module Tontine"],
  },
  {
    slug: "reservation-alimentation",
    emoji: "🍽️",
    name: "Réservation & Alimentation",
    short: "Restaurants, hôtels, traiteurs : tables réservées, commandes servies.",
    audience: "Restaurants, hôtels, maquis, traiteurs, salles de réception.",
    description:
      "Réservations en ligne, menu à jour, commandes à emporter ou en livraison. Encaissement Mobile Money sous escrow, avis clients modérés.",
    commissionCategory: "Prestation de service",
    commissionRate: "3 %",
    useCases: [
      "Réservation de tables et de chambres",
      "Menu digital avec commandes à emporter",
      "Traiteur événementiel (plan Entreprise)",
      "Gestion multi-établissements",
    ],
    plans: [
      P("Essentiel", "0", "5 réservations/mois, 5 commandes/mois, 1 espace/table"),
      P("Démarrage", "10 000", "20 réservations/mois, 20 commandes/mois, menu simple"),
      P("Pro", "35 000", "Réservations et commandes illimitées, gestion hôtel, stats avancées"),
      P("Entreprise", "70 000", "Tout Pro + traiteur événementiel + équipe illimitée + API"),
    ],
    extras: ["Fonds sectoriel Alimentation (0,5 %-1 % par transaction)"],
  },
  {
    slug: "education-formation",
    emoji: "🎓",
    name: "Éducation & Formation",
    short: "Écoles, formateurs, MOOC : gérer les élèves et les parents sans papier.",
    audience: "Écoles, centres de formation, formateurs indépendants, universités.",
    description:
      "Inscription, notes, absences, cantine, transport scolaire, portail parents. Ajoutez du e-learning et des cours particuliers dès le plan Pro.",
    commissionCategory: "Formation / éducation",
    commissionRate: "3 %",
    useCases: [
      "Portail parents avec notes et absences",
      "Emplois du temps et cantine/transport (plan Pro)",
      "E-learning intégré",
      "Cours particuliers et MOOC (plan Entreprise)",
    ],
    plans: [
      P("Essentiel", "0", "10 élèves, portail parents limité"),
      P("Démarrage", "15 000", "50 élèves, portail basique, notes et absences"),
      P("Pro", "45 000", "Élèves illimités, emplois du temps, cantine, e-learning, stats"),
      P("Entreprise", "100 000", "Tout Pro + cours particuliers + MOOC + API + multi-établissements"),
    ],
    fieldNote:
      "Une école primaire avec 150 élèves à 30 000 FCFA/trimestre génère ~4,5 M FCFA/trimestre. Le plan Pro à 45 000 FCFA/mois représente ~1 % du CA.",
  },
  {
    slug: "evenementiel-loisirs",
    emoji: "🎉",
    name: "Événementiel & Loisirs",
    short: "Billetterie, salles et activités de loisirs — organisées, sécurisées.",
    audience: "Organisateurs d'événements, salles, loueurs de matériel, prestataires de loisirs.",
    description:
      "Vendez vos billets, gérez vos salles, louez du matériel événementiel. Le paiement est bloqué jusqu'à l'événement — si l'événement est annulé pour force majeure, les remboursements sont automatiques.",
    commissionCategory: "Événementiel (prestation de service)",
    commissionRate: "3 %",
    useCases: [
      "Billetterie en ligne avec QR code",
      "Réservation d'espaces événementiels",
      "Location de matériel (son, lumière, mobilier)",
      "Organisation clés en main (plan Entreprise)",
    ],
    plans: [
      P("Essentiel", "0", "1 événement actif, 20 billets max, 1 article matériel"),
      P("Démarrage", "10 000", "3 événements simultanés, 50 billets max, matériel illimité"),
      P("Pro", "35 000", "Événements illimités, billets illimités, activités loisirs, stats"),
      P("Entreprise", "75 000", "Tout Pro + organisation clés en main + loisirs et activités + API"),
    ],
    extras: ["Assurance annulation événement partenaire", "Fonds Pandémie & Catastrophes SUGU"],
  },
  {
    slug: "construction-btp",
    emoji: "🏗️",
    name: "Construction & BTP",
    short: "Devis, chantiers, engins : tout le BTP dans une seule boutique.",
    audience: "Entreprises BTP, artisans, loueurs d'engins, distributeurs de matériaux.",
    description:
      "Devis chiffrés, gestion multi-chantiers, location d'engins (bennes, pelles, grues), catalogue de matériaux. Un fonds de garantie sectoriel protège les chantiers.",
    commissionCategory: "Construction / BTP (3 %) — Location d'engins (5 %)",
    commissionRate: "3 % à 5 %",
    useCases: [
      "Devis simultanés avec suivi de chantier",
      "Location d'engins BTP",
      "Vente de matériaux (2 %) au catalogue",
      "Multi-chantiers et équipes illimitées (Entreprise)",
    ],
    plans: [
      P("Essentiel", "0", "1 devis actif/mois, 1 engin en location"),
      P("Démarrage", "15 000", "5 devis simultanés, 3 engins, catalogue jusqu'à 50 références"),
      P("Pro", "50 000", "Devis, engins et catalogue illimités, gestion de chantier, stats"),
      P("Entreprise", "110 000", "Tout Pro + multi-chantiers + équipe illimitée + API + Account Manager dédié"),
    ],
    fieldNote:
      "2 chantiers/mois à 15 M FCFA génèrent 450 000 FCFA de commission SUGU. Le plan Pro à 50 000 FCFA représente ~0,1 % du CA.",
    extras: ["RC Entreprise BTP recommandée", "Décennale partenaire"],
  },
  {
    slug: "energie-services-publics",
    emoji: "⚡",
    name: "Énergie & Services Publics",
    short: "Carburant, gaz, solaire, recharges : la distribution moderne.",
    audience: "Distributeurs de carburant, installateurs solaires, gestionnaires de bornes.",
    description:
      "Livraison à domicile, devis d'installation solaire, location de groupes électrogènes, services de recharge. Deux taux volontaires : 2 % vente/distribution, 3 % installation solaire (prestation).",
    commissionCategory: "Vente de biens physiques (2 %) — Installation solaire (3 %) — Location (5 %)",
    commissionRate: "2 % à 5 %",
    useCases: [
      "Livraison de gaz et carburant à domicile",
      "Devis + pose d'installation solaire",
      "Location de groupes électrogènes",
      "Services de recharge (batteries, bornes)",
    ],
    plans: [
      P("Essentiel", "0", "5 commandes/mois, 1 groupe électrogène en location"),
      P("Démarrage", "12 000", "30 commandes/mois, 3 groupes électrogènes, devis solaire illimités"),
      P("Pro", "40 000", "Commandes illimitées, flotte illimitée, suivi GPS livraison, stats"),
      P("Entreprise", "90 000", "Tout Pro + multi-dépôts + API + Account Manager dédié"),
    ],
    fieldNote:
      "200 livraisons/mois à 15 000 FCFA génèrent 60 000 FCFA de commission. Le plan Pro devient rentable dès 15 à 20 livraisons/mois.",
  },
];

export const sectorsBySlug: Record<string, Sector> = Object.fromEntries(
  sectors.map((s) => [s.slug, s]),
);
