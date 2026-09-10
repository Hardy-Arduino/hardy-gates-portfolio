"use client";

import {
    useState,
} from "react";

import {
    useRouter,
} from "next/navigation";

import {
    deleteGalleryImage,
    moveGalleryImage,
    setGalleryImageAsCover,
    updateGalleryImageMeta,
} from "./media-actions";


type GalleryImageCardProps = {

    projectId: string;

    image: {
        id: string;
        url: string;
        storage_path:
        string | null;
        alt_text:
        string | null;
        caption:
        string | null;
        display_order: number;
    };

    projectTitle: string;

    isCover: boolean;
    canMoveUp: boolean;
    canMoveDown: boolean;
};


export default function GalleryImageCard({
    projectId,
    image,
    projectTitle,
    isCover,
    canMoveUp,
    canMoveDown,
}: GalleryImageCardProps) {

    const router =
        useRouter();


    const [editing, setEditing] =
        useState(false);

    const [deleteOpen, setDeleteOpen] =
        useState(false);

    const [altText, setAltText] =
        useState(
            image.alt_text ?? ""
        );

    const [caption, setCaption] =
        useState(
            image.caption ?? ""
        );

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");


    // ==================================================
    // UPDATE META
    // ==================================================

    async function handleSaveMeta() {

        setLoading(true);
        setMessage("");
        setError("");

        try {

            await updateGalleryImageMeta(
                projectId,
                image.id,
                altText,
                caption
            );

            setEditing(false);

            setMessage(
                "Informations enregistrées."
            );

            router.refresh();

        } catch {

            setError(
                "Impossible d'enregistrer les modifications."
            );

        } finally {

            setLoading(false);

        }

    }


    // ==================================================
    // SET COVER
    // ==================================================

    async function handleSetCover() {

        setLoading(true);
        setMessage("");
        setError("");

        try {

            await setGalleryImageAsCover(
                projectId,
                image.id
            );

            setMessage(
                "Image définie comme couverture."
            );

            router.refresh();

        } catch {

            setError(
                "Impossible de définir cette image comme couverture."
            );

        } finally {

            setLoading(false);

        }

    }

    async function handleMove(
        direction: "up" | "down"
    ) {

        setLoading(true);
        setMessage("");
        setError("");

        try {

            const result =
                await moveGalleryImage(
                    projectId,
                    image.id,
                    direction
                );


            if (!result.success) {

                setError(
                    direction === "up"
                        ? "Cette image est déjà en première position."
                        : "Cette image est déjà en dernière position."
                );

                return;
            }


            setMessage(
                "Ordre de la galerie mis à jour."
            );


            router.refresh();

        } catch {

            setError(
                "Impossible de déplacer cette image."
            );

        } finally {

            setLoading(false);

        }
    }

    // ==================================================
    // DELETE
    // ==================================================

    async function handleDelete() {

        setLoading(true);
        setMessage("");
        setError("");

        try {

            await deleteGalleryImage(
                projectId,
                image.id
            );

            setDeleteOpen(false);

            router.refresh();

        } catch {

            setError(
                "Impossible de supprimer l'image."
            );

            setLoading(false);

        }

    }


    return (
        <>

            <article className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">

                {/* IMAGE */}
                <div className="relative">

                    <img
                        src={image.url}
                        alt={
                            image.alt_text
                            ??
                            `${projectTitle} - image ${image.display_order}`
                        }
                        className="aspect-[16/10] w-full object-cover"
                    />


                    {/* ORDER */}
                    <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-xs text-gray-300 backdrop-blur">

                        #{image.display_order}

                    </span>


                    {/* COVER */}
                    {isCover && (

                        <span className="absolute right-3 top-3 rounded-full border border-cyan-400/20 bg-black/80 px-3 py-1 text-xs font-medium text-cyan-400 backdrop-blur">

                            ★ Couverture actuelle

                        </span>

                    )}

                </div>


                {/* CONTENT */}
                <div className="p-4">

                    {!editing ? (

                        <>

                            <p className="truncate text-sm text-gray-300">

                                {
                                    image.alt_text
                                    ??
                                    `Image ${image.display_order}`
                                }

                            </p>


                            {image.caption && (

                                <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-600">
                                    {image.caption}
                                </p>

                            )}


                            {/* ACTIONS */}
                            <div className="mt-5 flex flex-wrap gap-2">

                                {/* MONTER */}
                                <button
                                    type="button"
                                    disabled={
                                        loading ||
                                        !canMoveUp
                                    }
                                    onClick={() =>
                                        handleMove("up")
                                    }
                                    title="Monter l'image"
                                    className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 transition hover:border-cyan-400/30 hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-30"
                                >
                                    ↑ Monter
                                </button>


                                {/* DESCENDRE */}
                                <button
                                    type="button"
                                    disabled={
                                        loading ||
                                        !canMoveDown
                                    }
                                    onClick={() =>
                                        handleMove("down")
                                    }
                                    title="Descendre l'image"
                                    className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 transition hover:border-cyan-400/30 hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-30"
                                >
                                    ↓ Descendre
                                </button>


                                {/* COUVERTURE */}
                                {!isCover && (

                                    <button
                                        type="button"
                                        disabled={loading}
                                        onClick={
                                            handleSetCover
                                        }
                                        className="rounded-lg border border-cyan-400/20 px-3 py-2 text-xs text-cyan-400 transition hover:bg-cyan-400/10 disabled:opacity-50"
                                    >
                                        Définir comme couverture
                                    </button>

                                )}


                                {/* MODIFIER */}
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() =>
                                        setEditing(true)
                                    }
                                    className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 transition hover:bg-white/5 disabled:opacity-50"
                                >
                                    Modifier
                                </button>


                                {/* SUPPRIMER */}
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() =>
                                        setDeleteOpen(true)
                                    }
                                    className="rounded-lg border border-red-500/20 px-3 py-2 text-xs text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
                                >
                                    Supprimer
                                </button>

                            </div>

                        </>

                    ) : (

                        /* EDIT MODE */

                        <div className="space-y-4">

                            <div>

                                <label className="text-xs text-gray-500">
                                    Texte alternatif
                                </label>

                                <input
                                    value={altText}
                                    onChange={(event) =>
                                        setAltText(
                                            event.target.value
                                        )
                                    }
                                    className="mt-2 w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-sm outline-none focus:border-cyan-400"
                                />

                            </div>


                            <div>

                                <label className="text-xs text-gray-500">
                                    Légende
                                </label>

                                <textarea
                                    value={caption}
                                    rows={3}
                                    onChange={(event) =>
                                        setCaption(
                                            event.target.value
                                        )
                                    }
                                    className="mt-2 w-full resize-y rounded-lg border border-white/10 bg-black px-3 py-2 text-sm outline-none focus:border-cyan-400"
                                />

                            </div>


                            <div className="flex justify-end gap-2">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setEditing(false)
                                    }
                                    className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400"
                                >
                                    Annuler
                                </button>


                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={
                                        handleSaveMeta
                                    }
                                    className="rounded-lg bg-cyan-400 px-3 py-2 text-xs font-semibold text-black disabled:opacity-50"
                                >
                                    {loading
                                        ? "Enregistrement..."
                                        : "Enregistrer"
                                    }
                                </button>

                            </div>

                        </div>

                    )}


                    {/* MESSAGES */}

                    {message && (

                        <p className="mt-4 text-xs text-emerald-400">
                            {message}
                        </p>

                    )}


                    {error && (

                        <p className="mt-4 text-xs text-red-400">
                            {error}
                        </p>

                    )}

                </div>

            </article>


            {/* DELETE MODAL */}
            {deleteOpen && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 backdrop-blur-sm">

                    <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-[#090909] p-7">

                        <p className="text-sm uppercase tracking-[0.25em] text-red-400">
                            Suppression
                        </p>

                        <h2 className="mt-4 text-2xl font-bold">
                            Supprimer cette image ?
                        </h2>

                        <div className="mt-5 overflow-hidden rounded-xl border border-white/10">

                            <img
                                src={image.url}
                                alt=""
                                className="aspect-video w-full object-cover"
                            />

                        </div>


                        {isCover && (

                            <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-300">

                                Attention : cette image est actuellement la couverture du projet. La couverture sera également retirée.

                            </div>

                        )}


                        <p className="mt-5 text-sm leading-6 text-gray-500">
                            Cette opération supprimera l&apos;image de la galerie
                            {image.storage_path
                                ? " et de Supabase Storage."
                                : "."
                            }
                        </p>


                        <div className="mt-7 flex gap-3">

                            <button
                                type="button"
                                disabled={loading}
                                onClick={() =>
                                    setDeleteOpen(false)
                                }
                                className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm text-gray-300"
                            >
                                Annuler
                            </button>


                            <button
                                type="button"
                                disabled={loading}
                                onClick={
                                    handleDelete
                                }
                                className="flex-1 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
                            >
                                {loading
                                    ? "Suppression..."
                                    : "Oui, supprimer"
                                }
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
}