import type {
    PortfolioExperience,
} from "@/lib/content/experiences";


function getExperienceTypeLabel(
    type: string
) {

    switch (type) {

        case "competition":
            return "Compétition";

        case "responsibility":
            return "Responsabilité";

        case "project":
            return "Projet";

        case "event":
            return "Événement";

        case "certification":
            return "Certification";

        default:
            return "Expérience";
    }
}


export default function Experience({
    experiences,
}: {
    experiences: PortfolioExperience[];
}) {

    if (experiences.length === 0) {
        return null;
    }


    return (

        <section
            id="experience"
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
                        Parcours
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
                        Expériences &

                        <br />

                        <span className="text-[var(--portfolio-accent)]">
                            réalisations.
                        </span>

                    </h2>


                    <p
                        className="
                            mt-5
                            leading-8
                            text-[var(--portfolio-muted)]
                        "
                    >
                        Mon parcours à travers mes projets techniques, mes
                        responsabilités, mes compétitions et mes expériences
                        dans le domaine de l'électronique et des systèmes embarqués.
                    </p>

                </div>



                {/* =========================================
                    TIMELINE
                ========================================= */}
                <div className="relative mt-16">


                    {/* LIGNE VERTICALE */}
                    <div
                        className="
                            absolute
                            left-[7px]
                            top-0
                            hidden
                            h-full
                            w-px
                            bg-[var(--portfolio-border)]
                            md:block
                        "
                    />


                    <div className="space-y-12">


                        {experiences.map((item) => (

                            <article
                                key={item.id}
                                className="relative md:pl-12"
                            >


                                {/* =========================================
                                    POINT TIMELINE
                                ========================================= */}
                                <div
                                    className="
                                        absolute
                                        left-0
                                        top-2
                                        hidden
                                        h-[15px]
                                        w-[15px]
                                        rounded-full
                                        border-2
                                        border-[var(--portfolio-accent)]
                                        bg-[var(--portfolio-bg)]
                                        shadow-[0_0_12px_rgba(34,211,238,0.25)]
                                        md:block
                                    "
                                />



                                {/* =========================================
                                    CARD
                                ========================================= */}
                                <div
                                    className={`
                                        rounded-3xl
                                        border
                                        p-7
                                        transition-all
                                        duration-500
                                        hover:-translate-y-1

                                        ${item.featured

                                            ? `
                                                    border-cyan-400/30
                                                    bg-cyan-400/[0.04]
                                                    hover:border-cyan-400/50
                                                `

                                            : `
                                                    border-[var(--portfolio-border)]
                                                    bg-[var(--portfolio-surface)]
                                                    hover:border-cyan-400/30
                                                    hover:bg-[var(--portfolio-surface-hover)]
                                                `
                                        }
                                    `}
                                >


                                    {/* =========================================
                                        TOP
                                    ========================================= */}
                                    <div
                                        className="
                                            flex
                                            flex-col
                                            gap-3
                                            md:flex-row
                                            md:items-start
                                            md:justify-between
                                        "
                                    >


                                        <div>


                                            {/* TYPE */}
                                            <span
                                                className="
                                                    text-xs
                                                    uppercase
                                                    tracking-[0.2em]
                                                    text-[var(--portfolio-accent)]
                                                "
                                            >
                                                {getExperienceTypeLabel(
                                                    item.type
                                                )}
                                            </span>



                                            {/* TITLE */}
                                            <h3
                                                className="
                                                    mt-2
                                                    text-xl
                                                    font-semibold
                                                    text-[var(--portfolio-text)]
                                                    md:text-2xl
                                                "
                                            >
                                                {item.title}
                                            </h3>



                                            {/* ORGANISATION */}
                                            {item.organization && (

                                                <p
                                                    className="
                                                        mt-1
                                                        text-sm
                                                        text-[var(--portfolio-muted)]
                                                    "
                                                >
                                                    {item.organization}
                                                </p>

                                            )}

                                        </div>



                                        {/* DATE */}
                                        {item.date_label && (

                                            <span
                                                className="
                                                    shrink-0
                                                    text-sm
                                                    text-[var(--portfolio-muted)]
                                                "
                                            >
                                                {item.date_label}
                                            </span>

                                        )}

                                    </div>



                                    {/* =========================================
                                        DESCRIPTION
                                    ========================================= */}
                                    <p
                                        className="
                                            mt-5
                                            max-w-3xl
                                            leading-7
                                            text-[var(--portfolio-text-secondary)]
                                        "
                                    >
                                        {item.description}
                                    </p>



                                    {/* =========================================
                                        HIGHLIGHTS
                                    ========================================= */}
                                    {item.highlights.length > 0 && (

                                        <div className="mt-6 flex flex-wrap gap-2">

                                            {item.highlights.map(
                                                (highlight) => (

                                                    <span
                                                        key={highlight}
                                                        className="
                                                            rounded-full
                                                            border
                                                            border-[var(--portfolio-border)]
                                                            bg-[var(--portfolio-bg-secondary)]
                                                            px-3
                                                            py-1.5
                                                            text-xs
                                                            text-[var(--portfolio-muted)]
                                                            transition
                                                            duration-300
                                                            hover:border-cyan-400/30
                                                            hover:text-[var(--portfolio-accent)]
                                                        "
                                                    >
                                                        {highlight}
                                                    </span>

                                                )
                                            )}

                                        </div>

                                    )}

                                </div>

                            </article>

                        ))}

                    </div>

                </div>

            </div>

        </section>
    );
}