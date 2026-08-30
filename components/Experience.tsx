import { experiences } from "@/data/experience";

export default function Experience() {
    return (
        <section
            id="experience"
            className="border-t border-white/10 px-6 py-24"
        >
            <div className="mx-auto max-w-7xl">

                {/* HEADER */}
                <div className="max-w-3xl">

                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
                        Parcours
                    </p>

                    <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                        Expériences &
                        <br />
                        <span className="text-cyan-400">
                            réalisations.
                        </span>
                    </h2>

                    <p className="mt-5 leading-8 text-gray-400">
                        Mon parcours à travers mes projets techniques, mes
                        responsabilités, mes compétitions et mes expériences
                        dans le domaine de l'électronique et des systèmes embarqués.
                    </p>

                </div>


                {/* TIMELINE */}
                <div className="relative mt-16">

                    {/* LINE */}
                    <div className="absolute left-[7px] top-0 hidden h-full w-px bg-white/10 md:block" />


                    <div className="space-y-12">

                        {experiences.map((item) => (

                            <article
                                key={item.id}
                                className="relative md:pl-12"
                            >

                                {/* DOT */}
                                <div className="absolute left-0 top-2 hidden h-[15px] w-[15px] rounded-full border-2 border-cyan-400 bg-black md:block" />


                                {/* CARD */}
                                <div
                                    className={`rounded-3xl border p-7 transition duration-500 hover:-translate-y-1 ${item.featured
                                        ? "border-cyan-400/30 bg-cyan-400/[0.03]"
                                        : "border-white/10 bg-white/[0.02]"
                                        }`}
                                >

                                    {/* TOP */}
                                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">

                                        <div>

                                            <span className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                                                {item.type === "competition"
                                                    ? "Compétition"
                                                    : item.type === "certification"
                                                        ? "Certification"
                                                        : "Expérience"}
                                            </span>

                                            <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">
                                                {item.title}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {item.organization}
                                            </p>

                                        </div>


                                        <span className="shrink-0 text-sm text-gray-500">
                                            {item.date}
                                        </span>

                                    </div>


                                    {/* DESCRIPTION */}
                                    <p className="mt-5 max-w-3xl leading-7 text-gray-400">
                                        {item.description}
                                    </p>


                                    {/* HIGHLIGHTS */}
                                    {item.highlights && item.highlights.length > 0 && (

                                        <div className="mt-6 flex flex-wrap gap-2">

                                            {item.highlights.map((highlight) => (

                                                <span
                                                    key={highlight}
                                                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400"
                                                >
                                                    {highlight}
                                                </span>

                                            ))}

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