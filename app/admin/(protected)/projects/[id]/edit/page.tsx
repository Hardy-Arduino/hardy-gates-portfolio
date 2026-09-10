import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import VideoUploader
    from "./VideoUploader";

import VideoCard
    from "./VideoCard";
import GalleryImageCard
    from "./GalleryImageCard";
import GalleryUploader
    from "./GalleryUploader";
import {
    uploadCoverImage,
} from "./media-actions";
import {
    updateProject,
    deleteProject,
} from "./actions";

import DeleteProjectButton
    from "./DeleteProjectButton";

type EditProjectPageProps = {
    params: Promise<{
        id: string;
    }>;

    searchParams: Promise<{
        error?: string;

        mediaError?: string;
        coverUpdated?: string;

        galleryError?: string;
        galleryUpdated?: string;
    }>;
};

export default async function EditProjectPage({
    params,
    searchParams,
}: EditProjectPageProps) {

    const { id } = await params;
    const {
        error,
        mediaError,
        coverUpdated,
        galleryError,
        galleryUpdated,
    } = await searchParams;

    const supabase =
        await createClient();

    const {
        data: project,
        error: projectError,
    } = await supabase
        .from("projects")
        .select(`
            id,
            slug,
            title,
            short_description,
            description,
            category,
            year,
            status,
            technologies,
            cover_image_url,
            cover_image_path,
            github_url,
            demo_url,
            featured,
            published,
            display_order
        `)
        .eq("id", id)
        .maybeSingle();

    if (
        projectError ||
        !project
    ) {
        notFound();
    }

    const {
        data: gallery,
        error: galleryLoadError,
    } = await supabase
        .from("project_media")
        .select(`
        id,
        url,
        storage_path,
        alt_text,
        caption,
        display_order
    `)
        .eq(
            "project_id",
            project.id
        )
        .eq(
            "media_type",
            "image"
        )
        .order(
            "display_order",
            {
                ascending: true,
            }
        );


    if (galleryLoadError) {

        console.error(
            "Gallery load error:",
            galleryLoadError
        );

    }
    const {
        data: videos,
        error: videosLoadError,
    } = await supabase
        .from("project_media")
        .select(`
        id,
        url,
        storage_path,
        caption,
        display_order
    `)
        .eq(
            "project_id",
            project.id
        )
        .eq(
            "media_type",
            "video"
        )
        .order(
            "display_order",
            {
                ascending: true,
            }
        );


    if (videosLoadError) {

        console.error(
            "Videos load error:",
            videosLoadError
        );

    }

    const messages:
        Record<string, string> = {

        missing:
            "Veuillez remplir tous les champs obligatoires.",

        slug:
            "Le slug est invalide.",

        duplicate:
            "Un autre projet utilise déjà ce slug.",

        year:
            "L'année renseignée est invalide.",

        order:
            "L'ordre d'affichage est invalide.",

        database:
            "Une erreur est survenue lors de l'enregistrement.",
    };

    const errorMessage =
        error
            ? messages[error]
            : null;

    const mediaMessages:
        Record<string, string> = {

        missing:
            "Veuillez sélectionner une image.",

        type:
            "Format non autorisé. Utilisez JPG, PNG ou WebP.",

        size:
            "L'image dépasse la limite de 10 Mo.",

        upload:
            "Impossible d'envoyer l'image vers Supabase Storage.",

        database:
            "L'image a été envoyée mais le projet n'a pas pu être mis à jour.",
    };


    const mediaErrorMessage =
        mediaError
            ? mediaMessages[
            mediaError
            ]
            : null;
    const galleryMessages:
        Record<string, string> = {

        missing:
            "Veuillez sélectionner au moins une image.",

        count:
            "Vous pouvez ajouter au maximum 6 images à la fois.",

        type:
            "Une ou plusieurs images utilisent un format non autorisé.",

        size:
            "Une ou plusieurs images dépassent la limite de 10 Mo.",

        upload:
            "Impossible d'envoyer toutes les images vers Supabase Storage.",

        database:
            "Les images n'ont pas pu être enregistrées dans la galerie.",
    };


    const galleryErrorMessage =
        galleryError
            ? galleryMessages[
            galleryError
            ]
            : null;
    const updateProjectWithId =
        updateProject.bind(
            null,
            project.id
        );

    return (
        <main>

            {/* HEADER */}
            <div className="border-b border-white/10 pb-8">

                <Link
                    href="/admin/projects"
                    className="text-sm text-gray-500 transition hover:text-cyan-400"
                >
                    ← Retour aux projets
                </Link>

                <p className="mt-8 text-sm uppercase tracking-[0.3em] text-cyan-400">
                    Portfolio CMS
                </p>

                <h1 className="mt-3 text-4xl font-bold md:text-5xl">
                    Modifier le projet
                </h1>

                <p className="mt-4 text-gray-500">
                    {project.title}
                </p>


            </div>

            {/* ============================================================
    COVER IMAGE
   ============================================================ */}

            <section className="mt-10 max-w-4xl rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">

                <div>

                    <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
                        Média
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold">
                        Image principale
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Cette image apparaît sur la carte du projet
                        et en haut de sa page détaillée.
                    </p>

                </div>


                {/* SUCCESS */}
                {coverUpdated && (

                    <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                        Image principale mise à jour avec succès.
                    </div>

                )}


                {/* ERROR */}
                {mediaErrorMessage && (

                    <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        {mediaErrorMessage}
                    </div>

                )}


                {/* CURRENT IMAGE */}
                {project.cover_image_url ? (

                    <div className="mt-7 overflow-hidden rounded-2xl border border-white/10">

                        <img
                            src={
                                project.cover_image_url
                            }
                            alt={
                                project.title
                            }
                            className="aspect-[16/7] w-full object-cover"
                        />

                    </div>

                ) : (

                    <div className="mt-7 flex aspect-[16/7] items-center justify-center rounded-2xl border border-dashed border-white/10 bg-black/30">

                        <p className="text-sm text-gray-600">
                            Aucune image principale
                        </p>

                    </div>

                )}


                {/* UPLOAD */}
                <form
                    action={
                        uploadCoverImage.bind(
                            null,
                            project.id
                        )
                    }
                    className="mt-7"
                >

                    <label
                        htmlFor="coverImage"
                        className="text-sm text-gray-400"
                    >
                        Sélectionner une nouvelle image
                    </label>


                    <input
                        id="coverImage"
                        name="coverImage"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        required
                        className="mt-3 block w-full rounded-xl border border-white/10 bg-[#050709] px-4 py-3 text-sm text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-400 file:px-4 file:py-2 file:font-semibold file:text-black"
                    />


                    <div className="mt-5 flex justify-end">

                        <button
                            type="submit"
                            className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
                        >
                            Mettre à jour l&apos;image
                        </button>

                    </div>

                </form>

            </section>

            {/* ============================================================
    PROJECT GALLERY
   ============================================================ */}

            <section className="mt-8 max-w-4xl rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">

                {/* HEADER */}
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                    <div>

                        <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
                            Médias
                        </p>

                        <h2 className="mt-3 text-2xl font-semibold">
                            Galerie du projet
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm text-gray-500">
                            Gérez les images, leur ordre et la couverture du projet.
                        </p>

                    </div>


                    <div className="flex flex-wrap gap-2">

                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400">

                            {gallery?.length ?? 0} / 12 images

                        </span>


                        {project.cover_image_url ? (

                            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-400">

                                ★ Couverture définie

                            </span>

                        ) : (

                            <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-xs text-amber-400">

                                Aucune couverture

                            </span>

                        )}

                    </div>

                </div>


                {/* SUCCESS */}
                {galleryUpdated && (

                    <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">

                        {galleryUpdated} image
                        {Number(galleryUpdated) > 1
                            ? "s"
                            : ""
                        } ajoutée
                        {Number(galleryUpdated) > 1
                            ? "s"
                            : ""
                        } avec succès.

                    </div>

                )}


                {/* ERROR */}
                {galleryErrorMessage && (

                    <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">

                        {galleryErrorMessage}

                    </div>

                )}


                {/* EXISTING GALLERY */}
                {gallery &&
                    gallery.length > 0 ? (

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">

                        {gallery.map(
                            (
                                image,
                                index
                            ) => (

                                <GalleryImageCard
                                    key={image.id}

                                    projectId={
                                        project.id
                                    }

                                    projectTitle={
                                        project.title
                                    }

                                    image={
                                        image
                                    }

                                    isCover={
                                        project.cover_image_url
                                        === image.url
                                    }

                                    canMoveUp={
                                        index > 0
                                    }

                                    canMoveDown={
                                        index <
                                        gallery.length - 1
                                    }
                                />

                            )
                        )}

                    </div>

                ) : (

                    <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-black/20 px-5 py-12 text-center">

                        <p className="text-sm text-gray-600">
                            Aucune image dans la galerie.
                        </p>

                    </div>

                )}


                {/* UPLOAD */}
                <GalleryUploader
                    projectId={project.id}
                    projectSlug={project.slug}
                    currentCount={
                        gallery?.length ?? 0
                    }
                />

            </section>

            {/* ============================================================
    PROJECT VIDEOS
   ============================================================ */}

            <section className="mt-8 max-w-4xl rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                    <div>

                        <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
                            Vidéos
                        </p>

                        <h2 className="mt-3 text-2xl font-semibold">
                            Démonstrations du projet
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm text-gray-500">
                            Ajoutez des démonstrations vidéo du fonctionnement et des résultats du projet.
                        </p>

                    </div>


                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400">

                        {videos?.length ?? 0} / 3 vidéos

                    </span>

                </div>


                {videos &&
                    videos.length > 0 ? (

                    <div className="mt-8 grid gap-5 lg:grid-cols-2">

                        {videos.map(
                            (video) => (

                                <VideoCard
                                    key={video.id}
                                    projectId={
                                        project.id
                                    }
                                    video={
                                        video
                                    }
                                />

                            )
                        )}

                    </div>

                ) : (

                    <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-black/20 px-5 py-12 text-center">

                        <p className="text-sm text-gray-600">
                            Aucune vidéo pour ce projet.
                        </p>

                    </div>

                )}


                <VideoUploader
                    projectId={
                        project.id
                    }
                    projectSlug={
                        project.slug
                    }
                    currentCount={
                        videos?.length ?? 0
                    }
                />

            </section>

            <form
                action={updateProjectWithId}
                className="mt-10 max-w-4xl"
            >

                {errorMessage && (
                    <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
                        {errorMessage}
                    </div>
                )}


                <div className="space-y-8">

                    {/* INFORMATIONS */}
                    <FormSection
                        title="Informations principales"
                        description="Modifiez les informations générales du projet."
                    >

                        <Field
                            label="Titre"
                            name="title"
                            required
                            defaultValue={
                                project.title
                            }
                        />

                        <Field
                            label="Slug"
                            name="slug"
                            required
                            defaultValue={
                                project.slug
                            }
                        />

                        <Field
                            label="Catégorie"
                            name="category"
                            required
                            defaultValue={
                                project.category
                            }
                        />

                        <div className="grid gap-5 sm:grid-cols-2">

                            <Field
                                label="Année"
                                name="year"
                                type="number"
                                defaultValue={
                                    project.year
                                        ? String(
                                            project.year
                                        )
                                        : ""
                                }
                            />

                            <div>

                                <label
                                    htmlFor="status"
                                    className="text-sm text-gray-400"
                                >
                                    Statut
                                </label>

                                <select
                                    id="status"
                                    name="status"
                                    defaultValue={
                                        project.status
                                    }
                                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#050709] px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                                >
                                    <option>
                                        Prototype
                                    </option>

                                    <option>
                                        En développement
                                    </option>

                                    <option>
                                        Projet réalisé
                                    </option>

                                    <option>
                                        Projet académique
                                    </option>
                                </select>

                            </div>

                        </div>

                    </FormSection>


                    {/* DESCRIPTION */}
                    <FormSection
                        title="Présentation"
                        description="Modifiez les textes visibles sur le portfolio."
                    >

                        <TextArea
                            label="Description courte"
                            name="shortDescription"
                            required
                            rows={3}
                            defaultValue={
                                project.short_description
                            }
                        />

                        <TextArea
                            label="Description complète"
                            name="description"
                            required
                            rows={8}
                            defaultValue={
                                project.description
                            }
                        />

                    </FormSection>


                    {/* TECHNOLOGIES */}
                    <FormSection
                        title="Technologies"
                        description="Séparez les technologies par des virgules."
                    >

                        <Field
                            label="Technologies utilisées"
                            name="technologies"
                            defaultValue={
                                (
                                    project.technologies
                                    ?? []
                                ).join(", ")
                            }
                        />

                    </FormSection>


                    {/* LIENS */}
                    <FormSection
                        title="Liens"
                        description="Liens associés au projet."
                    >

                        <Field
                            label="GitHub"
                            name="githubUrl"
                            type="url"
                            defaultValue={
                                project.github_url
                                ?? ""
                            }
                        />

                        <Field
                            label="Démonstration"
                            name="demoUrl"
                            type="url"
                            defaultValue={
                                project.demo_url
                                ?? ""
                            }
                        />

                    </FormSection>


                    {/* PUBLICATION */}
                    <FormSection
                        title="Publication"
                        description="Contrôlez la visibilité du projet."
                    >

                        <Field
                            label="Ordre d'affichage"
                            name="displayOrder"
                            type="number"
                            defaultValue={
                                String(
                                    project.display_order
                                )
                            }
                        />

                        <div className="grid gap-4 sm:grid-cols-2">

                            <Checkbox
                                name="featured"
                                label="Mettre en avant"
                                description="Identifier ce projet comme une réalisation importante."
                                defaultChecked={
                                    project.featured
                                }
                            />

                            <Checkbox
                                name="published"
                                label="Projet publié"
                                description="Décochez pour transformer le projet en brouillon."
                                defaultChecked={
                                    project.published
                                }
                            />

                        </div>

                    </FormSection>

                </div>


                {/* ACTIONS */}
                <div className="mt-10 flex flex-col-reverse gap-3 border-t border-white/10 pt-8 sm:flex-row sm:justify-end">

                    <Link
                        href="/admin/projects"
                        className="rounded-xl border border-white/10 px-6 py-3 text-center text-sm text-gray-400 transition hover:text-white"
                    >
                        Annuler
                    </Link>

                    <button
                        type="submit"
                        className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
                    >
                        Enregistrer les modifications
                    </button>

                </div>

            </form>

            {/* DANGER ZONE */}
            <section className="mt-16 max-w-4xl rounded-3xl border border-red-500/20 bg-red-500/[0.03] p-6 md:p-8">

                <p className="text-sm uppercase tracking-[0.25em] text-red-400">
                    Zone dangereuse
                </p>

                <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                    <div>

                        <h2 className="text-xl font-semibold">
                            Supprimer ce projet
                        </h2>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                            Cette opération supprimera définitivement
                            le projet de la base de données.
                        </p>

                    </div>


                    <DeleteProjectButton
                        projectId={project.id}
                        projectTitle={project.title}
                        action={deleteProject}
                    />

                </div>

            </section>

        </main>
    );
}


/* ============================================================
   FORM COMPONENTS
   ============================================================ */

function FormSection({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: React.ReactNode;
}) {

    return (
        <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">

            <div className="mb-7">

                <h2 className="text-xl font-semibold">
                    {title}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    {description}
                </p>

            </div>

            <div className="space-y-5">
                {children}
            </div>

        </section>
    );
}


function Field({
    label,
    name,
    type = "text",
    required = false,
    defaultValue = "",
}: {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    defaultValue?: string;
}) {

    return (
        <div>

            <label
                htmlFor={name}
                className="text-sm text-gray-400"
            >
                {label}

                {required && (
                    <span className="ml-1 text-cyan-400">
                        *
                    </span>
                )}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                required={required}
                defaultValue={defaultValue}
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#050709] px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />

        </div>
    );
}


function TextArea({
    label,
    name,
    required = false,
    rows = 5,
    defaultValue = "",
}: {
    label: string;
    name: string;
    required?: boolean;
    rows?: number;
    defaultValue?: string;
}) {

    return (
        <div>

            <label
                htmlFor={name}
                className="text-sm text-gray-400"
            >
                {label}

                {required && (
                    <span className="ml-1 text-cyan-400">
                        *
                    </span>
                )}

            </label>

            <textarea
                id={name}
                name={name}
                required={required}
                rows={rows}
                defaultValue={defaultValue}
                className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-[#050709] px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />

        </div>
    );
}


function Checkbox({
    name,
    label,
    description,
    defaultChecked = false,
}: {
    name: string;
    label: string;
    description: string;
    defaultChecked?: boolean;
}) {

    return (
        <label className="flex cursor-pointer gap-4 rounded-2xl border border-white/10 bg-black/30 p-5 transition hover:border-cyan-400/20">

            <input
                name={name}
                type="checkbox"
                defaultChecked={
                    defaultChecked
                }
                className="mt-1 h-4 w-4 accent-cyan-400"
            />

            <span>

                <span className="block text-sm font-medium text-white">
                    {label}
                </span>

                <span className="mt-1 block text-xs leading-5 text-gray-500">
                    {description}
                </span>

            </span>

        </label>
    );
}