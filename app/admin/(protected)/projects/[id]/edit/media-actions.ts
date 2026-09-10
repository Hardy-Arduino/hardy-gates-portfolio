"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/admin/auth";

const MAX_GALLERY_IMAGES = 12;
const BUCKET =
    "project-images";


const ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
];

const VIDEO_BUCKET =
    "project-videos";

const MAX_PROJECT_VIDEOS =
    3;

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


export async function uploadCoverImage(
    projectId: string,
    formData: FormData
) {

    const { supabase } =
        await requireAdmin();


    // ==================================================
    // PROJECT
    // ==================================================

    const {
        data: project,
        error: projectError,
    } = await supabase
        .from("projects")
        .select(`
            id,
            slug,
            cover_image_path
        `)
        .eq("id", projectId)
        .maybeSingle();


    if (
        projectError ||
        !project
    ) {
        redirect(
            "/admin/projects?error=not-found"
        );
    }


    // ==================================================
    // FILE
    // ==================================================

    const file =
        formData.get("coverImage");


    if (
        !(file instanceof File) ||
        file.size === 0
    ) {

        redirect(
            `/admin/projects/${projectId}/edit?mediaError=missing`
        );
    }


    if (
        !ALLOWED_TYPES.includes(
            file.type
        )
    ) {

        redirect(
            `/admin/projects/${projectId}/edit?mediaError=type`
        );
    }


    if (
        file.size >
        MAX_FILE_SIZE
    ) {

        redirect(
            `/admin/projects/${projectId}/edit?mediaError=size`
        );
    }


    const extension =
        getExtension(file.type);


    if (!extension) {

        redirect(
            `/admin/projects/${projectId}/edit?mediaError=type`
        );
    }


    // ==================================================
    // STORAGE PATH
    // ==================================================

    const newPath =
        `${project.slug}/cover/${randomUUID()}.${extension}`;


    const arrayBuffer =
        await file.arrayBuffer();


    // ==================================================
    // UPLOAD
    // ==================================================

    const {
        error: uploadError,
    } = await supabase
        .storage
        .from(BUCKET)
        .upload(
            newPath,
            arrayBuffer,
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

        console.error(
            "Cover upload error:",
            uploadError
        );

        redirect(
            `/admin/projects/${projectId}/edit?mediaError=upload`
        );
    }


    // ==================================================
    // PUBLIC URL
    // ==================================================

    const {
        data: publicUrlData,
    } = supabase
        .storage
        .from(BUCKET)
        .getPublicUrl(
            newPath
        );


    const publicUrl =
        publicUrlData.publicUrl;


    // ==================================================
    // DATABASE UPDATE
    // ==================================================

    const {
        error: updateError,
    } = await supabase
        .from("projects")
        .update({

            cover_image_url:
                publicUrl,

            cover_image_path:
                newPath,

        })
        .eq(
            "id",
            projectId
        );


    if (updateError) {

        console.error(
            "Cover DB update error:",
            updateError
        );


        // Nettoyage du fichier
        // nouvellement uploadé.

        await supabase
            .storage
            .from(BUCKET)
            .remove([
                newPath,
            ]);


        redirect(
            `/admin/projects/${projectId}/edit?mediaError=database`
        );
    }


    // ==================================================
    // DELETE OLD STORAGE IMAGE
    // ==================================================

    if (
        project.cover_image_path &&
        project.cover_image_path
        !== newPath
    ) {

        const {
            error: deleteOldError,
        } = await supabase
            .storage
            .from(BUCKET)
            .remove([
                project.cover_image_path,
            ]);


        if (deleteOldError) {

            console.error(
                "Old cover delete error:",
                deleteOldError
            );

        }
    }


    // ==================================================
    // REVALIDATION
    // ==================================================

    revalidatePath("/");
    revalidatePath(
        "/admin/projects"
    );

    revalidatePath(
        `/admin/projects/${projectId}/edit`
    );

    revalidatePath(
        `/projects/${project.slug}`
    );


    redirect(
        `/admin/projects/${projectId}/edit?coverUpdated=true`
    );
}

export async function saveGalleryMedia(
    projectId: string,
    items: {
        url: string;
        storagePath: string;
    }[]
) {
    const { supabase } =
        await requireAdmin();


    if (
        !items.length ||
        items.length > 6
    ) {
        throw new Error(
            "Nombre d'images invalide."
        );
    }


    const {
        data: project,
        error: projectError,
    } = await supabase
        .from("projects")
        .select(`
            id,
            slug,
            title
        `)
        .eq("id", projectId)
        .maybeSingle();


    if (
        projectError ||
        !project
    ) {
        throw new Error(
            "Projet introuvable."
        );
    }

    // ==================================================
// GLOBAL GALLERY LIMIT
// ==================================================

const {
    count: currentImageCount,
    error: countError,
} = await supabase
    .from("project_media")
    .select("*", {
        count: "exact",
        head: true,
    })
    .eq(
        "project_id",
        projectId
    )
    .eq(
        "media_type",
        "image"
    );


if (countError) {

    console.error(
        "Gallery count error:",
        countError
    );

    throw new Error(
        "Impossible de vérifier la galerie."
    );
}


const currentCount =
    currentImageCount ?? 0;


if (
    currentCount +
    items.length >
    MAX_GALLERY_IMAGES
) {

    throw new Error(
        `La galerie est limitée à ${MAX_GALLERY_IMAGES} images.`
    );

}


    const {
        data: lastMedia,
    } = await supabase
        .from("project_media")
        .select("display_order")
        .eq(
            "project_id",
            projectId
        )
        .eq(
            "media_type",
            "image"
        )
        .order(
            "display_order",
            {
                ascending: false,
            }
        )
        .limit(1)
        .maybeSingle();


    const startOrder =
        (
            lastMedia?.display_order
            ?? 0
        ) + 1;


    const rows =
        items.map(
            (
                item,
                index
            ) => ({
                project_id:
                    projectId,

                media_type:
                    "image",

                url:
                    item.url,

                storage_path:
                    item.storagePath,

                alt_text:
                    `${project.title} - image ${
                        startOrder + index
                    }`,

                display_order:
                    startOrder + index,
            })
        );


    const { error } =
        await supabase
            .from("project_media")
            .insert(rows);


    if (error) {
        console.error(
            "Gallery media insert error:",
            error
        );

        throw new Error(
            "Impossible d'enregistrer la galerie."
        );
    }


    revalidatePath("/");

    revalidatePath(
        "/admin/projects"
    );

    revalidatePath(
        `/admin/projects/${projectId}/edit`
    );

    revalidatePath(
        `/projects/${project.slug}`
    );


    return {
        success: true,
        count: items.length,
    };
}

export async function updateGalleryImageMeta(
    projectId: string,
    mediaId: string,
    altText: string,
    caption: string
) {
    const { supabase } =
        await requireAdmin();


    const {
        data: media,
        error: mediaError,
    } = await supabase
        .from("project_media")
        .select(`
            id,
            project_id
        `)
        .eq("id", mediaId)
        .eq("project_id", projectId)
        .eq("media_type", "image")
        .maybeSingle();


    if (
        mediaError ||
        !media
    ) {
        throw new Error(
            "Image introuvable."
        );
    }


    const { error } =
        await supabase
            .from("project_media")
            .update({
                alt_text:
                    altText.trim()
                    || null,

                caption:
                    caption.trim()
                    || null,
            })
            .eq("id", mediaId)
            .eq(
                "project_id",
                projectId
            );


    if (error) {
        console.error(
            "Update gallery image error:",
            error
        );

        throw new Error(
            "Impossible de modifier l'image."
        );
    }


    revalidatePath(
        `/admin/projects/${projectId}/edit`
    );


    return {
        success: true,
    };
}

export async function setGalleryImageAsCover(
    projectId: string,
    mediaId: string
) {
    const { supabase } =
        await requireAdmin();


    // ==================================================
    // PROJECT
    // ==================================================

    const {
        data: project,
        error: projectError,
    } = await supabase
        .from("projects")
        .select(`
            id,
            slug,
            cover_image_url,
            cover_image_path
        `)
        .eq("id", projectId)
        .maybeSingle();


    if (
        projectError ||
        !project
    ) {
        throw new Error(
            "Projet introuvable."
        );
    }


    // ==================================================
    // IMAGE
    // ==================================================

    const {
        data: media,
        error: mediaError,
    } = await supabase
        .from("project_media")
        .select(`
            id,
            url,
            storage_path
        `)
        .eq("id", mediaId)
        .eq(
            "project_id",
            projectId
        )
        .eq(
            "media_type",
            "image"
        )
        .maybeSingle();


    if (
        mediaError ||
        !media
    ) {
        throw new Error(
            "Image introuvable."
        );
    }


    const oldCoverPath =
        project.cover_image_path;


    // ==================================================
    // UPDATE COVER
    // ==================================================

    const { error: updateError } =
        await supabase
            .from("projects")
            .update({
                cover_image_url:
                    media.url,

                cover_image_path:
                    media.storage_path
                    ?? null,
            })
            .eq(
                "id",
                projectId
            );


    if (updateError) {
        console.error(
            "Set cover error:",
            updateError
        );

        throw new Error(
            "Impossible de modifier la couverture."
        );
    }


    // ==================================================
    // OPTIONAL OLD COVER CLEANUP
    // ==================================================

    /*
       On ne supprime l'ancienne image Storage
       que si elle n'est utilisée par aucune
       image de galerie.

       Cela évite de casser une image encore
       visible dans project_media.
    */

    if (
        oldCoverPath &&
        oldCoverPath !==
            media.storage_path
    ) {

        const {
            data: reference,
        } = await supabase
            .from("project_media")
            .select("id")
            .eq(
                "storage_path",
                oldCoverPath
            )
            .limit(1)
            .maybeSingle();


        if (!reference) {

            const {
                error: removeError,
            } = await supabase
                .storage
                .from(BUCKET)
                .remove([
                    oldCoverPath,
                ]);


            if (removeError) {
                console.error(
                    "Old cover cleanup error:",
                    removeError
                );
            }

        }

    }


    // ==================================================
    // REVALIDATION
    // ==================================================

    revalidatePath("/");

    revalidatePath(
        "/admin"
    );

    revalidatePath(
        "/admin/projects"
    );

    revalidatePath(
        `/admin/projects/${projectId}/edit`
    );

    revalidatePath(
        `/projects/${project.slug}`
    );


    return {
        success: true,
    };
}

export async function deleteGalleryImage(
    projectId: string,
    mediaId: string
) {
    const { supabase } =
        await requireAdmin();


    // ==================================================
    // PROJECT
    // ==================================================

    const {
        data: project,
        error: projectError,
    } = await supabase
        .from("projects")
        .select(`
            id,
            slug,
            cover_image_url,
            cover_image_path
        `)
        .eq("id", projectId)
        .maybeSingle();


    if (
        projectError ||
        !project
    ) {
        throw new Error(
            "Projet introuvable."
        );
    }


    // ==================================================
    // MEDIA
    // ==================================================

    const {
        data: media,
        error: mediaError,
    } = await supabase
        .from("project_media")
        .select(`
            id,
            url,
            storage_path,
            display_order
        `)
        .eq("id", mediaId)
        .eq(
            "project_id",
            projectId
        )
        .eq(
            "media_type",
            "image"
        )
        .maybeSingle();


    if (
        mediaError ||
        !media
    ) {
        throw new Error(
            "Image introuvable."
        );
    }


    // ==================================================
    // IS THIS IMAGE THE CURRENT COVER?
    // ==================================================

    const isCurrentCover =
        project.cover_image_url
            === media.url
        ||
        (
            media.storage_path &&
            project.cover_image_path
                === media.storage_path
        );


    if (isCurrentCover) {

        const {
            error:
                clearCoverError,
        } = await supabase
            .from("projects")
            .update({
                cover_image_url:
                    null,

                cover_image_path:
                    null,
            })
            .eq(
                "id",
                projectId
            );


        if (clearCoverError) {
            console.error(
                "Clear cover error:",
                clearCoverError
            );

            throw new Error(
                "Impossible de retirer la couverture."
            );
        }

    }


    // ==================================================
    // DELETE DATABASE ROW
    // ==================================================

    const {
        error: deleteError,
    } = await supabase
        .from("project_media")
        .delete()
        .eq("id", mediaId)
        .eq(
            "project_id",
            projectId
        );


    if (deleteError) {
        console.error(
            "Delete gallery DB error:",
            deleteError
        );

        throw new Error(
            "Impossible de supprimer l'image."
        );
    }


    // ==================================================
    // DELETE STORAGE FILE
    // ==================================================

    /*
       Les anciennes images locales ont
       storage_path = null.

       Dans ce cas, on supprime seulement
       la ligne project_media.
    */

    if (media.storage_path) {

        const {
            error: storageError,
        } = await supabase
            .storage
            .from(BUCKET)
            .remove([
                media.storage_path,
            ]);


        if (storageError) {
            console.error(
                "Gallery Storage delete error:",
                storageError
            );
        }

    }


    // ==================================================
    // REINDEX DISPLAY ORDER
    // ==================================================

    const {
        data: remainingImages,
    } = await supabase
        .from("project_media")
        .select(`
            id,
            display_order
        `)
        .eq(
            "project_id",
            projectId
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


    if (remainingImages) {

        for (
            let index = 0;
            index <
            remainingImages.length;
            index++
        ) {

            const expectedOrder =
                index + 1;


            if (
                remainingImages[index]
                    .display_order
                !== expectedOrder
            ) {

                await supabase
                    .from("project_media")
                    .update({
                        display_order:
                            expectedOrder,
                    })
                    .eq(
                        "id",
                        remainingImages[index]
                            .id
                    );

            }

        }

    }


    // ==================================================
    // REVALIDATION
    // ==================================================

    revalidatePath("/");

    revalidatePath(
        "/admin/projects"
    );

    revalidatePath(
        `/admin/projects/${projectId}/edit`
    );

    revalidatePath(
        `/projects/${project.slug}`
    );


    return {
        success: true,
    };
}

export async function moveGalleryImage(
    projectId: string,
    mediaId: string,
    direction: "up" | "down"
) {
    const { supabase } =
        await requireAdmin();


    // ==================================================
    // PROJECT
    // ==================================================

    const {
        data: project,
        error: projectError,
    } = await supabase
        .from("projects")
        .select(`
            id,
            slug
        `)
        .eq("id", projectId)
        .maybeSingle();


    if (
        projectError ||
        !project
    ) {
        throw new Error(
            "Projet introuvable."
        );
    }


    // ==================================================
    // CURRENT IMAGE
    // ==================================================

    const {
        data: currentImage,
        error: currentError,
    } = await supabase
        .from("project_media")
        .select(`
            id,
            display_order
        `)
        .eq("id", mediaId)
        .eq(
            "project_id",
            projectId
        )
        .eq(
            "media_type",
            "image"
        )
        .maybeSingle();


    if (
        currentError ||
        !currentImage
    ) {
        throw new Error(
            "Image introuvable."
        );
    }


    // ==================================================
    // FIND NEIGHBOUR
    // ==================================================

    let neighbourQuery =
        supabase
            .from("project_media")
            .select(`
                id,
                display_order
            `)
            .eq(
                "project_id",
                projectId
            )
            .eq(
                "media_type",
                "image"
            );


    if (direction === "up") {

        neighbourQuery =
            neighbourQuery
                .lt(
                    "display_order",
                    currentImage.display_order
                )
                .order(
                    "display_order",
                    {
                        ascending: false,
                    }
                );

    } else {

        neighbourQuery =
            neighbourQuery
                .gt(
                    "display_order",
                    currentImage.display_order
                )
                .order(
                    "display_order",
                    {
                        ascending: true,
                    }
                );
    }


    const {
        data: neighbour,
        error: neighbourError,
    } = await neighbourQuery
        .limit(1)
        .maybeSingle();


    if (neighbourError) {
        throw new Error(
            "Impossible de déterminer la nouvelle position."
        );
    }


    // Première image déjà en haut
    // ou dernière déjà en bas.
    if (!neighbour) {

        return {
            success: false,
            reason: "edge",
        };

    }


    // ==================================================
    // SWAP ORDERS
    // ==================================================

    const currentOrder =
        currentImage.display_order;

    const neighbourOrder =
        neighbour.display_order;


    const {
        error: firstUpdateError,
    } = await supabase
        .from("project_media")
        .update({
            display_order:
                neighbourOrder,
        })
        .eq(
            "id",
            currentImage.id
        );


    if (firstUpdateError) {
        console.error(
            "Move gallery first update error:",
            firstUpdateError
        );

        throw new Error(
            "Impossible de déplacer l'image."
        );
    }


    const {
        error: secondUpdateError,
    } = await supabase
        .from("project_media")
        .update({
            display_order:
                currentOrder,
        })
        .eq(
            "id",
            neighbour.id
        );


    if (secondUpdateError) {

        console.error(
            "Move gallery second update error:",
            secondUpdateError
        );

        // Tentative de restauration
        await supabase
            .from("project_media")
            .update({
                display_order:
                    currentOrder,
            })
            .eq(
                "id",
                currentImage.id
            );

        throw new Error(
            "Impossible de terminer le déplacement."
        );
    }


    // ==================================================
    // REVALIDATION
    // ==================================================

    revalidatePath("/");

    revalidatePath(
        `/admin/projects/${projectId}/edit`
    );

    revalidatePath(
        `/projects/${project.slug}`
    );


    return {
        success: true,
    };
}

export async function saveProjectVideo(
    projectId: string,
    storagePath: string,
    caption: string
) {
    const { supabase } =
        await requireAdmin();


    // ==================================================
    // PROJECT
    // ==================================================

    const {
        data: project,
        error: projectError,
    } = await supabase
        .from("projects")
        .select(`
            id,
            slug,
            title
        `)
        .eq("id", projectId)
        .maybeSingle();


    if (
        projectError ||
        !project
    ) {
        throw new Error(
            "Projet introuvable."
        );
    }


    // ==================================================
    // SECURITY : STORAGE PATH
    // ==================================================

    const expectedPrefix =
        `${project.slug}/videos/`;


    if (
        !storagePath.startsWith(
            expectedPrefix
        )
    ) {
        throw new Error(
            "Chemin vidéo invalide."
        );
    }


    // ==================================================
    // GLOBAL LIMIT
    // ==================================================

    const {
        count,
        error: countError,
    } = await supabase
        .from("project_media")
        .select("*", {
            count: "exact",
            head: true,
        })
        .eq(
            "project_id",
            projectId
        )
        .eq(
            "media_type",
            "video"
        );


    if (countError) {
        throw new Error(
            "Impossible de vérifier les vidéos."
        );
    }


    if (
        (count ?? 0) >=
        MAX_PROJECT_VIDEOS
    ) {
        throw new Error(
            "La limite de vidéos est atteinte."
        );
    }


    // ==================================================
    // DISPLAY ORDER
    // ==================================================

    const {
        data: lastVideo,
    } = await supabase
        .from("project_media")
        .select("display_order")
        .eq(
            "project_id",
            projectId
        )
        .eq(
            "media_type",
            "video"
        )
        .order(
            "display_order",
            {
                ascending: false,
            }
        )
        .limit(1)
        .maybeSingle();


    const displayOrder =
        (
            lastVideo
                ?.display_order ?? 0
        ) + 1;


    // ==================================================
    // PUBLIC URL
    // ==================================================

    const {
        data: publicUrlData,
    } = supabase
        .storage
        .from(VIDEO_BUCKET)
        .getPublicUrl(
            storagePath
        );


    // ==================================================
    // DATABASE
    // ==================================================

    const { error } =
        await supabase
            .from("project_media")
            .insert({
                project_id:
                    projectId,

                media_type:
                    "video",

                url:
                    publicUrlData.publicUrl,

                storage_path:
                    storagePath,

                caption:
                    caption.trim()
                    || null,

                alt_text:
                    project.title,

                display_order:
                    displayOrder,
            });


    if (error) {
        console.error(
            "Save project video error:",
            error
        );

        throw new Error(
            "Impossible d'enregistrer la vidéo."
        );
    }


    // ==================================================
    // REVALIDATION
    // ==================================================

    revalidatePath("/");

    revalidatePath(
        `/admin/projects/${projectId}/edit`
    );

    revalidatePath(
        `/projects/${project.slug}`
    );


    return {
        success: true,
    };
}

export async function updateProjectVideo(
    projectId: string,
    mediaId: string,
    caption: string
) {
    const { supabase } =
        await requireAdmin();


    const { error } =
        await supabase
            .from("project_media")
            .update({
                caption:
                    caption.trim()
                    || null,
            })
            .eq(
                "id",
                mediaId
            )
            .eq(
                "project_id",
                projectId
            )
            .eq(
                "media_type",
                "video"
            );


    if (error) {
        console.error(
            "Update video error:",
            error
        );

        throw new Error(
            "Impossible de modifier la vidéo."
        );
    }


    revalidatePath(
        `/admin/projects/${projectId}/edit`
    );


    return {
        success: true,
    };
}

export async function deleteProjectVideo(
    projectId: string,
    mediaId: string
) {
    const { supabase } =
        await requireAdmin();


    // ==================================================
    // PROJECT
    // ==================================================

    const {
        data: project,
        error: projectError,
    } = await supabase
        .from("projects")
        .select(`
            id,
            slug
        `)
        .eq(
            "id",
            projectId
        )
        .maybeSingle();


    if (
        projectError ||
        !project
    ) {
        throw new Error(
            "Projet introuvable."
        );
    }


    // ==================================================
    // VIDEO
    // ==================================================

    const {
        data: video,
        error: videoError,
    } = await supabase
        .from("project_media")
        .select(`
            id,
            storage_path
        `)
        .eq(
            "id",
            mediaId
        )
        .eq(
            "project_id",
            projectId
        )
        .eq(
            "media_type",
            "video"
        )
        .maybeSingle();


    if (
        videoError ||
        !video
    ) {
        throw new Error(
            "Vidéo introuvable."
        );
    }


    // ==================================================
    // DELETE DB
    // ==================================================

    const {
        error: deleteError,
    } = await supabase
        .from("project_media")
        .delete()
        .eq(
            "id",
            mediaId
        );


    if (deleteError) {
        throw new Error(
            "Impossible de supprimer la vidéo."
        );
    }


    // ==================================================
    // DELETE STORAGE
    // ==================================================

    if (
        video.storage_path
    ) {
        const {
            error: storageError,
        } = await supabase
            .storage
            .from(VIDEO_BUCKET)
            .remove([
                video.storage_path,
            ]);


        if (storageError) {
            console.error(
                "Video Storage deletion:",
                storageError
            );
        }
    }


    // ==================================================
    // REINDEX
    // ==================================================

    const {
        data: remainingVideos,
    } = await supabase
        .from("project_media")
        .select(`
            id,
            display_order
        `)
        .eq(
            "project_id",
            projectId
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


    if (remainingVideos) {

        for (
            let index = 0;
            index <
            remainingVideos.length;
            index++
        ) {

            const newOrder =
                index + 1;


            if (
                remainingVideos[index]
                    .display_order
                !== newOrder
            ) {

                await supabase
                    .from("project_media")
                    .update({
                        display_order:
                            newOrder,
                    })
                    .eq(
                        "id",
                        remainingVideos[index]
                            .id
                    );

            }

        }

    }


    revalidatePath("/");

    revalidatePath(
        `/admin/projects/${projectId}/edit`
    );

    revalidatePath(
        `/projects/${project.slug}`
    );


    return {
        success: true,
    };
}