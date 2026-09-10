import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
    const supabase = await createClient();

    const { data: projects, error } = await supabase
        .from("projects")
        .select(`
            id,
            slug,
            title,
            category,
            year,
            status,
            featured,
            published,
            display_order,
            updated_at
        `)
        .order("display_order", {
            ascending: true,
        });

    if (error) {
        console.error(
            "Admin projects error:",
            error
        );

        return (
            <main>
                <p className="text-red-400">
                    Impossible de charger les projets.
                </p>
            </main>
        );
    }

    return (
        <main>

            {/* HEADER */}
            <div className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">

                <div>

                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
                        Portfolio CMS
                    </p>

                    <h1 className="mt-3 text-4xl font-bold md:text-5xl">
                        Projets
                    </h1>

                    <p className="mt-4 text-gray-500">
                        {projects?.length ?? 0} projet
                        {(projects?.length ?? 0) > 1 ? "s" : ""}
                    </p>

                </div>


                {/* On activera ce bouton à 5I */}
                <Link
                    href="/admin/projects/new"
                    className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
                >
                    + Nouveau projet
                </Link>

            </div>


            {/* LIST */}
            <section className="mt-10 space-y-4">

                {projects && projects.length > 0 ? (

                    projects.map((project) => (

                        <article
                            key={project.id}
                            className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-white/20 md:p-6"
                        >

                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                                {/* INFORMATIONS */}
                                <div className="min-w-0">

                                    <div className="flex flex-wrap items-center gap-3">

                                        <h2 className="text-xl font-semibold text-white md:text-2xl">
                                            {project.title}
                                        </h2>


                                        {/* PUBLICATION */}
                                        {project.published ? (

                                            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-400">
                                                ● Publié
                                            </span>

                                        ) : (

                                            <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-400">
                                                Brouillon
                                            </span>

                                        )}


                                        {/* FEATURED */}
                                        {project.featured && (

                                            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-400">
                                                ★ Mis en avant
                                            </span>

                                        )}

                                    </div>


                                    <p className="mt-3 text-sm text-gray-500">
                                        {project.category}
                                    </p>


                                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-400">

                                        <span>
                                            {project.year ?? "—"}
                                        </span>

                                        <span>
                                            {project.status}
                                        </span>

                                        <span className="text-gray-600">
                                            Ordre : {project.display_order}
                                        </span>

                                    </div>

                                </div>


                                {/* ACTIONS */}
                                <div className="flex shrink-0 flex-wrap gap-3">

                                    {project.published && (

                                        <Link
                                            href={`/projects/${project.slug}`}
                                            target="_blank"
                                            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-cyan-400/40 hover:text-cyan-400"
                                        >
                                            Voir ↗
                                        </Link>

                                    )}


                                    <Link
                                        href={`/admin/projects/${project.id}/edit`}
                                        className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm font-medium text-cyan-400 transition hover:bg-cyan-400/10"
                                    >
                                        Modifier
                                    </Link>

                                </div>

                            </div>

                        </article>

                    ))

                ) : (

                    <div className="rounded-3xl border border-dashed border-white/10 py-20 text-center">

                        <p className="text-gray-500">
                            Aucun projet pour le moment.
                        </p>

                    </div>

                )}

            </section>

        </main>
    );
}