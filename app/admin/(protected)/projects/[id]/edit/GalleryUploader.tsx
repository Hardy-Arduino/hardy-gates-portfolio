"use client";

import {
    useState,
} from "react";

import {
    useRouter,
} from "next/navigation";

import {
    createClient,
} from "@/lib/supabase/client";

import {
    saveGalleryMedia,
} from "./media-actions";

const MAX_GALLERY_IMAGES = 12;
const BUCKET =
    "project-images";


const ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
];


const MAX_FILE_SIZE =
    10 * 1024 * 1024;


function getExtension(
    mimeType: string
) {
    switch (mimeType) {

        case "image/jpeg":
            return "jpg";

        case "image/png":
            return "png";

        case "image/webp":
            return "webp";

        default:
            return null;
    }
}


export default function GalleryUploader({
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

    const [files, setFiles] =
        useState<File[]>([]);

    const [uploading, setUploading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    const remainingSlots =
        Math.max(
            MAX_GALLERY_IMAGES -
            currentCount,
            0
        );


    const galleryIsFull =
        remainingSlots === 0;
    async function handleUpload() {

        setError("");
        setSuccess("");


        if (
            files.length === 0
        ) {
            setError(
                "Sélectionne au moins une image."
            );

            return;
        }


        if (
            files.length > 6
        ) {
            setError(
                "Maximum 6 images à la fois."
            );

            return;
        }
        if (
            files.length >
            remainingSlots
        ) {

            setError(
                remainingSlots === 0
                    ? "La galerie est complète."
                    : `Il reste seulement ${remainingSlots} emplacement${remainingSlots > 1 ? "s" : ""} disponible${remainingSlots > 1 ? "s" : ""}.`
            );

            return;
        }


        for (
            const file of files
        ) {

            if (
                !ALLOWED_TYPES.includes(
                    file.type
                )
            ) {
                setError(
                    "Format non autorisé. Utilise JPG, PNG ou WebP."
                );

                return;
            }


            if (
                file.size >
                MAX_FILE_SIZE
            ) {
                setError(
                    `L'image "${file.name}" dépasse 10 Mo.`
                );

                return;
            }
        }


        setUploading(true);


        const supabase =
            createClient();


        const uploaded: {
            url: string;
            storagePath: string;
        }[] = [];


        try {

            for (
                const file of files
            ) {

                const extension =
                    getExtension(
                        file.type
                    );


                if (!extension) {
                    throw new Error(
                        "Format invalide."
                    );
                }


                const uniqueName =
                    crypto.randomUUID();


                const path =
                    `${projectSlug}/gallery/${uniqueName}.${extension}`;


                const {
                    error: uploadError,
                } = await supabase
                    .storage
                    .from(BUCKET)
                    .upload(
                        path,
                        file,
                        {
                            contentType:
                                file.type,

                            cacheControl:
                                "3600",

                            upsert:
                                false,
                        }
                    );


                if (uploadError) {
                    throw uploadError;
                }


                const {
                    data:
                    publicUrlData,
                } = supabase
                    .storage
                    .from(BUCKET)
                    .getPublicUrl(
                        path
                    );


                uploaded.push({
                    url:
                        publicUrlData
                            .publicUrl,

                    storagePath:
                        path,
                });

            }


            await saveGalleryMedia(
                projectId,
                uploaded
            );


            setSuccess(
                `${uploaded.length} image${uploaded.length > 1
                    ? "s"
                    : ""
                } ajoutée${uploaded.length > 1
                    ? "s"
                    : ""
                } avec succès.`
            );


            setFiles([]);

            router.refresh();

        } catch (uploadError) {

            console.error(
                uploadError
            );


            // Si certaines images ont déjà
            // été uploadées, on les supprime
            // pour éviter les fichiers orphelins.

            if (
                uploaded.length > 0
            ) {

                await supabase
                    .storage
                    .from(BUCKET)
                    .remove(
                        uploaded.map(
                            (
                                item
                            ) =>
                                item.storagePath
                        )
                    );

            }


            setError(
                "L'upload de la galerie a échoué."
            );

        } finally {

            setUploading(false);

        }

    }


    return (
        <div className="mt-8 border-t border-white/10 pt-7">

            <label
                htmlFor="galleryImages"
                className="text-sm text-gray-400"
            >
                Ajouter des images
            </label>


            <p className="mt-2 text-xs leading-5 text-gray-600">
                JPG, PNG ou WebP.
                Maximum 6 images à la fois,
                10 Mo par image.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">

                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400">

                    {currentCount} / {MAX_GALLERY_IMAGES} images

                </span>


                <span
                    className={`rounded-full border px-3 py-1.5 text-xs ${galleryIsFull
                        ? "border-red-500/20 bg-red-500/10 text-red-400"
                        : "border-cyan-400/20 bg-cyan-400/10 text-cyan-400"
                        }`}
                >

                    {galleryIsFull
                        ? "Galerie complète"
                        : `${remainingSlots} emplacement${remainingSlots > 1 ? "s" : ""} disponible${remainingSlots > 1 ? "s" : ""}`
                    }

                </span>

            </div>


            <input
                id="galleryImages"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                disabled={galleryIsFull}

                onChange={(event) => {

                    setFiles(
                        Array.from(
                            event.target.files
                            ?? []
                        )
                    );

                    setError("");
                    setSuccess("");
                }}

                className="mt-4 block w-full rounded-xl border border-white/10 bg-[#050709] px-4 py-3 text-sm text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-400 file:px-4 file:py-2 file:font-semibold file:text-black"
            />


            {files.length > 0 && (

                <p className="mt-3 text-xs text-gray-500">
                    {files.length} fichier
                    {files.length > 1
                        ? "s"
                        : ""
                    } sélectionné
                    {files.length > 1
                        ? "s"
                        : ""
                    }.
                </p>

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


            <div className="mt-5 flex justify-end">

                <button
                    type="button"
                    onClick={
                        handleUpload
                    }
                    disabled={
                        uploading ||
                        files.length === 0 ||
                        galleryIsFull
                    }
                    className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                >

                    {uploading
                        ? "Upload en cours..."
                        : "Ajouter à la galerie"
                    }

                </button>

            </div>

        </div>
    );
}