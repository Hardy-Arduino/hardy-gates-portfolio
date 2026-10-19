"use client";

import { useState } from "react";

import type {
    SkillCategoryWithSkills,
} from "@/lib/content/skills";


export default function Skills({
    categories,
}: {
    categories: SkillCategoryWithSkills[];
}) {

    const [
        activeCategoryId,
        setActiveCategoryId,
    ] = useState<string>(
        categories[0]?.id ?? ""
    );


    const activeCategory =
        categories.find(
            (category) =>
                category.id === activeCategoryId
        ) ?? categories[0];


    const skills =
        activeCategory?.skills ?? [];


    if (categories.length === 0) {
        return null;
    }


    return (
        <section
            id="competences"
            className="
        border-t
        border-[var(--portfolio-border)]
        px-6
        py-24
        transition-colors
        duration-300
      "
        >

            <div className="mx-auto max-w-7xl">


                {/* =========================================
            HEADER
            ========================================= */}
                <div className="max-w-3xl">

                    <p
                        className="
              text-sm
              uppercase
              tracking-[0.3em]
              text-[var(--portfolio-accent)]
            "
                    >
                        Compétences
                    </p>


                    <h2
                        className="
              mt-3
              text-4xl
              font-bold
              text-[var(--portfolio-text)]
              md:text-5xl
            "
                    >
                        Mon arsenal

                        <br />

                        <span className="text-[var(--portfolio-accent)]">
                            technologique.
                        </span>
                    </h2>


                    <p
                        className="
              mt-5
              leading-8
              text-[var(--portfolio-muted)]
            "
                    >
                        Des connaissances développées à travers ma formation,
                        mes expérimentations personnelles et mes différents projets.
                    </p>

                </div>



                {/* =========================================
            CATÉGORIES
            ========================================= */}
                <div className="mt-12 flex flex-wrap gap-3">

                    {categories.map((category) => {

                        const isActive =
                            activeCategory?.id === category.id;

                        return (

                            <button
                                key={category.id}
                                type="button"
                                onClick={() =>
                                    setActiveCategoryId(
                                        category.id
                                    )
                                }
                                className={`
                  rounded-full
                  border
                  px-5
                  py-3
                  text-sm
                  font-medium
                  transition
                  duration-300

                  ${isActive

                                        ? `
                        border-[var(--portfolio-accent)]
                        bg-[var(--portfolio-accent)]
                        text-[var(--portfolio-accent-text)]
                      `

                                        : `
                        border-[var(--portfolio-border)]
                        bg-[var(--portfolio-surface)]
                        text-[var(--portfolio-text-secondary)]
                        hover:border-cyan-400/50
                        hover:bg-[var(--portfolio-surface-hover)]
                        hover:text-[var(--portfolio-accent)]
                      `
                                    }
                `}
                            >
                                {category.name}
                            </button>

                        );
                    })}

                </div>



                {/* =========================================
            COMPÉTENCES
            ========================================= */}
                <div className="mt-10 grid gap-4 md:grid-cols-2">

                    {skills.map((skill) => (

                        <div
                            key={skill.id}
                            className="
                group
                rounded-2xl
                border
                border-[var(--portfolio-border)]
                bg-[var(--portfolio-surface)]
                p-6
                transition
                duration-300
                hover:-translate-y-1
                hover:border-cyan-400/40
                hover:bg-[var(--portfolio-surface-hover)]
              "
                        >

                            <div
                                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                "
                            >

                                {/* NOM */}
                                <div className="flex min-w-0 items-center gap-3">

                                    {/* POINT CYAN */}
                                    <span
                                        className="
                      h-2.5
                      w-2.5
                      shrink-0
                      rounded-full
                      bg-[var(--portfolio-accent)]
                      shadow-[0_0_12px_rgba(34,211,238,0.45)]
                    "
                                    />


                                    <h3
                                        className="
                      font-semibold
                      text-[var(--portfolio-text)]
                    "
                                    >
                                        {skill.name}
                                    </h3>

                                </div>


                                {/* NIVEAU */}
                                {skill.level && (

                                    <span
                                        className="
                      shrink-0
                      rounded-full
                      border
                      border-cyan-400/30
                      bg-cyan-400/[0.05]
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-[var(--portfolio-accent)]
                    "
                                    >
                                        {skill.level}
                                    </span>

                                )}

                            </div>

                        </div>

                    ))}

                </div>



                {/* =========================================
            NOTE
            ========================================= */}
                <div
                    className="
            mt-10
            rounded-2xl
            border
            border-[var(--portfolio-border)]
            bg-[var(--portfolio-surface)]
            p-6
            transition-colors
            duration-300
          "
                >

                    <p
                        className="
              text-sm
              leading-7
              text-[var(--portfolio-muted)]
            "
                    >

                        <span
                            className="
                font-semibold
                text-[var(--portfolio-text-secondary)]
              "
                        >
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