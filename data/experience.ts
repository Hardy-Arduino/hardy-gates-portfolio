export type ExperienceItem = {
  id: string;
  type: "experience" | "competition" | "certification";
  title: string;
  organization: string;
  date: string;
  description: string;
  highlights?: string[];
  featured?: boolean;
};

export const experiences: ExperienceItem[] = [

  {
    id: "iga-tronics",
    type: "experience",
    title: "Fondateur & Président — IGA TRONICS",
    organization: "IGA",
    date: "2025 — Aujourd'hui",
    description:
      "Initiateur et responsable du club étudiant dédié à l'électronique, aux systèmes embarqués, à l'IoT et aux technologies innovantes.",
    highlights: [
      "Création et structuration du club",
      "Organisation d'activités et de projets techniques",
      "Accompagnement des étudiants sur des projets électroniques",
      "Développement de projets IoT et systèmes embarqués",
    ],
    featured: true,
  },

  {
    id: "smart-elec",
    type: "competition",
    title: "SMART ELEC",
    organization: "Compétition de projets électroniques",
    date: "2026",
    description:
      "Participation à une compétition de projets électroniques avec un distributeur automatique intelligent développé autour d'un système embarqué.",
    highlights: [
      "Développement d'un système automatisé",
      "ESP32",
      "Capteur de poids HX711",
      "RTC DS3231",
      "Interface LCD et clavier",
      "Commande moteur",
    ],
    featured: true,
  },

  {
    id: "smart-station",
    type: "experience",
    title: "SMART_STATION",
    organization: "Projet IoT & systèmes embarqués",
    date: "2026",
    description:
      "Conception d'une station environnementale connectée basée sur ESP32, intégrant plusieurs capteurs, une infrastructure cloud et une interface de visualisation.",
    highlights: [
      "ESP32",
      "IoT",
      "Supabase",
      "PostgreSQL",
      "Capteurs environnementaux",
      "Analyse des données",
    ],
    featured: true,
  },

  {
    id: "station-meteo",
    type: "experience",
    title: "Station météo IoT",
    organization: "Projet personnel",
    date: "2026",
    description:
      "Conception d'une station météorologique autonome destinée à mesurer et transmettre des données environnementales.",
    highlights: [
      "ESP32",
      "BME280",
      "MQTT",
      "Alimentation solaire",
      "Batterie Li-ion",
      "Deep Sleep",
    ],
  },

];