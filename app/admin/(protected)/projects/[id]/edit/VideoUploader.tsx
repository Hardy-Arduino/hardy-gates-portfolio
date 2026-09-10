"use client";

import {
    useState,
} from "react";

import {
    useRouter,
} from "next/navigation";

import * as tus
    from "tus-js-client";

import {
    createClient,
} from "@/lib/supabase/client";

import {
    saveProjectVideo,
} from "./media-actions";


const BUCKET =
    "project-videos";

const MAX_VIDEOS =
    3;

const MAX_FILE_SIZE =
    50 * 1024 * 1024;

const ALLOWED_TYPES = [
    "video/mp4",
    "video/webm",
];


function getExtension(
    type: string
) {

    if (
        type === "video/mp4"
    ) {
        return "mp4";
    }

    if (
        type === "video/webm"
    ) {
        return "webm";
    }

    return null;
}


export default function VideoUploader({
    projectId,
    projectSlug,
    currentCount,
}: {
    projectId: string;
    projectSlug: string;
    currentCount: number;
}) {

    const router =
        useRouter();


    const [file, setFile] =
        useState<File | null>(
            null
        );

    const [caption, setCaption] =
        useState("");

    const [uploading, setUploading] =
        useState(false);

    const [progress, setProgress] =
        useState(0);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    const remaining =
        MAX_VIDEOS -
        currentCount;


    async function handleUpload() {

        setError("");
        setSuccess("");


        if (!file) {

            setError(
                "Sélectionnez une vidéo."
            );

            return;
        }


        if (remaining <= 0) {

            setError(
                "La limite de 3 vidéos est atteinte."
            );

            return;
        }


        if (
            !ALLOWED_TYPES.includes(
                file.type
            )
        ) {

            setError(
                "Format non autorisé. Utilisez MP4 ou WebM."
            );

            return;
        }


        if (
            file.size >
            MAX_FILE_SIZE
        ) {

            setError(
                "La vidéo dépasse 50 Mo."
            );

            return;
        }


        const extension =
            getExtension(
                file.type
            );


        if (!extension) {
            return;
        }


        setUploading(true);
        setProgress(0);


        const supabase =
            createClient();


        let storagePath = "";


        try {

            // ==========================================
            // AUTH TOKEN
            // ==========================================

            const {
                data: {
                    session,
                },
            } =
                await supabase
                    .auth
                    .getSession();


            if (
                !session
                    ?.access_token
            ) {
                throw new Error(
                    "Session expirée."
                );
            }


            // ==========================================
            // STORAGE HOST
            // ==========================================

            const supabaseUrl =
                process.env
                    .NEXT_PUBLIC_SUPABASE_URL;


            if (!supabaseUrl) {
                throw new Error(
                    "URL Supabase absente."
                );
            }


            const projectRef =
                new URL(
                    supabaseUrl
                )
                    .hostname
                    .split(".")[0];


            const endpoint =
                `https://${projectRef}.storage.supabase.co/storage/v1/upload/resumable`;


            storagePath =
                `${projectSlug}/videos/${crypto.randomUUID()}.${extension}`;


            // ==========================================
            // TUS UPLOAD
            // ==========================================

            await new Promise<void>(
                (
                    resolve,
                    reject
                ) => {

                    const upload =
                        new tus.Upload(
                            file,
                            {

                                endpoint,

                                retryDelays: [
                                    0,
                                    3000,
                                    5000,
                                    10000,
                                    20000,
                                ],

                                headers: {
                                    authorization:
                                        `Bearer ${session.access_token}`,
                                },

                                uploadDataDuringCreation:
                                    true,

                                removeFingerprintOnSuccess:
                                    true,

                                metadata: {

                                    bucketName:
                                        BUCKET,

                                    objectName:
                                        storagePath,

                                    contentType:
                                        file.type,

                                    cacheControl:
                                        "3600",
                                },

                                // Supabase demande
                                // actuellement des chunks
                                // de 6 Mo pour TUS.
                                chunkSize:
                                    6 *
                                    1024 *
                                    1024,


                                onProgress(
                                    bytesUploaded,
                                    bytesTotal
                                ) {

                                    const percentage =
                                        Math.round(
                                            (
                                                bytesUploaded /
                                                bytesTotal
                                            ) * 100
                                        );

                                    setProgress(
                                        percentage
                                    );
                                },


                                onError(
                                    uploadError
                                ) {

                                    reject(
                                        uploadError
                                    );
                                },


                                onSuccess() {

                                    resolve();
                                },
                            }
                        );


                    upload.start();
                }
            );


            // ==========================================
            // DB
            // ==========================================

            await saveProjectVideo(
                projectId,
                storagePath,
                caption
            );


            setSuccess(
                "Vidéo ajoutée avec succès."
            );

            setFile(null);
            setCaption("");
            setProgress(100);


            router.refresh();

        } catch (
        uploadError
        ) {

            console.error(
                uploadError
            );


            // Nettoyage en cas d'échec
            // après upload Storage.

            if (storagePath) {

                await supabase
                    .storage
                    .from(BUCKET)
                    .remove([
                        storagePath,
                    ]);

            }


            setError(
                "L'envoi de la vidéo a échoué."
            );

        } finally {

            setUploading(false);

        }

    }


    return (
        <div className="mt-8 border-t border-white/10 pt-7">

            <label
                htmlFor="projectVideo"
                className="text-sm text-gray-400"
            >
                Ajouter une vidéo
            </label>


            <p className="mt-2 text-xs leading-5 text-gray-600">
                MP4 ou WebM.
                Maximum 50 Mo par vidéo.
            </p>


            <div className="mt-4 flex flex-wrap gap-2">

                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400">

                    {currentCount} / {MAX_VIDEOS} vidéos

                </span>


                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-400">

                    {Math.max(
                        remaining,
                        0
                    )} emplacement
                    {remaining > 1
                        ? "s"
                        : ""
                    } disponible
                    {remaining > 1
                        ? "s"
                        : ""
                    }

                </span>

            </div>


            <input
                id="projectVideo"
                type="file"
                accept="video/mp4,video/webm"
                disabled={
                    uploading ||
                    remaining <= 0
                }

                onChange={(
                    event
                ) => {

                    setFile(
                        event
                            .target
                            .files?.[0]
                        ?? null
                    );

                    setError("");
                    setSuccess("");
                    setProgress(0);
                }}

                className="mt-5 block w-full rounded-xl border border-white/10 bg-[#050709] px-4 py-3 text-sm text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-400 file:px-4 file:py-2 file:font-semibold file:text-black"
            />


            <div className="mt-5">

                <label
                    htmlFor="videoCaption"
                    className="text-sm text-gray-400"
                >
                    Légende
                </label>


                <input
                    id="videoCaption"
                    value={caption}
                    onChange={(
                        event
                    ) =>
                        setCaption(
                            event.target
                                .value
                        )
                    }
                    placeholder="Ex. Démonstration du prototype..."
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#050709] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
                />

            </div>


            {/* PROGRESS */}
            {uploading && (

                <div className="mt-6">

                    <div className="flex justify-between text-xs text-gray-500">

                        <span>
                            Upload en cours
                        </span>

                        <span>
                            {progress} %
                        </span>

                    </div>


                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">

                        <div
                            className="h-full bg-cyan-400 transition-all"
                            style={{
                                width:
                                    `${progress}%`,
                            }}
                        />

                    </div>

                </div>

            )}


            {error && (

                <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}
                </div>

            )}


            {success && (

                <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                    {success}
                </div>

            )}


            <div className="mt-6 flex justify-end">

                <button
                    type="button"
                    onClick={
                        handleUpload
                    }
                    disabled={
                        !file ||
                        uploading ||
                        remaining <= 0
                    }
                    className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {uploading
                        ? `Envoi ${progress}%`
                        : "Ajouter la vidéo"
                    }
                </button>

            </div>

        </div>
    );
}