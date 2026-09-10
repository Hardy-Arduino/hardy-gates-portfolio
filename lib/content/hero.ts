import {
    createClient,
} from "@/lib/supabase/server";


export type HeroContent = {

    eyebrow: string;

    titleLine1: string;
    titleAccent: string;

    sectionLabel: string;

    masteryLine1: string;
    masteryAccent: string;

    description: string;

    badges: string[];

    profileBadge: string;

    primaryButtonLabel: string;
    secondaryButtonLabel: string;
};


export const DEFAULT_HERO_CONTENT:
    HeroContent = {

    eyebrow:
        "PORTEFEUILLE • INGÉNIERIE • TECHNOLOGIE",

    titleLine1:
        "Ingénieur",

    titleAccent:
        "Électronique",

    sectionLabel:
        "COMPÉTENCES",

    masteryLine1:
        "Ce que je",

    masteryAccent:
        "maîtrise.",

    description:
        "Je conçois et développe des systèmes électroniques intelligents, des systèmes embarqués et des solutions IoT orientées vers des applications concrètes.",

    badges: [
        "Systèmes embarqués",
        "IoT",
        "Automatisation",
        "Électronique de puissance",
    ],

    profileBadge:
        "Électronique • Systèmes embarqués • Internet des objets",

    primaryButtonLabel:
        "Voir mes projets",

    secondaryButtonLabel:
        "Télécharger mon CV",
};


export async function getHeroContent():
    Promise<HeroContent> {

    const supabase =
        await createClient();


    const {
        data,
        error,
    } = await supabase
        .from("site_content")
        .select("content")
        .eq(
            "section",
            "hero"
        )
        .eq(
            "content_key",
            "main"
        )
        .maybeSingle();


    if (
        error ||
        !data?.content
    ) {

        if (error) {
            console.error(
                "Hero content error:",
                error
            );
        }

        return DEFAULT_HERO_CONTENT;
    }


    const stored =
        data.content as Partial<HeroContent>;


    const badges =
        Array.isArray(
            stored.badges
        )
            ? stored.badges
                .filter(
                    (
                        badge
                    ): badge is string =>
                        typeof badge
                        === "string"
                        &&
                        badge.trim()
                            .length > 0
                )
            : DEFAULT_HERO_CONTENT
                .badges;


    return {

        ...DEFAULT_HERO_CONTENT,

        ...stored,

        badges:
            badges.length > 0
                ? badges
                : DEFAULT_HERO_CONTENT
                    .badges,
    };
}