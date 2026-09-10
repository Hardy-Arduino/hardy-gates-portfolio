"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

export async function updateProject(
    projectId: string,
    formData: FormData
) {
    const { supabase } =
        await requireAdmin();

    // Projet actuel : utile si le slug change.
    const {
        data: currentProject,
        error: currentError,
    } = await supabase
        .from("projects")
        .select("slug")
        .eq("id", projectId)
        .maybeSingle();

    if (
        currentError ||
        !currentProject
    ) {
        redirect(
            "/admin/projects?error=not-found"
        );
    }

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
        getString(formData, "category");

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

    // =========================
    // VALIDATION
    // =========================

    if (
        !title ||
        !shortDescription ||
        !description ||
        !category
    ) {
        redirect(
            `/admin/projects/${projectId}/edit?error=missing`
        );
    }

    const slug =
        slugify(
            requestedSlug || title
        );

    if (!slug) {
        redirect(
            `/admin/projects/${projectId}/edit?error=slug`
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
            `/admin/projects/${projectId}/edit?error=year`
        );
    }

    const displayOrder =
        displayOrderRaw
            ? Number(displayOrderRaw)
            : 0;

    if (
        !Number.isInteger(displayOrder) ||
        displayOrder < 0
    ) {
        redirect(
            `/admin/projects/${projectId}/edit?error=order`
        );
    }

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

    // =========================
    // UPDATE
    // =========================

    const { error } =
        await supabase
            .from("projects")
            .update({
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
            .eq("id", projectId);

    if (error) {
        console.error(
            "Update project error:",
            error
        );

        if (error.code === "23505") {
            redirect(
                `/admin/projects/${projectId}/edit?error=duplicate`
            );
        }

        redirect(
            `/admin/projects/${projectId}/edit?error=database`
        );
    }

    // Ancienne URL si changement de slug
    revalidatePath(
        `/projects/${currentProject.slug}`
    );

    revalidatePath(
        `/projects/${slug}`
    );

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");

    redirect(
        `/admin/projects?updated=${projectId}`
    );
}

export async function deleteProject(
    projectId: string
) {
    const { supabase } =
        await requireAdmin();

    // Récupère le projet avant suppression
    const {
        data: project,
        error: projectError,
    } = await supabase
        .from("projects")
        .select("id, slug, title")
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


    // Suppression
    const { error } =
        await supabase
            .from("projects")
            .delete()
            .eq("id", projectId);


    if (error) {
        console.error(
            "Delete project error:",
            error
        );

        redirect(
            `/admin/projects/${projectId}/edit?error=delete`
        );
    }


    // Rafraîchissement du site
    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");

    revalidatePath(
        `/projects/${project.slug}`
    );


    redirect(
        "/admin/projects?deleted=true"
    );
}

