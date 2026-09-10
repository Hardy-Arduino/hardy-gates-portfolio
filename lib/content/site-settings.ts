import {
    createClient,
} from "@/lib/supabase/server";


/* ============================================================
   TYPES
   ============================================================ */

export type ContactSettings = {

    eyebrow: string;

    title: string;

    intro: string;


    cvUrl: string;

    cvTitle: string;

    cvDescription: string;


    githubUrl: string;

    githubTitle: string;

    githubDescription: string;


    linkedinUrl: string;

    linkedinTitle: string;

    linkedinDescription: string;


    ctaTitle: string;

    ctaText: string;

    email: string;

    ctaButtonLabel: string;
};


export type GlobalSettings = {

    brand: string;

    tagline: string;

    footerCopyright: string;
};


/* ============================================================
   DEFAULT VALUES
   ============================================================ */

export const DEFAULT_CONTACT_SETTINGS:
    ContactSettings = {

    eyebrow:
        "Contact & ressources",

    title:
        "Connectons-nous.",

    intro:
        "Retrouvez mon parcours, mes projets et mes réalisations à travers mon CV et mes profils professionnels.",


    cvUrl:
        "/documents/CV-Hardy-Gates.pdf",

    cvTitle:
        "Mon CV",

    cvDescription:
        "Télécharger mon CV au format PDF.",


    githubUrl:
        "https://github.com/Hardy-Arduino",

    githubTitle:
        "GitHub",

    githubDescription:
        "Retrouvez mes projets, mon code et mes expérimentations.",


    linkedinUrl:
        "https://www.linkedin.com/in/hardy-gates-moutsinga-nziengui-71b292352",

    linkedinTitle:
        "LinkedIn",

    linkedinDescription:
        "Mon parcours académique et professionnel.",


    ctaTitle:
        "Vous souhaitez échanger autour d'un projet ?",

    ctaText:
        "N'hésitez pas à me contacter pour discuter de technologie, électronique ou collaboration.",

    email:
        "arduinogates.ma@gmail.com",

    ctaButtonLabel:
        "Me contacter",
};


export const DEFAULT_GLOBAL_SETTINGS:
    GlobalSettings = {

    brand:
        "HG",

    tagline:
        "Electronics • Embedded Systems • IoT • Automation",

    footerCopyright:
        "© 2026 — Portfolio personnel",
};


/* ============================================================
   NORMALIZER
   ============================================================ */

function mergeStringSettings<
    T extends Record<
        string,
        string
    >
>(
    defaults: T,
    value: unknown
): T {

    if (
        !value ||
        typeof value !== "object" ||
        Array.isArray(value)
    ) {

        return defaults;
    }


    const source =
        value as Record<
            string,
            unknown
        >;


    const result = {
        ...defaults,
    };


    for (
        const key of
        Object.keys(defaults)
    ) {

        const candidate =
            source[key];


        if (
            typeof candidate ===
            "string"
        ) {

            result[
                key as keyof T
            ] =
                candidate as T[keyof T];
        }
    }


    return result;
}


/* ============================================================
   CONTACT SETTINGS
   ============================================================ */

export async function getContactSettings():
    Promise<ContactSettings> {

    const supabase =
        await createClient();


    const {
        data,
        error,
    } = await supabase
        .from("site_settings")
        .select("value")
        .eq(
            "setting_key",
            "contact"
        )
        .limit(1)
        .maybeSingle();


    if (error) {

        console.error(
            "Contact settings error:",
            error
        );

        return (
            DEFAULT_CONTACT_SETTINGS
        );
    }


    return mergeStringSettings(
        DEFAULT_CONTACT_SETTINGS,
        data?.value
    );
}


/* ============================================================
   GLOBAL SETTINGS
   ============================================================ */

export async function getGlobalSettings():
    Promise<GlobalSettings> {

    const supabase =
        await createClient();


    const {
        data,
        error,
    } = await supabase
        .from("site_settings")
        .select("value")
        .eq(
            "setting_key",
            "global"
        )
        .limit(1)
        .maybeSingle();


    if (error) {

        console.error(
            "Global settings error:",
            error
        );

        return (
            DEFAULT_GLOBAL_SETTINGS
        );
    }


    return mergeStringSettings(
        DEFAULT_GLOBAL_SETTINGS,
        data?.value
    );
}