import Link from "next/link";
import { getProjects } from "@/lib/supabase/projects";


export default async function Projects() {

    const projects = await getProjects();


    return (

        <section
            id="projets"
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
                        Projets
                    </p>


                    <h2
                        className="
                            mt-3
                            text-4xl
                            font-bold
                            tracking-tight
                            text-[var(--portfolio-text)]
                            md:text-5xl
                        "
                    >
                        Ce que je

                        <br />

                        <span className="text-[var(--portfolio-accent)]">
                            construis.
                        </span>

                    </h2>


                    <p
                        className="
                            mt-5
                            max-w-2xl
                            leading-8
                            text-[var(--portfolio-muted)]
                        "
                    >
                        Une sélection de projets électroniques, systèmes embarqués,
                        IoT et automatisation réalisés au cours de ma formation et
                        de mes expérimentations personnelles.
                    </p>

                </div>



                {/* =========================================
                    PROJECTS GRID
                ========================================= */}
                <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">


                    {projects.map((project) => (

                        <article
                            key={project.id}
                            className="
                                group
                                relative
                                flex
                                h-full
                                flex-col
                                overflow-hidden
                                rounded-3xl
                                border
                                border-[var(--portfolio-border)]
                                bg-[var(--portfolio-surface)]
                                transition-all
                                duration-500

                                hover:-translate-y-2
                                hover:border-cyan-400/40
                                hover:bg-[var(--portfolio-surface-hover)]
                            "
                        >


                            {/* =========================================
                                HALO
                            ========================================= */}
                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    -inset-20
                                    -z-10
                                    rounded-full
                                    bg-cyan-400/0
                                    blur-3xl
                                    transition
                                    duration-700
                                    group-hover:bg-cyan-400/5
                                "
                            />



                            {/* =========================================
                                IMAGE
                            ========================================= */}
                            <div
                                className="
                                    relative
                                    aspect-[16/10]
                                    overflow-hidden
                                    bg-gradient-to-br
                                    from-cyan-400/10
                                    via-transparent
                                    to-blue-500/10
                                "
                            >

                                {project.image ? (

                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="
                                            h-full
                                            w-full
                                            object-cover
                                            transition-transform
                                            duration-700
                                            ease-out
                                            group-hover:scale-110
                                        "
                                    />

                                ) : (

                                    <div
                                        className="
                                            flex
                                            h-full
                                            items-center
                                            justify-center
                                            bg-[var(--portfolio-bg-secondary)]
                                        "
                                    >

                                        <span
                                            className="
                                                text-5xl
                                                font-bold
                                                text-[var(--portfolio-muted)]
                                                opacity-20
                                            "
                                        >
                                            PROJECT
                                        </span>

                                    </div>

                                )}



                                {/* OVERLAY */}
                                <div
                                    className="
                                        absolute
                                        inset-0
                                        bg-gradient-to-t
                                        from-black/70
                                        via-transparent
                                        to-transparent
                                        opacity-60
                                        transition
                                        duration-500
                                        group-hover:opacity-80
                                    "
                                />



                                {/* =========================================
                                    CATEGORY
                                ========================================= */}
                                <div className="absolute left-4 top-4">

                                    <span
                                        className="
                                            rounded-full
                                            border
                                            border-white/10
                                            bg-black/70
                                            px-3
                                            py-1.5
                                            text-xs
                                            font-medium
                                            text-cyan-400
                                            shadow-lg
                                            backdrop-blur-md
                                        "
                                    >
                                        {project.category}
                                    </span>

                                </div>



                                {/* =========================================
                                    YEAR
                                ========================================= */}
                                <div className="absolute right-4 top-4">

                                    <span
                                        className="
                                            rounded-full
                                            border
                                            border-white/10
                                            bg-black/60
                                            px-3
                                            py-1.5
                                            text-xs
                                            text-gray-300
                                            backdrop-blur-md
                                        "
                                    >
                                        {project.year}
                                    </span>

                                </div>

                            </div>



                            {/* =========================================
                                CONTENT
                            ========================================= */}
                            <div className="flex flex-1 flex-col p-6">


                                {/* TITLE + STATUS */}
                                <div
                                    className="
                                        flex
                                        items-start
                                        justify-between
                                        gap-4
                                    "
                                >

                                    <h3
                                        className="
                                            text-xl
                                            font-semibold
                                            leading-tight
                                            text-[var(--portfolio-text)]
                                            transition
                                            duration-300
                                            group-hover:text-[var(--portfolio-accent)]
                                        "
                                    >
                                        {project.title}
                                    </h3>


                                    <div
                                        className="
                                            flex
                                            shrink-0
                                            items-center
                                            gap-2
                                        "
                                    >

                                        <span
                                            className="
                                                h-2
                                                w-2
                                                rounded-full
                                                bg-[var(--portfolio-accent)]
                                                opacity-70
                                                transition
                                                duration-300
                                                group-hover:opacity-100
                                            "
                                        />

                                    </div>

                                </div>



                                {/* =========================================
                                    DESCRIPTION
                                ========================================= */}
                                <p
                                    className="
                                        mt-4
                                        text-sm
                                        leading-7
                                        text-[var(--portfolio-muted)]
                                    "
                                >
                                    {project.shortDescription}
                                </p>



                                {/* =========================================
                                    TECHNOLOGIES
                                ========================================= */}
                                <div className="mt-5 flex flex-wrap gap-2">

                                    {project.technologies
                                        .slice(0, 5)
                                        .map((technology) => (

                                            <span
                                                key={technology}
                                                className="
                                                    rounded-full
                                                    border
                                                    border-[var(--portfolio-border)]
                                                    bg-[var(--portfolio-bg-secondary)]
                                                    px-2.5
                                                    py-1
                                                    text-xs
                                                    text-[var(--portfolio-muted)]
                                                    transition
                                                    duration-300

                                                    group-hover:border-cyan-400/20
                                                    group-hover:text-[var(--portfolio-text-secondary)]
                                                "
                                            >
                                                {technology}
                                            </span>

                                        ))}


                                    {project.technologies.length > 5 && (

                                        <span
                                            className="
                                                rounded-full
                                                border
                                                border-[var(--portfolio-border)]
                                                bg-[var(--portfolio-bg-secondary)]
                                                px-2.5
                                                py-1
                                                text-xs
                                                text-[var(--portfolio-muted)]
                                            "
                                        >
                                            +{project.technologies.length - 5}
                                        </span>

                                    )}

                                </div>



                                {/* =========================================
                                    FOOTER
                                ========================================= */}
                                <div className="mt-auto pt-7">

                                    <div
                                        className="
                                            border-t
                                            border-[var(--portfolio-border)]
                                            pt-5
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


                                            {/* STATUS */}
                                            <div className="flex items-center gap-2">

                                                <span
                                                    className="
                                                        text-xs
                                                        text-[var(--portfolio-muted)]
                                                    "
                                                >
                                                    {project.status}
                                                </span>

                                            </div>



                                            {/* LINK */}
                                            <Link
                                                href={`/projects/${project.id}`}
                                                className="
                                                    group/link
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    text-sm
                                                    font-medium
                                                    text-[var(--portfolio-accent)]
                                                    transition
                                                    duration-300

                                                    hover:opacity-70
                                                "
                                            >

                                                Voir le projet

                                                <span
                                                    className="
                                                        transition-transform
                                                        duration-300
                                                        group-hover/link:translate-x-1
                                                    "
                                                >
                                                    →
                                                </span>

                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </article>

                    ))}

                </div>

            </div>

        </section>
    );
}