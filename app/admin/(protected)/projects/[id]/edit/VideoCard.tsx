"use client";

import {
    useState,
} from "react";

import {
    useRouter,
} from "next/navigation";

import {
    deleteProjectVideo,
    updateProjectVideo,
} from "./media-actions";


type VideoCardProps = {

    projectId: string;

    video: {
        id: string;
        url: string;
        storage_path:
        string | null;
        caption:
        string | null;
        display_order:
        number;
    };
};


export default function VideoCard({
    projectId,
    video,
}: VideoCardProps) {

    const router =
        useRouter();

    const [editing, setEditing] =
        useState(false);

    const [deleteOpen, setDeleteOpen] =
        useState(false);

    const [caption, setCaption] =
        useState(
            video.caption ?? ""
        );

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    async function handleUpdate() {

        setLoading(true);
        setError("");

        try {

            await updateProjectVideo(
                projectId,
                video.id,
                caption
            );

            setEditing(false);

            router.refresh();

        } catch {

            setError(
                "Impossible de modifier la vidéo."
            );

        } finally {

            setLoading(false);

        }
    }


    async function handleDelete() {

        setLoading(true);
        setError("");

        try {

            await deleteProjectVideo(
                projectId,
                video.id
            );

            setDeleteOpen(false);

            router.refresh();

        } catch {

            setError(
                "Impossible de supprimer la vidéo."
            );

            setLoading(false);

        }

    }


    return (
        <>

            <article className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">

                <video
                    controls
                    preload="metadata"
                    className="aspect-video w-full bg-black"
                >
                    <source
                        src={video.url}
                    />

                    Votre navigateur ne supporte pas la lecture vidéo.
                </video>


                <div className="p-4">

                    <p className="text-xs text-cyan-400">
                        Vidéo #{video.display_order}
                    </p>


                    {!editing ? (

                        <>

                            <p className="mt-2 text-sm text-gray-400">

                                {video.caption
                                    || "Aucune légende"
                                }

                            </p>


                            <div className="mt-5 flex gap-2">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setEditing(true)
                                    }
                                    className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 hover:bg-white/5"
                                >
                                    Modifier
                                </button>


                                <button
                                    type="button"
                                    onClick={() =>
                                        setDeleteOpen(true)
                                    }
                                    className="rounded-lg border border-red-500/20 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10"
                                >
                                    Supprimer
                                </button>

                            </div>

                        </>

                    ) : (

                        <div className="mt-4">

                            <input
                                value={
                                    caption
                                }
                                onChange={(
                                    event
                                ) =>
                                    setCaption(
                                        event.target
                                            .value
                                    )
                                }
                                className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-sm outline-none focus:border-cyan-400"
                            />


                            <div className="mt-3 flex justify-end gap-2">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setEditing(false)
                                    }
                                    className="rounded-lg border border-white/10 px-3 py-2 text-xs"
                                >
                                    Annuler
                                </button>


                                <button
                                    type="button"
                                    disabled={
                                        loading
                                    }
                                    onClick={
                                        handleUpdate
                                    }
                                    className="rounded-lg bg-cyan-400 px-3 py-2 text-xs font-semibold text-black"
                                >
                                    Enregistrer
                                </button>

                            </div>

                        </div>

                    )}


                    {error && (

                        <p className="mt-4 text-xs text-red-400">
                            {error}
                        </p>

                    )}

                </div>

            </article>


            {deleteOpen && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 backdrop-blur-sm">

                    <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-[#090909] p-7">

                        <p className="text-sm uppercase tracking-[0.25em] text-red-400">
                            Suppression
                        </p>


                        <h2 className="mt-4 text-2xl font-bold">
                            Supprimer cette vidéo ?
                        </h2>


                        <p className="mt-4 text-sm leading-6 text-gray-500">
                            La vidéo sera supprimée de la base de données et de Supabase Storage.
                        </p>


                        <div className="mt-7 flex gap-3">

                            <button
                                type="button"
                                disabled={
                                    loading
                                }
                                onClick={() =>
                                    setDeleteOpen(false)
                                }
                                className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm"
                            >
                                Annuler
                            </button>


                            <button
                                type="button"
                                disabled={
                                    loading
                                }
                                onClick={
                                    handleDelete
                                }
                                className="flex-1 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold"
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