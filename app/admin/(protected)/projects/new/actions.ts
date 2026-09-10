"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";

function getString(
    formData: FormData,
    key: string
) {
    return String(
        formData.get(key) ?? ""
    ).trim();
}


function slugify(value: string) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}


export async function createProject(
    formData: FormData
) {

    // Sécurité :
    // l'action vérifie elle-même l'administrateur.
    const { supabase } =
        await requireAdmin();


    const title =
        getString(formData, "title");

    const requestedSlug =
        getString(formData, "slug");

    const shortDescription =
        getString(
            formData,
            "shortDescription"
        );

    const description =
        getString(
            formData,
            "description"
        );

    const category =
        getString(
            formData,
            "category"
        );

    const yearRaw =
        getString(formData, "year");

    const status =
        getString(formData, "status");

    const technologiesRaw =
        getString(
            formData,
            "technologies"
        );

    const githubUrl =
        getString(
            formData,
            "githubUrl"
        );

    const demoUrl =
        getString(
            formData,
            "demoUrl"
        );

    const displayOrderRaw =
        getString(
            formData,
            "displayOrder"
        );


    // ==================================================
    // VALIDATION
    // ==================================================

    if (
        !title ||
        !shortDescription ||
        !description ||
        !category
    ) {
        redirect(
            "/admin/projects/new?error=missing"
        );
    }


    const slug =
        slugify(
            requestedSlug || title
        );

    if (!slug) {
        redirect(
            "/admin/projects/new?error=slug"
        );
    }


    const year =
        yearRaw
            ? Number(yearRaw)
            : null;

    if (
        year !== null &&
        (
            !Number.isInteger(year) ||
            year < 1900 ||
            year > 2100
        )
    ) {
        redirect(
            "/admin/projects/new?error=year"
        );
    }


    // ESP32, IoT, Arduino
    // devient :
    // ["ESP32", "IoT", "Arduino"]

    const technologies =
        technologiesRaw
            .split(",")
            .map((technology) =>
                technology.trim()
            )
            .filter(Boolean);


    const featured =
        formData.get("featured")
        === "on";

    const published =
        formData.get("published")
        === "on";


    // ==================================================
    // ORDRE D'AFFICHAGE
    // ==================================================

    let displayOrder: number;

    if (displayOrderRaw) {

        const parsed =
            Number(displayOrderRaw);

        if (
            !Number.isInteger(parsed) ||
            parsed < 0
        ) {
            redirect(
                "/admin/projects/new?error=order"
            );
        }

        displayOrder = parsed;

    } else {

        // Si l'admin ne donne aucun ordre,
        // on place automatiquement le projet à la fin.

        const {
            data: lastProject,
        } = await supabase
            .from("projects")
            .select("display_order")
            .order(
                "display_order",
                {
                    ascending: false,
                }
            )
            .limit(1)
            .maybeSingle();

        displayOrder =
            (
                lastProject
                    ?.display_order ?? 0
            ) + 1;
    }


    // ==================================================
    // INSERTION
    // ==================================================

    const {
        data: project,
        error,
    } = await supabase
        .from("projects")
        .insert({
            slug,
            title,

            short_description:
                shortDescription,

            description,
            category,
            year,

            status:
                status || "Prototype",

            technologies,

            github_url:
                githubUrl || null,

            demo_url:
                demoUrl || null,

            featured,
            published,
            display_order:
                displayOrder,
        })
        .select("id")
        .single();


    if (error) {

        console.error(
            "Create project error:",
            error
        );

        // slug déjà utilisé
        if (error.code === "23505") {
            redirect(
                "/admin/projects/new?error=duplicate"
            );
        }

        redirect(
            "/admin/projects/new?error=database"
        );
    }


    // ==================================================
    // RAFRAÎCHISSEMENT
    // ==================================================

    revalidatePath(
        "/admin/projects"
    );

    revalidatePath("/");

    revalidatePath(
        `/projects/${slug}`
    );


    // Plus tard, on pourra rediriger
    // directement vers l'éditeur du projet.

    redirect(
        `/admin/projects?created=${project.id}`
    );
}