"use server";

import {
    revalidatePath,
} from "next/cache";

import {
    redirect,
} from "next/navigation";

import {
    requireAdmin,
} from "@/lib/admin/auth";

import type {
    HeroContent,
} from "@/lib/content/hero";

import type {
    AboutContent,
} from "@/lib/content/about";

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

export async function updateHeroContent(
    formData: FormData
) {

    const { supabase } =
        await requireAdmin();


    const eyebrow =
        getString(
            formData,
            "eyebrow"
        );

    const titleLine1 =
        getString(
            formData,
            "titleLine1"
        );

    const titleAccent =
        getString(
            formData,
            "titleAccent"
        );

    const sectionLabel =
        getString(
            formData,
            "sectionLabel"
        );

    const masteryLine1 =
        getString(
            formData,
            "masteryLine1"
        );

    const masteryAccent =
        getString(
            formData,
            "masteryAccent"
        );

    const description =
        getString(
            formData,
            "description"
        );

    const badgesRaw =
        getString(
            formData,
            "badges"
        );

    const profileBadge =
        getString(
            formData,
            "profileBadge"
        );

    const primaryButtonLabel =
        getString(
            formData,
            "primaryButtonLabel"
        );

    const secondaryButtonLabel =
        getString(
            formData,
            "secondaryButtonLabel"
        );


    // ==================================================
    // VALIDATION
    // ==================================================

    if (
        !eyebrow ||
        !titleLine1 ||
        !titleAccent ||
        !sectionLabel ||
        !masteryLine1 ||
        !masteryAccent ||
        !description ||
        !primaryButtonLabel ||
        !secondaryButtonLabel
    ) {

        redirect(
            "/admin/content?heroError=missing"
        );
    }


    const badges =
        badgesRaw
            .split(
                /\r?\n|,/g
            )
            .map(
                (badge) =>
                    badge.trim()
            )
            .filter(Boolean)
            .slice(
                0,
                8
            );


    if (
        badges.length === 0
    ) {

        redirect(
            "/admin/content?heroError=badges"
        );
    }


    const content:
        HeroContent = {

        eyebrow,

        titleLine1,
        titleAccent,

        sectionLabel,

        masteryLine1,
        masteryAccent,

        description,

        badges,

        profileBadge,

        primaryButtonLabel,
        secondaryButtonLabel,
    };


    // ==================================================
    // UPSERT
    // ==================================================

    const { error } =
        await supabase
            .from("site_content")
            .upsert(
                {
                    section:
                        "hero",

                    content_key:
                        "main",

                    content,

                    updated_at:
                        new Date()
                            .toISOString(),
                },
                {
                    onConflict:
                        "section,content_key",
                }
            );


    if (error) {

        console.error(
            "Hero update error:",
            error
        );

        redirect(
            "/admin/content?heroError=database"
        );
    }


    revalidatePath("/");

    revalidatePath(
        "/admin/content"
    );


    redirect(
        "/admin/content?heroUpdated=true"
    );
}

export async function updateAboutContent(
    formData: FormData
) {

    const { supabase } =
        await requireAdmin();


    const eyebrow =
        getString(
            formData,
            "aboutEyebrow"
        );

    const titleLine1 =
        getString(
            formData,
            "aboutTitleLine1"
        );

    const titleLine2 =
        getString(
            formData,
            "aboutTitleLine2"
        );

    const titleAccent =
        getString(
            formData,
            "aboutTitleAccent"
        );

    const description =
        getString(
            formData,
            "aboutDescription"
        );

    const secondaryDescription =
        getString(
            formData,
            "aboutSecondaryDescription"
        );

    const thirdDescription =
    getString(
        formData,
        "aboutThirdDescription"
    );


    // ==================================================
    // VALIDATION
    // ==================================================

    if (
        !eyebrow ||
        !titleLine1 ||
        !titleLine2 ||
        !titleAccent ||
        !description
    ) {

        redirect(
            "/admin/content?aboutError=missing#about"
        );

    }


    const content:
        AboutContent = {

        eyebrow,

        titleLine1,
        titleLine2,
        titleAccent,

        description,

        secondaryDescription,
        thirdDescription,
    };


    // ==================================================
    // UPSERT
    // ==================================================

    const { error } =
        await supabase
            .from("site_content")
            .upsert(
                {
                    section:
                        "about",

                    content_key:
                        "main",

                    content,

                    updated_at:
                        new Date()
                            .toISOString(),
                },
                {
                    onConflict:
                        "section,content_key",
                }
            );


    if (error) {

        console.error(
            "About update error:",
            error
        );

        redirect(
            "/admin/content?aboutError=database#about"
        );

    }


    revalidatePath("/");

    revalidatePath(
        "/admin/content"
    );


    redirect(
        "/admin/content?aboutUpdated=true#about"
    );
}

export async function createSkillCategory(
    formData: FormData
) {

    const { supabase } =
        await requireAdmin();


    const name =
        getString(
            formData,
            "categoryName"
        );


    if (!name) {

        redirect(
            "/admin/content?skillsError=category-name#skills"
        );
    }


    let slug =
        slugify(name);


    if (!slug) {

        redirect(
            "/admin/content?skillsError=category-name#skills"
        );
    }


    // ==================================================
    // UNIQUE SLUG
    // ==================================================

    const {
        data: existingSlug,
    } = await supabase
        .from("skill_categories")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();


    if (existingSlug) {

        slug =
            `${slug}-${Date.now()}`;

    }


    // ==================================================
    // NEXT DISPLAY ORDER
    // ==================================================

    const {
        data: lastCategory,
    } = await supabase
        .from("skill_categories")
        .select("display_order")
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
            lastCategory
                ?.display_order ?? 0
        ) + 1;


    // ==================================================
    // INSERT
    // ==================================================

    const { error } =
        await supabase
            .from("skill_categories")
            .insert({
                name,
                slug,
                display_order:
                    displayOrder,
            });


    if (error) {

        console.error(
            "Create skill category error:",
            error
        );

        redirect(
            "/admin/content?skillsError=category-create#skills"
        );
    }


    revalidatePath("/");
    revalidatePath(
        "/admin/content"
    );


    redirect(
        "/admin/content?skillsUpdated=category-created#skills"
    );
}

export async function updateSkillCategory(
    categoryId: string,
    formData: FormData
) {

    const { supabase } =
        await requireAdmin();


    const name =
        getString(
            formData,
            "categoryName"
        );


    if (!name) {

        redirect(
            "/admin/content?skillsError=category-name#skills"
        );
    }


    const slug =
        slugify(name);


    if (!slug) {

        redirect(
            "/admin/content?skillsError=category-name#skills"
        );
    }


    // Vérifier si ce slug appartient déjà
    // à une autre catégorie.

    const {
        data: duplicate,
    } = await supabase
        .from("skill_categories")
        .select("id")
        .eq("slug", slug)
        .neq("id", categoryId)
        .maybeSingle();


    if (duplicate) {

        redirect(
            "/admin/content?skillsError=category-duplicate#skills"
        );
    }


    const { error } =
        await supabase
            .from("skill_categories")
            .update({
                name,
                slug,
            })
            .eq(
                "id",
                categoryId
            );


    if (error) {

        console.error(
            "Update category error:",
            error
        );

        redirect(
            "/admin/content?skillsError=category-update#skills"
        );
    }


    revalidatePath("/");
    revalidatePath(
        "/admin/content"
    );


    redirect(
        "/admin/content?skillsUpdated=category-updated#skills"
    );
}

export async function moveSkillCategory(
    categoryId: string,
    direction: "up" | "down"
) {

    const { supabase } =
        await requireAdmin();


    const {
        data: currentCategory,
        error: currentError,
    } = await supabase
        .from("skill_categories")
        .select(`
            id,
            display_order
        `)
        .eq(
            "id",
            categoryId
        )
        .maybeSingle();


    if (
        currentError ||
        !currentCategory
    ) {

        redirect(
            "/admin/content?skillsError=category-not-found#skills"
        );
    }


    let neighbourQuery =
        supabase
            .from("skill_categories")
            .select(`
                id,
                display_order
            `);


    if (
        direction === "up"
    ) {

        neighbourQuery =
            neighbourQuery
                .lt(
                    "display_order",
                    currentCategory.display_order
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
                    currentCategory.display_order
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

        redirect(
            "/admin/content?skillsError=category-move#skills"
        );
    }


    if (!neighbour) {

        redirect(
            "/admin/content#skills"
        );
    }


    const currentOrder =
        currentCategory.display_order;

    const neighbourOrder =
        neighbour.display_order;


    const {
        error: firstError,
    } = await supabase
        .from("skill_categories")
        .update({
            display_order:
                neighbourOrder,
        })
        .eq(
            "id",
            currentCategory.id
        );


    if (firstError) {

        redirect(
            "/admin/content?skillsError=category-move#skills"
        );
    }


    const {
        error: secondError,
    } = await supabase
        .from("skill_categories")
        .update({
            display_order:
                currentOrder,
        })
        .eq(
            "id",
            neighbour.id
        );


    if (secondError) {

        // restauration
        await supabase
            .from("skill_categories")
            .update({
                display_order:
                    currentOrder,
            })
            .eq(
                "id",
                currentCategory.id
            );


        redirect(
            "/admin/content?skillsError=category-move#skills"
        );
    }


    revalidatePath("/");
    revalidatePath(
        "/admin/content"
    );


    redirect(
        "/admin/content?skillsUpdated=category-moved#skills"
    );
}

export async function deleteSkillCategory(
    categoryId: string
) {

    const { supabase } =
        await requireAdmin();


    // ==================================================
    // CHECK SKILLS
    // ==================================================

    const {
        count,
        error: countError,
    } = await supabase
        .from("skills")
        .select("*", {
            count: "exact",
            head: true,
        })
        .eq(
            "category_id",
            categoryId
        );


    if (countError) {

        redirect(
            "/admin/content?skillsError=category-delete#skills"
        );
    }


    if (
        (count ?? 0) > 0
    ) {

        redirect(
            "/admin/content?skillsError=category-not-empty#skills"
        );
    }


    // ==================================================
    // DELETE
    // ==================================================

    const { error } =
        await supabase
            .from("skill_categories")
            .delete()
            .eq(
                "id",
                categoryId
            );


    if (error) {

        console.error(
            "Delete category error:",
            error
        );

        redirect(
            "/admin/content?skillsError=category-delete#skills"
        );
    }


    revalidatePath("/");
    revalidatePath(
        "/admin/content"
    );


    redirect(
        "/admin/content?skillsUpdated=category-deleted#skills"
    );
}

export async function createSkill(
    formData: FormData
) {

    const { supabase } =
        await requireAdmin();


    const name =
        getString(
            formData,
            "skillName"
        );

    const categoryId =
        getString(
            formData,
            "skillCategoryId"
        );

    const level =
        getString(
            formData,
            "skillLevel"
        );

    const percentageRaw =
        getString(
            formData,
            "skillPercentage"
        );

    const published =
        formData.get(
            "skillPublished"
        ) === "on";


    // ==================================================
    // VALIDATION
    // ==================================================

    if (
        !name ||
        !categoryId
    ) {

        redirect(
            "/admin/content?skillsError=skill-missing#skills"
        );
    }


    let percentage:
        number | null = null;


    if (percentageRaw) {

        const parsed =
            Number(
                percentageRaw
            );


        if (
            !Number.isInteger(parsed) ||
            parsed < 0 ||
            parsed > 100
        ) {

            redirect(
                "/admin/content?skillsError=skill-percentage#skills"
            );
        }


        percentage =
            parsed;
    }


    // ==================================================
    // CATEGORY EXISTS
    // ==================================================

    const {
        data: category,
        error: categoryError,
    } = await supabase
        .from(
            "skill_categories"
        )
        .select("id")
        .eq(
            "id",
            categoryId
        )
        .maybeSingle();


    if (
        categoryError ||
        !category
    ) {

        redirect(
            "/admin/content?skillsError=skill-category#skills"
        );
    }


    // ==================================================
    // NEXT ORDER IN CATEGORY
    // ==================================================

    const {
        data: lastSkill,
    } = await supabase
        .from("skills")
        .select(
            "display_order"
        )
        .eq(
            "category_id",
            categoryId
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
            lastSkill
                ?.display_order ?? 0
        ) + 1;


    // ==================================================
    // INSERT
    // ==================================================

    const { error } =
        await supabase
            .from("skills")
            .insert({
                category_id:
                    categoryId,

                name,

                level:
                    level || null,

                percentage,

                published,

                display_order:
                    displayOrder,

                updated_at:
                    new Date()
                        .toISOString(),
            });


    if (error) {

        console.error(
            "Create skill error:",
            error
        );

        redirect(
            "/admin/content?skillsError=skill-create#skills"
        );
    }


    revalidatePath("/");
    revalidatePath(
        "/admin/content"
    );


    redirect(
        "/admin/content?skillsUpdated=skill-created#skills"
    );
}

export async function updateSkill(
    skillId: string,
    formData: FormData
) {

    const { supabase } =
        await requireAdmin();


    const name =
        getString(
            formData,
            "skillName"
        );

    const categoryId =
        getString(
            formData,
            "skillCategoryId"
        );

    const level =
        getString(
            formData,
            "skillLevel"
        );

    const percentageRaw =
        getString(
            formData,
            "skillPercentage"
        );


    if (
        !name ||
        !categoryId
    ) {

        redirect(
            "/admin/content?skillsError=skill-missing#skills"
        );
    }


    let percentage:
        number | null = null;


    if (percentageRaw) {

        const parsed =
            Number(
                percentageRaw
            );


        if (
            !Number.isInteger(parsed) ||
            parsed < 0 ||
            parsed > 100
        ) {

            redirect(
                "/admin/content?skillsError=skill-percentage#skills"
            );
        }


        percentage =
            parsed;
    }


    // ==================================================
    // CURRENT SKILL
    // ==================================================

    const {
        data: currentSkill,
        error: currentError,
    } = await supabase
        .from("skills")
        .select(`
            id,
            category_id,
            display_order
        `)
        .eq(
            "id",
            skillId
        )
        .maybeSingle();


    if (
        currentError ||
        !currentSkill
    ) {

        redirect(
            "/admin/content?skillsError=skill-not-found#skills"
        );
    }


    // ==================================================
    // TARGET CATEGORY
    // ==================================================

    const {
        data: targetCategory,
    } = await supabase
        .from(
            "skill_categories"
        )
        .select("id")
        .eq(
            "id",
            categoryId
        )
        .maybeSingle();


    if (!targetCategory) {

        redirect(
            "/admin/content?skillsError=skill-category#skills"
        );
    }


    const categoryChanged =
        currentSkill.category_id
        !== categoryId;


    let newDisplayOrder =
        currentSkill.display_order;


    // Si on change de catégorie,
    // placer la compétence à la fin.

    if (categoryChanged) {

        const {
            data: lastTargetSkill,
        } = await supabase
            .from("skills")
            .select(
                "display_order"
            )
            .eq(
                "category_id",
                categoryId
            )
            .order(
                "display_order",
                {
                    ascending:
                        false,
                }
            )
            .limit(1)
            .maybeSingle();


        newDisplayOrder =
            (
                lastTargetSkill
                    ?.display_order
                ?? 0
            ) + 1;
    }


    // ==================================================
    // UPDATE
    // ==================================================

    const { error } =
        await supabase
            .from("skills")
            .update({
                name,

                category_id:
                    categoryId,

                level:
                    level || null,

                percentage,

                display_order:
                    newDisplayOrder,

                updated_at:
                    new Date()
                        .toISOString(),
            })
            .eq(
                "id",
                skillId
            );


    if (error) {

        console.error(
            "Update skill error:",
            error
        );

        redirect(
            "/admin/content?skillsError=skill-update#skills"
        );
    }


    // ==================================================
    // REINDEX OLD CATEGORY
    // ==================================================

    if (categoryChanged) {

        const {
            data: oldSkills,
        } = await supabase
            .from("skills")
            .select(`
                id,
                display_order
            `)
            .eq(
                "category_id",
                currentSkill.category_id
            )
            .order(
                "display_order",
                {
                    ascending: true,
                }
            );


        if (oldSkills) {

            for (
                let index = 0;
                index <
                oldSkills.length;
                index++
            ) {

                const wantedOrder =
                    index + 1;


                if (
                    oldSkills[index]
                        .display_order
                    !== wantedOrder
                ) {

                    await supabase
                        .from("skills")
                        .update({
                            display_order:
                                wantedOrder,
                        })
                        .eq(
                            "id",
                            oldSkills[
                                index
                            ].id
                        );
                }
            }
        }
    }


    revalidatePath("/");
    revalidatePath(
        "/admin/content"
    );


    redirect(
        "/admin/content?skillsUpdated=skill-updated#skills"
    );
}

export async function toggleSkillPublished(
    skillId: string
) {

    const { supabase } =
        await requireAdmin();


    const {
        data: skill,
        error: skillError,
    } = await supabase
        .from("skills")
        .select(`
            id,
            published
        `)
        .eq(
            "id",
            skillId
        )
        .maybeSingle();


    if (
        skillError ||
        !skill
    ) {

        redirect(
            "/admin/content?skillsError=skill-not-found#skills"
        );
    }


    const { error } =
        await supabase
            .from("skills")
            .update({
                published:
                    !skill.published,

                updated_at:
                    new Date()
                        .toISOString(),
            })
            .eq(
                "id",
                skillId
            );


    if (error) {

        redirect(
            "/admin/content?skillsError=skill-publish#skills"
        );
    }


    revalidatePath("/");
    revalidatePath(
        "/admin/content"
    );


    redirect(
        `/admin/content?skillsUpdated=${
            skill.published
                ? "skill-hidden"
                : "skill-published"
        }#skills`
    );
}

export async function moveSkill(
    skillId: string,
    direction: "up" | "down"
) {

    const { supabase } =
        await requireAdmin();


    const {
        data: currentSkill,
        error: currentError,
    } = await supabase
        .from("skills")
        .select(`
            id,
            category_id,
            display_order
        `)
        .eq(
            "id",
            skillId
        )
        .maybeSingle();


    if (
        currentError ||
        !currentSkill
    ) {

        redirect(
            "/admin/content?skillsError=skill-not-found#skills"
        );
    }


    let neighbourQuery =
        supabase
            .from("skills")
            .select(`
                id,
                display_order
            `)
            .eq(
                "category_id",
                currentSkill.category_id
            );


    if (
        direction === "up"
    ) {

        neighbourQuery =
            neighbourQuery
                .lt(
                    "display_order",
                    currentSkill.display_order
                )
                .order(
                    "display_order",
                    {
                        ascending:
                            false,
                    }
                );

    } else {

        neighbourQuery =
            neighbourQuery
                .gt(
                    "display_order",
                    currentSkill.display_order
                )
                .order(
                    "display_order",
                    {
                        ascending:
                            true,
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

        redirect(
            "/admin/content?skillsError=skill-move#skills"
        );
    }


    if (!neighbour) {

        redirect(
            "/admin/content#skills"
        );
    }


    const currentOrder =
        currentSkill.display_order;

    const neighbourOrder =
        neighbour.display_order;


    const {
        error: firstError,
    } = await supabase
        .from("skills")
        .update({
            display_order:
                neighbourOrder,
        })
        .eq(
            "id",
            currentSkill.id
        );


    if (firstError) {

        redirect(
            "/admin/content?skillsError=skill-move#skills"
        );
    }


    const {
        error: secondError,
    } = await supabase
        .from("skills")
        .update({
            display_order:
                currentOrder,
        })
        .eq(
            "id",
            neighbour.id
        );


    if (secondError) {

        // restauration

        await supabase
            .from("skills")
            .update({
                display_order:
                    currentOrder,
            })
            .eq(
                "id",
                currentSkill.id
            );


        redirect(
            "/admin/content?skillsError=skill-move#skills"
        );
    }


    revalidatePath("/");
    revalidatePath(
        "/admin/content"
    );


    redirect(
        "/admin/content?skillsUpdated=skill-moved#skills"
    );
}

export async function deleteSkill(
    skillId: string
) {

    const { supabase } =
        await requireAdmin();


    const {
        data: skill,
        error: skillError,
    } = await supabase
        .from("skills")
        .select(`
            id,
            category_id
        `)
        .eq(
            "id",
            skillId
        )
        .maybeSingle();


    if (
        skillError ||
        !skill
    ) {

        redirect(
            "/admin/content?skillsError=skill-not-found#skills"
        );
    }


    const { error } =
        await supabase
            .from("skills")
            .delete()
            .eq(
                "id",
                skillId
            );


    if (error) {

        redirect(
            "/admin/content?skillsError=skill-delete#skills"
        );
    }


    // ==================================================
    // REINDEX
    // ==================================================

    const {
        data: remainingSkills,
    } = await supabase
        .from("skills")
        .select(`
            id,
            display_order
        `)
        .eq(
            "category_id",
            skill.category_id
        )
        .order(
            "display_order",
            {
                ascending: true,
            }
        );


    if (remainingSkills) {

        for (
            let index = 0;
            index <
            remainingSkills.length;
            index++
        ) {

            const wantedOrder =
                index + 1;


            if (
                remainingSkills[index]
                    .display_order
                !== wantedOrder
            ) {

                await supabase
                    .from("skills")
                    .update({
                        display_order:
                            wantedOrder,
                    })
                    .eq(
                        "id",
                        remainingSkills[
                            index
                        ].id
                    );
            }
        }
    }


    revalidatePath("/");
    revalidatePath(
        "/admin/content"
    );


    redirect(
        "/admin/content?skillsUpdated=skill-deleted#skills"
    );
}

export async function createExperience(
    formData: FormData
) {
    const { supabase } =
        await requireAdmin();

    const title =
        getString(
            formData,
            "experienceTitle"
        );

    const type =
        getString(
            formData,
            "experienceType"
        );

    const organization =
        getString(
            formData,
            "experienceOrganization"
        );

    const dateLabel =
        getString(
            formData,
            "experienceDateLabel"
        );

    const description =
        getString(
            formData,
            "experienceDescription"
        );

    const highlightsRaw =
        getString(
            formData,
            "experienceHighlights"
        );

    const featured =
        formData.get(
            "experienceFeatured"
        ) === "on";

    const published =
        formData.get(
            "experiencePublished"
        ) === "on";


    if (
        !title ||
        !type ||
        !description
    ) {
        redirect(
            "/admin/content?experienceError=missing#experiences"
        );
    }


    const highlights =
        highlightsRaw
            .split(/\r?\n/g)
            .map(
                (item) =>
                    item.trim()
            )
            .filter(Boolean);


    let slug =
        slugify(title);


    if (!slug) {
        slug =
            `experience-${Date.now()}`;
    }


    const {
        data: duplicate,
    } = await supabase
        .from("experiences")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();


    if (duplicate) {
        slug =
            `${slug}-${Date.now()}`;
    }


    const {
        data: lastExperience,
    } = await supabase
        .from("experiences")
        .select("display_order")
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
            lastExperience
                ?.display_order ?? 0
        ) + 1;


    const { error } =
        await supabase
            .from("experiences")
            .insert({
                slug,
                type,
                title,

                organization:
                    organization || null,

                date_label:
                    dateLabel || null,

                description,

                highlights,

                featured,
                published,

                display_order:
                    displayOrder,

                updated_at:
                    new Date()
                        .toISOString(),
            });


    if (error) {
        console.error(
            "Create experience error:",
            error
        );

        redirect(
            "/admin/content?experienceError=create#experiences"
        );
    }


    revalidatePath("/");
    revalidatePath(
        "/admin/content"
    );

    redirect(
        "/admin/content?experienceUpdated=created#experiences"
    );
}

export async function updateExperience(
    experienceId: string,
    formData: FormData
) {
    const { supabase } =
        await requireAdmin();

    const title =
        getString(
            formData,
            "experienceTitle"
        );

    const type =
        getString(
            formData,
            "experienceType"
        );

    const organization =
        getString(
            formData,
            "experienceOrganization"
        );

    const dateLabel =
        getString(
            formData,
            "experienceDateLabel"
        );

    const description =
        getString(
            formData,
            "experienceDescription"
        );

    const highlightsRaw =
        getString(
            formData,
            "experienceHighlights"
        );


    if (
        !title ||
        !type ||
        !description
    ) {
        redirect(
            "/admin/content?experienceError=missing#experiences"
        );
    }


    const highlights =
        highlightsRaw
            .split(/\r?\n/g)
            .map(
                (item) =>
                    item.trim()
            )
            .filter(Boolean);


    const { error } =
        await supabase
            .from("experiences")
            .update({
                type,
                title,

                organization:
                    organization || null,

                date_label:
                    dateLabel || null,

                description,

                highlights,

                updated_at:
                    new Date()
                        .toISOString(),
            })
            .eq(
                "id",
                experienceId
            );


    if (error) {
        console.error(
            "Update experience error:",
            error
        );

        redirect(
            "/admin/content?experienceError=update#experiences"
        );
    }


    revalidatePath("/");
    revalidatePath(
        "/admin/content"
    );

    redirect(
        "/admin/content?experienceUpdated=updated#experiences"
    );
}

export async function toggleExperiencePublished(
    experienceId: string
) {
    const { supabase } =
        await requireAdmin();

    const {
        data: experience,
        error: readError,
    } = await supabase
        .from("experiences")
        .select(`
            id,
            published
        `)
        .eq(
            "id",
            experienceId
        )
        .maybeSingle();


    if (
        readError ||
        !experience
    ) {
        redirect(
            "/admin/content?experienceError=not-found#experiences"
        );
    }


    const { error } =
        await supabase
            .from("experiences")
            .update({
                published:
                    !experience.published,

                updated_at:
                    new Date()
                        .toISOString(),
            })
            .eq(
                "id",
                experienceId
            );


    if (error) {
        redirect(
            "/admin/content?experienceError=visibility#experiences"
        );
    }


    revalidatePath("/");
    revalidatePath(
        "/admin/content"
    );

    redirect(
        `/admin/content?experienceUpdated=${
            experience.published
                ? "hidden"
                : "published"
        }#experiences`
    );
}

export async function toggleExperienceFeatured(
    experienceId: string
) {
    const { supabase } =
        await requireAdmin();

    const {
        data: experience,
        error: readError,
    } = await supabase
        .from("experiences")
        .select(`
            id,
            featured
        `)
        .eq(
            "id",
            experienceId
        )
        .maybeSingle();


    if (
        readError ||
        !experience
    ) {
        redirect(
            "/admin/content?experienceError=not-found#experiences"
        );
    }


    const { error } =
        await supabase
            .from("experiences")
            .update({
                featured:
                    !experience.featured,

                updated_at:
                    new Date()
                        .toISOString(),
            })
            .eq(
                "id",
                experienceId
            );


    if (error) {
        redirect(
            "/admin/content?experienceError=featured#experiences"
        );
    }


    revalidatePath("/");
    revalidatePath(
        "/admin/content"
    );

    redirect(
        `/admin/content?experienceUpdated=${
            experience.featured
                ? "unfeatured"
                : "featured"
        }#experiences`
    );
}

export async function moveExperience(
    experienceId: string,
    direction: "up" | "down"
) {
    const { supabase } =
        await requireAdmin();


    const {
        data: current,
        error: currentError,
    } = await supabase
        .from("experiences")
        .select(`
            id,
            display_order
        `)
        .eq(
            "id",
            experienceId
        )
        .maybeSingle();


    if (
        currentError ||
        !current
    ) {
        redirect(
            "/admin/content?experienceError=not-found#experiences"
        );
    }


    let neighbourQuery =
        supabase
            .from("experiences")
            .select(`
                id,
                display_order
            `);


    if (direction === "up") {
        neighbourQuery =
            neighbourQuery
                .lt(
                    "display_order",
                    current.display_order
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
                    current.display_order
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
        redirect(
            "/admin/content?experienceError=move#experiences"
        );
    }


    if (!neighbour) {
        redirect(
            "/admin/content#experiences"
        );
    }


    const currentOrder =
        current.display_order;

    const neighbourOrder =
        neighbour.display_order;


    const {
        error: firstError,
    } = await supabase
        .from("experiences")
        .update({
            display_order:
                neighbourOrder,
        })
        .eq(
            "id",
            current.id
        );


    if (firstError) {
        redirect(
            "/admin/content?experienceError=move#experiences"
        );
    }


    const {
        error: secondError,
    } = await supabase
        .from("experiences")
        .update({
            display_order:
                currentOrder,
        })
        .eq(
            "id",
            neighbour.id
        );


    if (secondError) {
        await supabase
            .from("experiences")
            .update({
                display_order:
                    currentOrder,
            })
            .eq(
                "id",
                current.id
            );

        redirect(
            "/admin/content?experienceError=move#experiences"
        );
    }


    revalidatePath("/");
    revalidatePath(
        "/admin/content"
    );

    redirect(
        "/admin/content?experienceUpdated=moved#experiences"
    );
}

export async function deleteExperience(
    experienceId: string
) {
    const { supabase } =
        await requireAdmin();


    const {
        data: experience,
        error: readError,
    } = await supabase
        .from("experiences")
        .select(`
            id,
            display_order
        `)
        .eq(
            "id",
            experienceId
        )
        .maybeSingle();


    if (
        readError ||
        !experience
    ) {
        redirect(
            "/admin/content?experienceError=not-found#experiences"
        );
    }


    const { error } =
        await supabase
            .from("experiences")
            .delete()
            .eq(
                "id",
                experienceId
            );


    if (error) {
        redirect(
            "/admin/content?experienceError=delete#experiences"
        );
    }


    // Réindexer après suppression
    const {
        data: remaining,
    } = await supabase
        .from("experiences")
        .select(`
            id,
            display_order
        `)
        .order(
            "display_order",
            {
                ascending: true,
            }
        );


    if (remaining) {
        for (
            let index = 0;
            index < remaining.length;
            index++
        ) {
            const wantedOrder =
                index + 1;

            if (
                remaining[index]
                    .display_order
                !== wantedOrder
            ) {
                await supabase
                    .from("experiences")
                    .update({
                        display_order:
                            wantedOrder,
                    })
                    .eq(
                        "id",
                        remaining[index].id
                    );
            }
        }
    }


    revalidatePath("/");
    revalidatePath(
        "/admin/content"
    );

    redirect(
        "/admin/content?experienceUpdated=deleted#experiences"
    );
}

export async function updateContactSettings(
    formData: FormData
) {

    const { supabase } =
        await requireAdmin();


    const eyebrow =
        getString(
            formData,
            "contactEyebrow"
        );

    const title =
        getString(
            formData,
            "contactTitle"
        );

    const intro =
        getString(
            formData,
            "contactIntro"
        );


    const cvUrl =
        getString(
            formData,
            "contactCvUrl"
        );

    const cvTitle =
        getString(
            formData,
            "contactCvTitle"
        );

    const cvDescription =
        getString(
            formData,
            "contactCvDescription"
        );


    const githubUrl =
        getString(
            formData,
            "contactGithubUrl"
        );

    const githubTitle =
        getString(
            formData,
            "contactGithubTitle"
        );

    const githubDescription =
        getString(
            formData,
            "contactGithubDescription"
        );


    const linkedinUrl =
        getString(
            formData,
            "contactLinkedinUrl"
        );

    const linkedinTitle =
        getString(
            formData,
            "contactLinkedinTitle"
        );

    const linkedinDescription =
        getString(
            formData,
            "contactLinkedinDescription"
        );


    const ctaTitle =
        getString(
            formData,
            "contactCtaTitle"
        );

    const ctaText =
        getString(
            formData,
            "contactCtaText"
        );

    const email =
        getString(
            formData,
            "contactEmail"
        );

    const ctaButtonLabel =
        getString(
            formData,
            "contactCtaButtonLabel"
        );


    // ==================================================
    // VALIDATION
    // ==================================================

    if (
        !eyebrow ||
        !title ||
        !intro ||
        !cvUrl ||
        !cvTitle ||
        !cvDescription ||
        !githubUrl ||
        !githubTitle ||
        !githubDescription ||
        !linkedinUrl ||
        !linkedinTitle ||
        !linkedinDescription ||
        !ctaTitle ||
        !ctaText ||
        !email ||
        !ctaButtonLabel
    ) {

        redirect(
            "/admin/content?contactError=missing#contact-settings"
        );
    }


    if (
        !email.includes("@")
    ) {

        redirect(
            "/admin/content?contactError=email#contact-settings"
        );
    }


    const value = {

        eyebrow,
        title,
        intro,

        cvUrl,
        cvTitle,
        cvDescription,

        githubUrl,
        githubTitle,
        githubDescription,

        linkedinUrl,
        linkedinTitle,
        linkedinDescription,

        ctaTitle,
        ctaText,
        email,
        ctaButtonLabel,
    };


    // ==================================================
    // FIND EXISTING SETTING
    // ==================================================

    const {
        data: existing,
        error: readError,
    } = await supabase
        .from("site_settings")
        .select("id")
        .eq(
            "setting_key",
            "contact"
        )
        .limit(1)
        .maybeSingle();


    if (readError) {

        console.error(
            "Read contact settings error:",
            readError
        );

        redirect(
            "/admin/content?contactError=save#contact-settings"
        );
    }


    // ==================================================
    // UPDATE OR INSERT
    // ==================================================

    if (existing) {

        const { error } =
            await supabase
                .from("site_settings")
                .update({
                    value,
                    updated_at:
                        new Date()
                            .toISOString(),
                })
                .eq(
                    "id",
                    existing.id
                );


        if (error) {

            console.error(
                "Update contact settings error:",
                error
            );

            redirect(
                "/admin/content?contactError=save#contact-settings"
            );
        }

    } else {

        const { error } =
            await supabase
                .from("site_settings")
                .insert({
                    setting_key:
                        "contact",

                    value,
                });


        if (error) {

            console.error(
                "Insert contact settings error:",
                error
            );

            redirect(
                "/admin/content?contactError=save#contact-settings"
            );
        }
    }


    revalidatePath("/");
    revalidatePath(
        "/admin/content"
    );


    redirect(
        "/admin/content?contactUpdated=true#contact-settings"
    );
}

export async function updateGlobalSettings(
    formData: FormData
) {

    const { supabase } =
        await requireAdmin();


    const brand =
        getString(
            formData,
            "globalBrand"
        );

    const tagline =
        getString(
            formData,
            "globalTagline"
        );

    const footerCopyright =
        getString(
            formData,
            "globalFooterCopyright"
        );


    // ==================================================
    // VALIDATION
    // ==================================================

    if (
        !brand ||
        !tagline ||
        !footerCopyright
    ) {

        redirect(
            "/admin/content?globalError=missing#global-settings"
        );
    }


    // ==================================================
    // FIND EXISTING SETTING
    // ==================================================

    const {
        data: existing,
        error: readError,
    } = await supabase
        .from("site_settings")
        .select("id")
        .eq(
            "setting_key",
            "global"
        )
        .limit(1)
        .maybeSingle();


    if (readError) {

        console.error(
            "Read global settings error:",
            readError
        );

        redirect(
            "/admin/content?globalError=save#global-settings"
        );
    }


    const value = {

        brand,
        tagline,
        footerCopyright,
    };


    // ==================================================
    // UPDATE OR INSERT
    // ==================================================

    if (existing) {

        const { error } =
            await supabase
                .from("site_settings")
                .update({
                    value,

                    updated_at:
                        new Date()
                            .toISOString(),
                })
                .eq(
                    "id",
                    existing.id
                );


        if (error) {

            console.error(
                "Update global settings error:",
                error
            );

            redirect(
                "/admin/content?globalError=save#global-settings"
            );
        }

    } else {

        const { error } =
            await supabase
                .from("site_settings")
                .insert({
                    setting_key:
                        "global",

                    value,
                });


        if (error) {

            console.error(
                "Insert global settings error:",
                error
            );

            redirect(
                "/admin/content?globalError=save#global-settings"
            );
        }
    }


    revalidatePath("/");
    revalidatePath(
        "/admin/content"
    );


    redirect(
        "/admin/content?globalUpdated=true#global-settings"
    );
}