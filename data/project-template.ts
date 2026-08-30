import type { Project } from "./projects";

export const projectTemplate: Project = {
    id: "nouveau-projet",

    title: "Nom du projet",

    shortDescription:
        "Une courte présentation du projet en une ou deux phrases.",

    description:
        "Description complète du projet. Explique ici le problème, la solution développée, le fonctionnement et les objectifs.",

    category: "Embedded Systems",

    year: "2026",

    status: "Prototype",

    technologies: [
        "ESP32",
        "Arduino",
        "IoT",
    ],

    featured: false,

    image: "/projects/nouveau-projet/cover.jpg",

    gallery: [
        "/projects/nouveau-projet/cover.jpg",
        "/projects/nouveau-projet/photo-1.jpg",
        "/projects/nouveau-projet/photo-2.jpg",
    ],

    videos: [
        "/projects/nouveau-projet/demo.mp4",
    ],

    // Ajouter seulement si disponible
    // github: "https://github.com/...",
    // demo: "https://...",
};