import {
    createClient,
} from "@/lib/supabase/server";


export type AboutContent = {

    eyebrow: string;

    titleLine1: string;
    titleLine2: string;
    titleAccent: string;

    description: string;

    secondaryDescription: string;
    thirdDescription: string;
};


export const DEFAULT_ABOUT_CONTENT:
    AboutContent = {

    eyebrow:
        "À PROPOS DE MOI",

    titleLine1:
        "Construire.",

    titleLine2:
        "Comprendre.",

    titleAccent:
        "Innover.",

    description:
        "Je développe mes compétences autour de l'électronique, des systèmes embarqués, de l'IoT et de l'automatisation à travers des projets concrets.",

    secondaryDescription:
        "Mon objectif est de concevoir des solutions technologiques utiles, fiables et capables de répondre à des problématiques réelles.",
    thirdDescription:
    "À travers mes projets, je cherche à développer une approche d'ingénieur basée sur la conception, l'expérimentation, la résolution de problèmes et l'amélioration continue.",
};


export async function getAboutContent():
    Promise<AboutContent> {

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
            "about"
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
                "About content error:",
                error
            );

        }


        return DEFAULT_ABOUT_CONTENT;
    }


const stored =
    data.content as Partial<AboutContent>;


    return {

        ...DEFAULT_ABOUT_CONTENT,

        ...stored,

    };
}