export type Project = {
    // =========================
    // IDENTITÉ
    // =========================
    id: string;
    title: string;

    // =========================
    // DESCRIPTION
    // =========================
    shortDescription: string;
    description: string;

    // =========================
    // INFORMATIONS
    // =========================
    category: string;
    year: string;
    status: string;

    // =========================
    // TECHNOLOGIES
    // =========================
    technologies: string[];

    // =========================
    // MISE EN AVANT
    // =========================
    featured?: boolean;

    // =========================
    // MÉDIAS
    // =========================
    image?: string;
    gallery?: string[];
    videos?: string[];

    // =========================
    // LIENS EXTERNES
    // =========================
    github?: string;
    demo?: string;
};

export const projects: Project[] = [

    // =====================================================
    // SMART STATION
    // =====================================================
    {
        id: "smart-station",

        title: "SMART_STATION",

        shortDescription:
            "Système IoT intelligent de surveillance environnementale avec analyse par IA.",

        description:
            "Une station environnementale connectée capable de mesurer plusieurs grandeurs physiques et de transmettre les données vers une infrastructure cloud pour leur visualisation et leur analyse.",

        category: "IoT & Embedded Systems",

        year: "2026",

        status: "Projet réalisé",

        technologies: [
            "ESP32",
            "IoT",
            "Supabase",
            "PostgreSQL",
            "Gemini AI",
            "DHT11",
            "BMP280",
            "MQ-2",
            "KY-018",
        ],

        featured: true,

        // Image principale
        image: "/projects/smart-station/cover.jpg",

        // Galerie
        gallery: [
            "/projects/smart-station/cover.jpg",
            "/projects/smart-station/montage.jpg",
            "/projects/smart-station/dashboard.jpg",
            "/projects/smart-station/prototype.jpg",
        ],

        // Vidéos
        videos: [
            "/projects/smart-station/demo.mp4",
        ],

        // Liens
        // github: "https://github.com/...",
        // demo: "https://...",
    },


    // =====================================================
    // DISTRIBUTEUR AUTOMATIQUE
    // =====================================================
    {
        id: "distributeur-automatique",

        title: "Distributeur automatique intelligent",

        shortDescription:
            "Système automatisé de distribution avec contrôle du poids, programmation horaire et interface utilisateur.",

        description:
            "Un système embarqué permettant d'automatiser la distribution de nourriture. Le système utilise un capteur de poids, un microcontrôleur, un écran LCD, un clavier et un moteur pour contrôler précisément la distribution.",

        category: "Embedded Systems",

        year: "2026",

        status: "Projet réalisé",

        technologies: [
            "ESP32",
            "Arduino",
            "HX711",
            "LCD I2C",
            "Keypad 4x4",
            "Servo MG995",
            "RTC DS3231",
            "EEPROM",
        ],

        featured: true,

        image: "/projects/distributeur.jpg",

        // Tu pourras ajouter plus tard :
        // gallery: [],
        // videos: [],
        // github: "https://github.com/...",
        // demo: "https://...",
    },


    // =====================================================
    // STATION MÉTÉO
    // =====================================================
    {
        id: "station-meteo",

        title: "Station météo IoT",

        shortDescription:
            "Station météorologique autonome permettant de mesurer et transmettre des données environnementales.",

        description:
            "Une station IoT autonome destinée à mesurer différents paramètres environnementaux et à transmettre les données à distance. Le système intègre une alimentation autonome et une gestion basse consommation.",

        category: "IoT",

        year: "2026",

        status: "Prototype",

        technologies: [
            "ESP32",
            "BME280",
            "MQTT",
            "Wi-Fi",
            "TP4056",
            "Li-ion",
            "Deep Sleep",
        ],

        featured: true,

        image: "/projects/station-meteo.jpg",

        // Tu pourras ajouter plus tard :
        // gallery: [],
        // videos: [],
        // github: "https://github.com/...",
        // demo: "https://...",
    },

    {
    id: "smart-parking",

    title: "Smart Parking",

    shortDescription:
        "Système intelligent de détection et de gestion des places de stationnement.",

    description:
        "Projet IoT permettant de détecter automatiquement les places disponibles et de transmettre les informations vers une interface de supervision.",

    category: "IoT & Automation",

    year: "2026",

    status: "Prototype",

    technologies: [
        "ESP32",
        "Ultrasonic Sensor",
        "IoT",
        "Wi-Fi",
    ],

    featured: true,

    image: "/projects/smart-parking/cover.jpg",

    gallery: [
        "/projects/smart-parking/cover.jpg",
        "/projects/smart-parking/prototype.jpg",
        "/projects/smart-parking/circuit.jpg",
        "/projects/smart-parking/dashboard.jpg",
    ],

    videos: [
        "/projects/smart-parking/demo.mp4",
    ],
},
];