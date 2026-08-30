"use client";

import { useState } from "react";


const skillCategories = {
    "Électronique": [
        {
            name: "Électronique analogique",
            level: "Avancé",
            percentage: 85,
        },
        {
            name: "Électronique numérique",
            level: "Avancé",
            percentage: 85,
        },
        {
            name: "Électronique de puissance",
            level: "Intermédiaire",
            percentage: 70,
        },
        {
            name: "Conception de circuits",
            level: "Intermédiaire",
            percentage: 75,
        },
    ],

    "Embedded Systems": [
        {
            name: "Arduino",
            level: "Avancé",
            percentage: 90,
        },
        {
            name: "ESP32",
            level: "Avancé",
            percentage: 90,
        },
        {
            name: "Microcontrôleurs",
            level: "Avancé",
            percentage: 85,
        },
        {
            name: "Capteurs & actionneurs",
            level: "Avancé",
            percentage: 85,
        },
    ],

    IoT: [
        {
            name: "Wi-Fi / Communication",
            level: "Avancé",
            percentage: 85,
        },
        {
            name: "MQTT",
            level: "Intermédiaire",
            percentage: 70,
        },
        {
            name: "Acquisition de données",
            level: "Avancé",
            percentage: 85,
        },
        {
            name: "Systèmes connectés",
            level: "Avancé",
            percentage: 80,
        },
    ],

    Automatisation: [
        {
            name: "Automatisme",
            level: "Intermédiaire",
            percentage: 70,
        },
        {
            name: "Commande & contrôle",
            level: "Intermédiaire",
            percentage: 70,
        },
        {
            name: "Systèmes industriels",
            level: "Intermédiaire",
            percentage: 65,
        },
        {
            name: "Instrumentation",
            level: "Intermédiaire",
            percentage: 70,
        },
    ],

    "Outils & Logiciels": [
        {
            name: "Proteus",
            level: "Avancé",
            percentage: 90,
        },
        {
            name: "KiCad",
            level: "Intermédiaire",
            percentage: 75,
        },
        {
            name: "Arduino IDE",
            level: "Avancé",
            percentage: 90,
        },
        {
            name: "VS Code",
            level: "Avancé",
            percentage: 85,
        },
    ],
};

type Category = keyof typeof skillCategories;

export default function Skills() {
    const [activeCategory, setActiveCategory] =
        useState<Category>("Électronique");

    const skills = skillCategories[activeCategory];

    return (
        <section
            id="competences"
            className="border-t border-white/10 px-6 py-24"
        >
            <div className="mx-auto max-w-7xl">

                {/* HEADER */}
                <div className="max-w-3xl">

                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
                        Compétences
                    </p>

                    <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                        Mon arsenal
                        <br />
                        <span className="text-cyan-400">
                            technologique.
                        </span>
                    </h2>

                    <p className="mt-5 leading-8 text-gray-400">
                        Des connaissances développées à travers ma formation,
                        mes expérimentations personnelles et mes différents projets.
                    </p>

                </div>


                {/* CATEGORIES */}
                <div className="mt-12 flex flex-wrap gap-3">

                    {Object.keys(skillCategories).map((category) => (

                        <button
                            key={category}
                            onClick={() =>
                                setActiveCategory(category as Category)
                            }
                            className={`rounded-full px-5 py-3 text-sm font-medium transition ${activeCategory === category
                                ? "bg-cyan-400 text-black"
                                : "border border-white/10 bg-white/[0.02] text-gray-400 hover:border-cyan-400/40 hover:text-white"
                                }`}
                        >
                            {category}
                        </button>

                    ))}

                </div>


                {/* SKILLS */}
                <div className="mt-10 grid gap-4 md:grid-cols-2">

                    {skills.map((skill) => (

                        <div
                            key={skill.name}
                            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
                        >

                            <div className="flex items-center justify-between">

                                <div>
                                    <h3 className="font-semibold text-white">
                                        {skill.name}
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {skill.level}
                                    </p>
                                </div>

                                <span className="text-sm font-semibold text-cyan-400">
                                    {skill.percentage}%
                                </span>

                            </div>


                            {/* BARRE */}
                            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">

                                <div
                                    className="h-full rounded-full bg-cyan-400 transition-all duration-700"
                                    style={{
                                        width: `${skill.percentage}%`,
                                    }}
                                />

                            </div>

                        </div>

                    ))}

                </div>


                {/* NOTE */}
                <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6">

                    <p className="text-sm leading-7 text-gray-500">
                        <span className="font-semibold text-gray-300">
                            Remarque :
                        </span>{" "}
                        les niveaux présentés sont indicatifs et reflètent mon niveau
                        actuel de pratique. Mon objectif est de continuer à développer
                        ces compétences à travers des projets concrets et des
                        expérimentations.
                    </p>

                </div>

            </div>
        </section>
    );
}