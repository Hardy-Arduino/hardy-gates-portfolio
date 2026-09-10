import {
    createClient,
} from "@/lib/supabase/server";


/* ============================================================
   TYPES
   ============================================================ */

export type PortfolioExperience = {

    id: string;

    slug: string | null;

    type: string;

    title: string;

    organization: string | null;

    date_label: string | null;

    description: string;

    highlights: string[];

    featured: boolean;

    published: boolean;

    display_order: number;
};


/* ============================================================
   NORMALIZER
   ============================================================ */

function normalizeExperience(
    experience: any
): PortfolioExperience {

    return {

        id:
            experience.id,

        slug:
            experience.slug ?? null,

        type:
            experience.type ?? "experience",

        title:
            experience.title ?? "",

        organization:
            experience.organization ?? null,

        date_label:
            experience.date_label ?? null,

        description:
            experience.description ?? "",

        highlights:
            Array.isArray(
                experience.highlights
            )
                ? experience.highlights
                    .filter(
                        (
                            highlight: unknown
                        ): highlight is string =>
                            typeof highlight
                            === "string"
                    )
                : [],

        featured:
            Boolean(
                experience.featured
            ),

        published:
            Boolean(
                experience.published
            ),

        display_order:
            Number(
                experience.display_order ?? 0
            ),
    };
}


/* ============================================================
   PUBLIC EXPERIENCES
   ============================================================ */

export async function getPublicExperiences():
    Promise<PortfolioExperience[]> {

    const supabase =
        await createClient();


    const {
        data,
        error,
    } = await supabase
        .from("experiences")
        .select(`
            id,
            slug,
            type,
            title,
            organization,
            date_label,
            description,
            highlights,
            featured,
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
            "created_at",
            {
                ascending: false,
            }
        );


    if (error) {

        console.error(
            "Public experiences error:",
            error
        );

        return [];
    }


    return (
        data ?? []
    ).map(
        normalizeExperience
    );
}


/* ============================================================
   ADMIN EXPERIENCES
   ============================================================ */

export async function getAllExperiences():
    Promise<PortfolioExperience[]> {

    const supabase =
        await createClient();


    const {
        data,
        error,
    } = await supabase
        .from("experiences")
        .select(`
            id,
            slug,
            type,
            title,
            organization,
            date_label,
            description,
            highlights,
            featured,
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
            "created_at",
            {
                ascending: false,
            }
        );


    if (error) {

        console.error(
            "Admin experiences error:",
            error
        );

        return [];
    }


    return (
        data ?? []
    ).map(
        normalizeExperience
    );
}