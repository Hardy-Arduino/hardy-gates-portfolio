import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/supabase/projects";

type ProjectPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function ProjectPage({
    params,
}: ProjectPageProps) {

    const { id } = await params;

    const project = await getProjectBySlug(id);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black text-white">

            {/* NAVIGATION */}
            <div className="mx-auto max-w-7xl px-6 pt-8">

                <Link
                    href="/#projets"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-cyan-400"
                >
                    ← Retour aux projets
                </Link>

            </div>


            {/* HEADER */}
            <section className="mx-auto max-w-7xl px-6 pb-16 pt-16">

                <div className="max-w-4xl">

                    {/* CATEGORY */}
                    <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm text-cyan-400">
                        {project.category}
                    </span>


                    {/* TITLE */}
                    <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-7xl">
                        {project.title}
                    </h1>


                    {/* DESCRIPTION */}
                    <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
                        {project.description}
                    </p>


                    {/* META */}
                    <div className="mt-8 flex flex-wrap gap-6 text-sm">

                        <div>
                            <p className="text-gray-500">
                                Année
                            </p>

                            <p className="mt-1 font-medium text-white">
                                {project.year}
                            </p>
                        </div>


                        <div>
                            <p className="text-gray-500">
                                Statut
                            </p>

                            <p className="mt-1 font-medium text-white">
                                {project.status}
                            </p>
                        </div>

                    </div>

                </div>

            </section>


            {/* HERO IMAGE */}
            <section className="mx-auto max-w-7xl px-6">

                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">

                    {project.image ? (
                        <img
                            src={project.image}
                            alt={project.title}
                            className="aspect-[16/7] w-full object-cover"
                        />
                    ) : (
                        <div className="flex aspect-[16/7] items-center justify-center">
                            <span className="text-6xl font-bold text-white/10">
                                PROJECT
                            </span>
                        </div>
                    )}

                </div>

            </section>


            {/* GALERIE */}
            {project.gallery && project.gallery.length > 0 && (
                <section className="mx-auto max-w-7xl px-6 py-20">

                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
                            Galerie
                        </p>

                        <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                            Le projet en images
                        </h2>
                    </div>


                    <div className="mt-10 grid gap-5 md:grid-cols-2">

                        {project.gallery.map((image, index) => (

                            <div
                                key={image}
                                className={`group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] ${index === 0 ? "md:col-span-2" : ""
                                    }`}
                            >

                                <img
                                    src={image}
                                    alt={`${project.title} - image ${index + 1}`}
                                    className={`w-full object-cover transition duration-700 group-hover:scale-105 ${index === 0
                                            ? "aspect-[16/8]"
                                            : "aspect-[16/10]"
                                        }`}
                                />

                            </div>

                        ))}

                    </div>

                </section>
            )}


            {/* VIDEOS */}
            {project.videos && project.videos.length > 0 && (
                <section className="mx-auto max-w-7xl px-6 pb-20">

                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
                            Démonstration
                        </p>

                        <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                            Le projet en action
                        </h2>
                    </div>


                    <div className="mt-10 grid gap-6 lg:grid-cols-2">

                        {project.videos.map((video) => (

                            <div
                                key={video}
                                className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]"
                            >

                                <video
                                    controls
                                    preload="metadata"
                                    className="aspect-video w-full"
                                >
                                    <source
                                        src={video}
                                        type="video/mp4"
                                    />

                                    Votre navigateur ne supporte pas la lecture vidéo.
                                </video>

                            </div>

                        ))}

                    </div>

                </section>
            )}


            {/* CONTENT */}
            <section className="mx-auto max-w-7xl px-6 py-20">

                <div className="grid gap-12 lg:grid-cols-[1fr_350px]">

                    {/* MAIN CONTENT */}
                    <div>

                        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
                            Présentation
                        </p>

                        <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                            À propos du projet
                        </h2>

                        <p className="mt-6 max-w-3xl text-base leading-8 text-gray-400">
                            {project.description}
                        </p>


                        {/* FUTURE CONTENT */}
                        <div className="mt-12 space-y-8">

                            <div>
                                <h3 className="text-xl font-semibold">
                                    Objectif
                                </h3>

                                <p className="mt-3 leading-7 text-gray-400">
                                    Cette section présentera prochainement les objectifs
                                    techniques et fonctionnels du projet.
                                </p>
                            </div>


                            <div>
                                <h3 className="text-xl font-semibold">
                                    Fonctionnement
                                </h3>

                                <p className="mt-3 leading-7 text-gray-400">
                                    Nous détaillerons ici l&apos;architecture, le fonctionnement
                                    électronique et la logique du système.
                                </p>
                            </div>


                            <div>
                                <h3 className="text-xl font-semibold">
                                    Résultats
                                </h3>

                                <p className="mt-3 leading-7 text-gray-400">
                                    Les résultats, mesures, performances et démonstrations
                                    seront présentés dans cette section.
                                </p>
                            </div>

                        </div>

                    </div>


                    {/* TECHNOLOGIES */}
                    <aside>

                        <div className="sticky top-8 rounded-3xl border border-white/10 bg-white/[0.02] p-6">

                            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                                Technologies
                            </p>


                            <div className="mt-5 flex flex-wrap gap-2">

                                {project.technologies.map((technology) => (

                                    <span
                                        key={technology}
                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300"
                                    >
                                        {technology}
                                    </span>

                                ))}

                            </div>

                        </div>

                    </aside>

                </div>

            </section>


            {/* FOOTER NAVIGATION */}
            <section className="border-t border-white/10">

                <div className="mx-auto flex max-w-7xl justify-between px-6 py-10">

                    <Link
                        href="/#projets"
                        className="text-sm text-gray-400 transition hover:text-cyan-400"
                    >
                        ← Tous les projets
                    </Link>

                    <Link
                        href="/"
                        className="text-sm text-gray-400 transition hover:text-cyan-400"
                    >
                        Accueil ↑
                    </Link>

                </div>

            </section>

        </main>
    );
}