import Link from "next/link";
import { createClient } from "@/lib/supabase/server";


type MediaItem = {
    id: string;
    project_id: string;
    media_type: string;
    url: string;
    alt_text: string | null;
    caption: string | null;
    display_order: number;
    created_at: string;
    storage_path: string | null;
};


type ProjectItem = {
    id: string;
    title: string;
    slug: string;
};


type MediaPageProps = {
    searchParams: Promise<{
        type?: string;
    }>;
};


export default async function AdminMediaPage({
    searchParams,
}: MediaPageProps) {

    const { type } =
        await searchParams;


    const activeType =
        type === "image" ||
            type === "video"
            ? type
            : "all";


    const supabase =
        await createClient();


    const [
        mediaResult,
        projectsResult,
    ] = await Promise.all([

        supabase
            .from("project_media")
            .select(`
                id,
                project_id,
                media_type,
                url,
                alt_text,
                caption,
                display_order,
                created_at,
                storage_path
            `)
            .order(
                "display_order",
                {
                    ascending: true,
                }
            ),

        supabase
            .from("projects")
            .select(`
                id,
                title,
                slug
            `)
            .order(
                "display_order",
                {
                    ascending: true,
                }
            ),

    ]);


    if (mediaResult.error) {

        console.error(
            "Admin media error:",
            mediaResult.error
        );
    }


    if (projectsResult.error) {

        console.error(
            "Admin media projects error:",
            projectsResult.error
        );
    }


    const media =
        (
            mediaResult.data ?? []
        ) as MediaItem[];


    const projects =
        (
            projectsResult.data ?? []
        ) as ProjectItem[];


    /* ============================================================
       STATISTICS
       ============================================================ */

    const imageCount =
        media.filter(
            (item) =>
                item.media_type ===
                "image"
        ).length;


    const videoCount =
        media.filter(
            (item) =>
                item.media_type ===
                "video"
        ).length;


    const projectsWithMedia =
        new Set(
            media.map(
                (item) =>
                    item.project_id
            )
        ).size;


    /* ============================================================
       FILTER
       ============================================================ */

    const filteredMedia =
        activeType === "all"

            ? media

            : media.filter(
                (item) =>
                    item.media_type ===
                    activeType
            );


    /* ============================================================
       PROJECT GROUPS
       ============================================================ */

    const projectGroups =
        projects
            .map(
                (project) => ({

                    project,

                    media:
                        filteredMedia.filter(
                            (item) =>
                                item.project_id ===
                                project.id
                        ),
                })
            )
            .filter(
                (group) =>
                    group.media.length > 0
            );


    return (
        <main>

            {/* ====================================================
                HEADER
               ==================================================== */}

            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

                <div>

                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
                        Médias
                    </p>

                    <h1 className="mt-3 text-4xl font-bold">
                        Gestion des médias
                    </h1>

                    <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500">
                        Visualisez toutes les images et vidéos utilisées
                        dans vos projets depuis un seul espace.
                    </p>

                </div>


                <Link
                    href="/admin/projects"
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:border-cyan-400/30 hover:text-cyan-400"
                >
                    Gérer les projets →
                </Link>

            </div>


            {/* ====================================================
                STATS
               ==================================================== */}

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    label="Médias"
                    value={media.length}
                />

                <StatCard
                    label="Images"
                    value={imageCount}
                />

                <StatCard
                    label="Vidéos"
                    value={videoCount}
                />

                <StatCard
                    label="Projets avec médias"
                    value={projectsWithMedia}
                />

            </div>


            {/* ====================================================
                FILTERS
               ==================================================== */}

            <div className="mt-10 flex flex-wrap gap-3">

                <FilterButton
                    href="/admin/media"
                    active={
                        activeType === "all"
                    }
                >
                    Tous ({media.length})
                </FilterButton>


                <FilterButton
                    href="/admin/media?type=image"
                    active={
                        activeType === "image"
                    }
                >
                    Images ({imageCount})
                </FilterButton>


                <FilterButton
                    href="/admin/media?type=video"
                    active={
                        activeType === "video"
                    }
                >
                    Vidéos ({videoCount})
                </FilterButton>

            </div>


            {/* ====================================================
                EMPTY STATE
               ==================================================== */}

            {projectGroups.length === 0 && (

                <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-center">

                    <p className="text-lg font-semibold">
                        Aucun média trouvé
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                        Aucun média ne correspond au filtre sélectionné.
                    </p>

                </div>

            )}


            {/* ====================================================
                PROJECTS
               ==================================================== */}

            <div className="mt-10 space-y-10">

                {projectGroups.map(
                    ({
                        project,
                        media: projectMedia,
                    }) => (

                        <section
                            key={project.id}
                            className="rounded-3xl border border-white/10 bg-white/[0.015] p-6 md:p-8"
                        >

                            {/* PROJECT HEADER */}

                            <div className="flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">

                                <div>

                                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                                        Projet
                                    </p>

                                    <h2 className="mt-2 text-2xl font-semibold">
                                        {project.title}
                                    </h2>

                                    <p className="mt-2 text-sm text-gray-500">
                                        {projectMedia.length} média
                                        {projectMedia.length > 1
                                            ? "s"
                                            : ""
                                        }
                                    </p>

                                </div>


                                <div className="flex flex-wrap gap-3">

                                    <Link
                                        href={`/projects/${project.slug}`}
                                        target="_blank"
                                        className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-gray-400 transition hover:text-white"
                                    >
                                        Voir le projet ↗
                                    </Link>


                                    <Link
                                        href={`/admin/projects/${project.id}/edit`}
                                        className="rounded-xl border border-cyan-400/20 px-4 py-2.5 text-sm text-cyan-400 transition hover:bg-cyan-400/10"
                                    >
                                        Gérer les médias
                                    </Link>

                                </div>

                            </div>


                            {/* MEDIA GRID */}

                            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                                {projectMedia.map(
                                    (item) => (

                                        <article
                                            key={item.id}
                                            className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
                                        >

                                            {/* PREVIEW */}

                                            <div className="relative aspect-video overflow-hidden bg-white/[0.02]">

                                                {item.media_type === "video" ? (

                                                    <video
                                                        src={item.url}
                                                        controls
                                                        preload="metadata"
                                                        className="h-full w-full object-cover"
                                                    />

                                                ) : (

                                                    <img
                                                        src={item.url}
                                                        alt={
                                                            item.alt_text
                                                            ?? project.title
                                                        }
                                                        className="h-full w-full object-cover"
                                                        loading="lazy"
                                                    />

                                                )}


                                                <span className="absolute left-3 top-3 rounded-full border border-black/20 bg-black/70 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white backdrop-blur">

                                                    {item.media_type === "video"
                                                        ? "Vidéo"
                                                        : "Image"
                                                    }

                                                </span>

                                            </div>


                                            {/* INFORMATION */}

                                            <div className="p-5">

                                                <div className="flex items-start justify-between gap-4">

                                                    <div className="min-w-0">

                                                        <p className="truncate text-sm font-medium text-white">

                                                            {item.alt_text
                                                                || item.caption
                                                                || (
                                                                    item.media_type === "video"
                                                                        ? "Vidéo du projet"
                                                                        : "Image du projet"
                                                                )
                                                            }

                                                        </p>


                                                        {item.caption &&
                                                            item.caption !== item.alt_text && (

                                                                <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
                                                                    {item.caption}
                                                                </p>

                                                            )}

                                                    </div>


                                                    <span className="shrink-0 rounded-lg border border-white/10 px-2 py-1 text-xs text-gray-500">

                                                        #{item.display_order}

                                                    </span>

                                                </div>


                                                <div className="mt-4 border-t border-white/10 pt-4">

                                                    <Link
                                                        href={`/admin/projects/${project.id}/edit`}
                                                        className="text-xs font-medium text-cyan-400 transition hover:text-cyan-300"
                                                    >
                                                        Modifier dans le projet →
                                                    </Link>

                                                </div>

                                            </div>

                                        </article>

                                    )
                                )}

                            </div>

                        </section>

                    )
                )}

            </div>

        </main>
    );
}


/* ============================================================
   STAT CARD
   ============================================================ */

function StatCard({
    label,
    value,
}: {
    label: string;
    value: number;
}) {

    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">

            <p className="text-sm text-gray-500">
                {label}
            </p>

            <p className="mt-2 text-3xl font-semibold text-cyan-400">
                {value}
            </p>

        </div>
    );
}


/* ============================================================
   FILTER BUTTON
   ============================================================ */

function FilterButton({
    href,
    active,
    children,
}: {
    href: string;
    active: boolean;
    children: React.ReactNode;
}) {

    return (
        <Link
            href={href}
            className={`rounded-full px-4 py-2.5 text-sm font-medium transition ${active
                    ? "bg-cyan-400 text-black"
                    : "border border-white/10 bg-white/[0.02] text-gray-400 hover:border-cyan-400/30 hover:text-white"
                }`}
        >
            {children}
        </Link>
    );
}