import {
    createClient,
} from "@/lib/supabase/server";


/* ============================================================
   TYPES
   ============================================================ */

export type SkillCategory = {
    id: string;
    name: string;
    slug: string;
    display_order: number;
};


export type Skill = {
    id: string;
    category_id: string;
    name: string;

    level: string | null;
    percentage: number | null;

    published: boolean;
    display_order: number;
};


export type SkillCategoryWithSkills =
    SkillCategory & {
        skills: Skill[];
    };


/* ============================================================
   PUBLIC SKILLS
   ============================================================ */

export async function getPublicSkills():
    Promise<SkillCategoryWithSkills[]> {

    const supabase =
        await createClient();


    // ==================================================
    // CATEGORIES
    // ==================================================

    const {
        data: categories,
        error: categoriesError,
    } = await supabase
        .from("skill_categories")
        .select(`
            id,
            name,
            slug,
            display_order
        `)
        .order(
            "display_order",
            {
                ascending: true,
            }
        )
        .order(
            "name",
            {
                ascending: true,
            }
        );


    if (categoriesError) {

        console.error(
            "Skill categories error:",
            categoriesError
        );

        return [];
    }


    // ==================================================
    // PUBLISHED SKILLS
    // ==================================================

    const {
        data: skills,
        error: skillsError,
    } = await supabase
        .from("skills")
        .select(`
            id,
            category_id,
            name,
            level,
            percentage,
            published,
            display_order
        `)
        .eq(
            "published",
            true
        )
        .order(
            "display_order",
            {
                ascending: true,
            }
        )
        .order(
            "name",
            {
                ascending: true,
            }
        );


    if (skillsError) {

        console.error(
            "Skills error:",
            skillsError
        );

        return [];
    }


    // ==================================================
    // GROUP BY CATEGORY
    // ==================================================

    const safeCategories =
        categories ?? [];

    const safeSkills =
        skills ?? [];


    return safeCategories
        .map(
            (
                category
            ): SkillCategoryWithSkills => ({

                ...category,

                skills:
                    safeSkills.filter(
                        (skill) =>
                            skill.category_id
                            === category.id
                    ),

            })
        )
        .filter(
            (category) =>
                category.skills.length > 0
        );
}

export async function getAllSkills():
    Promise<SkillCategoryWithSkills[]> {

    const supabase =
        await createClient();


    const {
        data: categories,
        error: categoriesError,
    } = await supabase
        .from("skill_categories")
        .select(`
            id,
            name,
            slug,
            display_order
        `)
        .order(
            "display_order",
            {
                ascending: true,
            }
        )
        .order(
            "name",
            {
                ascending: true,
            }
        );


    if (categoriesError) {

        console.error(
            "Admin skill categories error:",
            categoriesError
        );

        return [];
    }


    const {
        data: skills,
        error: skillsError,
    } = await supabase
        .from("skills")
        .select(`
            id,
            category_id,
            name,
            level,
            percentage,
            published,
            display_order
        `)
        .order(
            "display_order",
            {
                ascending: true,
            }
        )
        .order(
            "name",
            {
                ascending: true,
            }
        );


    if (skillsError) {

        console.error(
            "Admin skills error:",
            skillsError
        );

        return [];
    }


    const safeCategories =
        categories ?? [];

    const safeSkills =
        skills ?? [];


    return safeCategories.map(
        (
            category
        ): SkillCategoryWithSkills => ({

            ...category,

            skills:
                safeSkills.filter(
                    (skill) =>
                        skill.category_id
                        === category.id
                ),

        })
    );
}