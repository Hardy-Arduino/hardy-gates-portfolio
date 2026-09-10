import {
    getHeroContent,
} from "@/lib/content/hero";

import {
    getAboutContent,
} from "@/lib/content/about";

import {
    getAllSkills,
} from "@/lib/content/skills";

import {
    getAllExperiences,
} from "@/lib/content/experiences";

import {
    getContactSettings,
    getGlobalSettings,
} from "@/lib/content/site-settings";

import {
    updateHeroContent,
    updateAboutContent,

    createSkillCategory,
    updateSkillCategory,
    moveSkillCategory,
    deleteSkillCategory,

    createSkill,
    updateSkill,
    toggleSkillPublished,
    moveSkill,
    deleteSkill,

    createExperience,
    updateExperience,
    toggleExperiencePublished,
    toggleExperienceFeatured,
    moveExperience,
    deleteExperience,

    updateContactSettings,
    updateGlobalSettings,
} from "./actions";



type ContentPageProps = {

    searchParams:
    Promise<{
        heroUpdated?: string;
        heroError?: string;

        aboutUpdated?: string;
        aboutError?: string;

        skillsUpdated?: string;
        skillsError?: string;

        experienceUpdated?: string;
        experienceError?: string;
        contactUpdated?: string;
        contactError?: string;

        globalUpdated?: string;
        globalError?: string;
    }>;
};


export default async function AdminContentPage({
    searchParams,
}: ContentPageProps) {

    const [
        hero,
        about,
        skillCategories,
        experiences,
        contactSettings,
        globalSettings,
    ] = await Promise.all([
        getHeroContent(),
        getAboutContent(),
        getAllSkills(),
        getAllExperiences(),
        getContactSettings(),
        getGlobalSettings(),
    ]);

    const {
        heroUpdated,
        heroError,
        aboutUpdated,
        aboutError,
        skillsUpdated,
        skillsError,
        experienceUpdated,
        experienceError,
        contactUpdated,
        contactError,
        globalUpdated,
        globalError,
    } = await searchParams;


    const messages:
        Record<string, string> = {

        missing:
            "Veuillez remplir tous les champs obligatoires.",

        badges:
            "Ajoutez au moins une compétence dans les badges.",

        database:
            "Impossible d'enregistrer les modifications.",
    };


    const errorMessage =
        heroError
            ? messages[
            heroError
            ]
            : null;

    const aboutMessages:
        Record<string, string> = {

        missing:
            "Veuillez remplir les champs obligatoires de la section À propos.",

        database:
            "Impossible d'enregistrer la section À propos.",
    };

    const experienceErrorMessages:
        Record<string, string> = {

        missing:
            "Le titre, le type et la description sont obligatoires.",

        create:
            "Impossible de créer l'expérience.",

        update:
            "Impossible de modifier l'expérience.",

        "not-found":
            "Expérience introuvable.",

        visibility:
            "Impossible de modifier la visibilité.",

        featured:
            "Impossible de modifier la mise en avant.",

        move:
            "Impossible de modifier l'ordre des expériences.",

        delete:
            "Impossible de supprimer l'expérience.",
    };


    const experienceSuccessMessages:
        Record<string, string> = {

        created:
            "Expérience créée avec succès.",

        updated:
            "Expérience modifiée avec succès.",

        published:
            "Expérience publiée.",

        hidden:
            "Expérience masquée.",

        featured:
            "Expérience mise en avant.",

        unfeatured:
            "Mise en avant retirée.",

        moved:
            "Ordre des expériences mis à jour.",

        deleted:
            "Expérience supprimée.",
    };


    const experienceErrorMessage =
        experienceError
            ? experienceErrorMessages[
            experienceError
            ]
            : null;


    const experienceSuccessMessage =
        experienceUpdated
            ? experienceSuccessMessages[
            experienceUpdated
            ]
            : null;
    const contactErrorMessages:
        Record<string, string> = {

        missing:
            "Tous les champs de la section Contact sont obligatoires.",

        email:
            "L'adresse e-mail semble invalide.",

        save:
            "Impossible d'enregistrer les paramètres de contact.",
    };


    const contactSuccessMessage =
        contactUpdated
            ? "Section Contact enregistrée avec succès."
            : null;


    const contactErrorMessage =
        contactError
            ? contactErrorMessages[
            contactError
            ]
            : null;

    const globalErrorMessages:
        Record<string, string> = {

        missing:
            "Tous les paramètres globaux sont obligatoires.",

        save:
            "Impossible d'enregistrer les paramètres globaux.",
    };


    const globalSuccessMessage =
        globalUpdated
            ? "Paramètres globaux enregistrés avec succès."
            : null;


    const globalErrorMessage =
        globalError
            ? globalErrorMessages[
            globalError
            ]
            : null;

    const skillsMessages:
        Record<string, string> = {

        "category-name":
            "Le nom de la catégorie est obligatoire.",

        "category-create":
            "Impossible de créer la catégorie.",

        "category-update":
            "Impossible de modifier la catégorie.",

        "category-duplicate":
            "Une autre catégorie utilise déjà ce nom.",

        "category-not-found":
            "Catégorie introuvable.",

        "category-move":
            "Impossible de modifier l'ordre des catégories.",

        "category-not-empty":
            "Cette catégorie contient encore des compétences. Supprimez ou déplacez-les avant de supprimer la catégorie.",

        "category-delete":
            "Impossible de supprimer la catégorie.",
        "skill-missing":
            "Le nom et la catégorie de la compétence sont obligatoires.",

        "skill-percentage":
            "Le pourcentage doit être compris entre 0 et 100.",

        "skill-category":
            "La catégorie sélectionnée est introuvable.",

        "skill-create":
            "Impossible de créer la compétence.",

        "skill-update":
            "Impossible de modifier la compétence.",

        "skill-not-found":
            "Compétence introuvable.",

        "skill-publish":
            "Impossible de modifier la visibilité de la compétence.",

        "skill-move":
            "Impossible de modifier l'ordre de la compétence.",

        "skill-delete":
            "Impossible de supprimer la compétence.",
    };


    const skillsSuccessMessages:
        Record<string, string> = {

        "category-created":
            "Catégorie créée avec succès.",

        "category-updated":
            "Catégorie modifiée avec succès.",

        "category-moved":
            "Ordre des catégories mis à jour.",

        "category-deleted":
            "Catégorie supprimée.",
        "skill-created":
            "Compétence créée avec succès.",

        "skill-updated":
            "Compétence modifiée avec succès.",

        "skill-published":
            "Compétence publiée.",

        "skill-hidden":
            "Compétence masquée.",

        "skill-moved":
            "Ordre des compétences mis à jour.",

        "skill-deleted":
            "Compétence supprimée.",
    };


    const skillsErrorMessage =
        skillsError
            ? skillsMessages[
            skillsError
            ]
            : null;


    const skillsSuccessMessage =
        skillsUpdated
            ? skillsSuccessMessages[
            skillsUpdated
            ]
            : null;

    const aboutErrorMessage =
        aboutError
            ? aboutMessages[
            aboutError
            ]
            : null;

    return (
        <main>

            {/* ==================================================
                HEADER
               ================================================== */}

            <div className="border-b border-white/10 pb-8">

                <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
                    Portfolio CMS
                </p>

                <h1 className="mt-3 text-4xl font-bold md:text-5xl">
                    Contenu
                </h1>

                <p className="mt-4 max-w-2xl text-gray-500">
                    Modifiez les textes et informations
                    générales visibles sur votre portfolio.
                </p>

            </div>


            {/* ==================================================
                HERO
               ================================================== */}

            <section className="mt-10 max-w-4xl">

                <div>

                    <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
                        Page d&apos;accueil
                    </p>

                    <h2 className="mt-3 text-3xl font-bold">
                        Hero
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                        Gérez les principaux textes affichés
                        dès l&apos;arrivée sur votre portfolio.
                    </p>

                </div>


                {/* SUCCESS */}

                {heroUpdated && (

                    <div className="mt-7 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-300">

                        Hero mis à jour avec succès.

                    </div>

                )}


                {/* ERROR */}

                {errorMessage && (

                    <div className="mt-7 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">

                        {errorMessage}

                    </div>

                )}


                <form
                    action={
                        updateHeroContent
                    }
                    className="mt-8 space-y-8"
                >

                    {/* INTRO */}

                    <FormSection
                        title="Identité"
                        description="La première information visible sur la page."
                    >

                        <Field
                            label="Petit titre supérieur"
                            name="eyebrow"
                            defaultValue={
                                hero.eyebrow
                            }
                            required
                        />


                        <div className="grid gap-5 md:grid-cols-2">

                            <Field
                                label="Titre principal"
                                name="titleLine1"
                                defaultValue={
                                    hero.titleLine1
                                }
                                required
                            />


                            <Field
                                label="Titre accentué"
                                name="titleAccent"
                                defaultValue={
                                    hero.titleAccent
                                }
                                required
                            />

                        </div>

                    </FormSection>


                    {/* MASTERY */}

                    <FormSection
                        title="Présentation"
                        description="Le bloc présentant votre expertise."
                    >

                        <Field
                            label="Petit label"
                            name="sectionLabel"
                            defaultValue={
                                hero.sectionLabel
                            }
                            required
                        />


                        <div className="grid gap-5 md:grid-cols-2">

                            <Field
                                label="Phrase"
                                name="masteryLine1"
                                defaultValue={
                                    hero.masteryLine1
                                }
                                required
                            />


                            <Field
                                label="Texte accentué"
                                name="masteryAccent"
                                defaultValue={
                                    hero.masteryAccent
                                }
                                required
                            />

                        </div>


                        <TextArea
                            label="Description"
                            name="description"
                            rows={5}
                            defaultValue={
                                hero.description
                            }
                            required
                        />

                    </FormSection>


                    {/* BADGES */}

                    <FormSection
                        title="Compétences affichées"
                        description="Ces badges apparaissent sous votre description."
                    >

                        <TextArea
                            label="Badges"
                            name="badges"
                            rows={6}
                            defaultValue={
                                hero.badges
                                    .join(
                                        "\n"
                                    )
                            }
                            required
                        />


                        <p className="-mt-2 text-xs text-gray-600">
                            Une compétence par ligne.
                            Maximum 8 badges.
                        </p>

                    </FormSection>


                    {/* PROFILE BADGE */}

                    <FormSection
                        title="Photo de profil"
                        description="Le texte affiché sous votre photo."
                    >

                        <Field
                            label="Badge sous la photo"
                            name="profileBadge"
                            defaultValue={
                                hero.profileBadge
                            }
                        />

                    </FormSection>


                    {/* BUTTONS */}

                    <FormSection
                        title="Boutons"
                        description="Les textes des deux actions principales."
                    >

                        <div className="grid gap-5 md:grid-cols-2">

                            <Field
                                label="Bouton projets"
                                name="primaryButtonLabel"
                                defaultValue={
                                    hero.primaryButtonLabel
                                }
                                required
                            />


                            <Field
                                label="Bouton CV"
                                name="secondaryButtonLabel"
                                defaultValue={
                                    hero.secondaryButtonLabel
                                }
                                required
                            />

                        </div>

                    </FormSection>


                    {/* SAVE */}

                    <div className="flex justify-end border-t border-white/10 pt-8">

                        <button
                            type="submit"
                            className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
                        >
                            Enregistrer le Hero
                        </button>

                    </div>

                </form>
                {/* ============================================================
    ABOUT
   ============================================================ */}

                <section
                    id="about"
                    className="mt-20 max-w-4xl border-t border-white/10 pt-14"
                >

                    <div>

                        <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
                            Page d&apos;accueil
                        </p>

                        <h2 className="mt-3 text-3xl font-bold">
                            À propos de moi
                        </h2>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
                            Modifiez les principaux textes de présentation
                            de votre section À propos.
                        </p>

                    </div>


                    {/* SUCCESS */}

                    {aboutUpdated && (

                        <div className="mt-7 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-300">

                            Section À propos mise à jour avec succès.

                        </div>

                    )}


                    {/* ERROR */}

                    {aboutErrorMessage && (

                        <div className="mt-7 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">

                            {aboutErrorMessage}

                        </div>

                    )}


                    <form
                        action={
                            updateAboutContent
                        }
                        className="mt-8 space-y-8"
                    >

                        {/* TITLES */}

                        <FormSection
                            title="Titres"
                            description="Les grands textes d'identité de la section."
                        >

                            <Field
                                label="Petit titre supérieur"
                                name="aboutEyebrow"
                                defaultValue={
                                    about.eyebrow
                                }
                                required
                            />


                            <div className="grid gap-5 md:grid-cols-3">

                                <Field
                                    label="Ligne 1"
                                    name="aboutTitleLine1"
                                    defaultValue={
                                        about.titleLine1
                                    }
                                    required
                                />


                                <Field
                                    label="Ligne 2"
                                    name="aboutTitleLine2"
                                    defaultValue={
                                        about.titleLine2
                                    }
                                    required
                                />


                                <Field
                                    label="Texte accentué"
                                    name="aboutTitleAccent"
                                    defaultValue={
                                        about.titleAccent
                                    }
                                    required
                                />

                            </div>

                        </FormSection>


                        {/* CONTENT */}

                        <FormSection
                            title="Présentation"
                            description="Votre texte de présentation personnel et professionnel."
                        >

                            <TextArea
                                label="Paragraphe principal"
                                name="aboutDescription"
                                defaultValue={
                                    about.description
                                }
                                rows={6}
                                required
                            />


                            <TextArea
                                label="Paragraphe complémentaire"
                                name="aboutSecondaryDescription"
                                defaultValue={
                                    about.secondaryDescription
                                }
                                rows={5}
                            />

                            <TextArea
                                label="Troisième paragraphe"
                                name="aboutThirdDescription"
                                defaultValue={
                                    about.thirdDescription
                                }
                                rows={5}
                            />

                        </FormSection>


                        {/* SAVE */}

                        <div className="flex justify-end border-t border-white/10 pt-8">

                            <button
                                type="submit"
                                className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
                            >
                                Enregistrer la section À propos
                            </button>

                        </div>

                    </form>

                </section>

                {/* ============================================================
    SKILLS
   ============================================================ */}

                <section
                    id="skills"
                    className="mt-20 max-w-4xl border-t border-white/10 pt-14"
                >

                    {/* HEADER */}

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                        <div>

                            <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
                                Page d&apos;accueil
                            </p>

                            <h2 className="mt-3 text-3xl font-bold">
                                Compétences
                            </h2>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
                                Organisez les compétences affichées
                                sur votre portfolio.
                            </p>

                        </div>


                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400">

                            {skillCategories.length} catégorie
                            {skillCategories.length > 1
                                ? "s"
                                : ""
                            }

                        </span>

                    </div>


                    {/* SUCCESS */}

                    {skillsSuccessMessage && (

                        <div className="mt-7 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-300">

                            {skillsSuccessMessage}

                        </div>

                    )}


                    {/* ERROR */}

                    {skillsErrorMessage && (

                        <div className="mt-7 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">

                            {skillsErrorMessage}

                        </div>

                    )}


                    {/* ==================================================
        CREATE CATEGORY
       ================================================== */}

                    <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">

                        <h3 className="text-xl font-semibold">
                            Nouvelle catégorie
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Créez un groupe pour organiser vos compétences.
                        </p>


                        <form
                            action={
                                createSkillCategory
                            }
                            className="mt-6 flex flex-col gap-4 sm:flex-row"
                        >

                            <input
                                name="categoryName"
                                required
                                placeholder="Ex. Électronique"
                                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#050709] px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                            />


                            <button
                                type="submit"
                                className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
                            >
                                + Ajouter
                            </button>

                        </form>

                    </div>


                    {/* ==================================================
        CATEGORIES
       ================================================== */}

                    <div className="mt-8">

                        <div className="mb-5 flex items-center justify-between">

                            <div>

                                <h3 className="text-xl font-semibold">
                                    Catégories
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Renommez et choisissez leur ordre d&apos;affichage.
                                </p>

                            </div>

                        </div>


                        {skillCategories.length > 0 ? (

                            <div className="space-y-4">

                                {skillCategories.map(
                                    (
                                        category,
                                        index
                                    ) => (

                                        <div
                                            key={
                                                category.id
                                            }
                                            className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                                        >

                                            <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

                                                {/* ORDER */}

                                                <div className="flex shrink-0 items-center gap-2">

                                                    <span className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-white/10 bg-black/30 px-2 text-xs text-gray-500">

                                                        #{index + 1}

                                                    </span>


                                                    <form
                                                        action={
                                                            moveSkillCategory.bind(
                                                                null,
                                                                category.id,
                                                                "up"
                                                            )
                                                        }
                                                    >

                                                        <button
                                                            type="submit"
                                                            disabled={
                                                                index === 0
                                                            }
                                                            title="Monter"
                                                            className="h-9 rounded-lg border border-white/10 px-3 text-sm text-gray-300 transition hover:border-cyan-400/30 hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-25"
                                                        >
                                                            ↑
                                                        </button>

                                                    </form>


                                                    <form
                                                        action={
                                                            moveSkillCategory.bind(
                                                                null,
                                                                category.id,
                                                                "down"
                                                            )
                                                        }
                                                    >

                                                        <button
                                                            type="submit"
                                                            disabled={
                                                                index ===
                                                                skillCategories.length - 1
                                                            }
                                                            title="Descendre"
                                                            className="h-9 rounded-lg border border-white/10 px-3 text-sm text-gray-300 transition hover:border-cyan-400/30 hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-25"
                                                        >
                                                            ↓
                                                        </button>

                                                    </form>

                                                </div>


                                                {/* EDIT */}

                                                <form
                                                    action={
                                                        updateSkillCategory.bind(
                                                            null,
                                                            category.id
                                                        )
                                                    }
                                                    className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row"
                                                >

                                                    <input
                                                        name="categoryName"
                                                        required
                                                        defaultValue={
                                                            category.name
                                                        }
                                                        className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#050709] px-4 py-2.5 text-sm text-white outline-none transition focus:border-cyan-400"
                                                    />


                                                    <button
                                                        type="submit"
                                                        className="rounded-xl border border-cyan-400/20 px-4 py-2.5 text-sm text-cyan-400 transition hover:bg-cyan-400/10"
                                                    >
                                                        Enregistrer
                                                    </button>

                                                </form>


                                                {/* INFO + DELETE */}

                                                <div className="flex shrink-0 items-center justify-between gap-4 lg:justify-end">

                                                    <span className="text-xs text-gray-600">

                                                        {category.skills.length} compétence
                                                        {category.skills.length > 1
                                                            ? "s"
                                                            : ""
                                                        }

                                                    </span>


                                                    <form
                                                        action={
                                                            deleteSkillCategory.bind(
                                                                null,
                                                                category.id
                                                            )
                                                        }
                                                    >

                                                        <button
                                                            type="submit"
                                                            className="rounded-xl border border-red-500/20 px-4 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
                                                        >
                                                            Supprimer
                                                        </button>

                                                    </form>

                                                </div>

                                            </div>


                                            {/* SLUG */}

                                            <p className="mt-3 text-xs text-gray-700">
                                                slug : {category.slug}
                                            </p>

                                        </div>

                                    )
                                )}

                            </div>

                        ) : (

                            <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 px-6 py-14 text-center">

                                <p className="text-sm text-gray-500">
                                    Aucune catégorie pour le moment.
                                </p>

                                <p className="mt-2 text-xs text-gray-700">
                                    Commencez par créer votre première catégorie.
                                </p>

                            </div>

                        )}

                    </div>

                    {/* ==================================================
    CREATE SKILL
   ================================================== */}

                    <div className="mt-14 border-t border-white/10 pt-12">

                        <div>

                            <h3 className="text-2xl font-semibold">
                                Nouvelle compétence
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Ajoutez une compétence dans l&apos;une de vos catégories.
                            </p>

                        </div>


                        <form
                            action={
                                createSkill
                            }
                            className="mt-7 rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8"
                        >

                            <div className="grid gap-5 md:grid-cols-2">

                                {/* NAME */}

                                <div>

                                    <label className="text-sm text-gray-400">
                                        Nom *
                                    </label>

                                    <input
                                        name="skillName"
                                        required
                                        placeholder="Ex. ESP32"
                                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#050709] px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                                    />

                                </div>


                                {/* CATEGORY */}

                                <div>

                                    <label className="text-sm text-gray-400">
                                        Catégorie *
                                    </label>

                                    <select
                                        name="skillCategoryId"
                                        required
                                        defaultValue=""
                                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#050709] px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                                    >

                                        <option
                                            value=""
                                            disabled
                                        >
                                            Choisir une catégorie
                                        </option>


                                        {skillCategories.map(
                                            (category) => (

                                                <option
                                                    key={
                                                        category.id
                                                    }
                                                    value={
                                                        category.id
                                                    }
                                                >
                                                    {category.name}
                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>


                                {/* LEVEL */}

                                <div>

                                    <label className="text-sm text-gray-400">
                                        Niveau
                                    </label>

                                    <input
                                        name="skillLevel"
                                        placeholder="Ex. Avancé"
                                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#050709] px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                                    />

                                </div>


                                {/* PERCENTAGE */}

                                <div>

                                    <label className="text-sm text-gray-400">
                                        Pourcentage
                                    </label>

                                    <input
                                        name="skillPercentage"
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="1"
                                        placeholder="Ex. 85"
                                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#050709] px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                                    />

                                </div>

                            </div>


                            {/* PUBLISHED */}

                            <label className="mt-6 flex cursor-pointer items-center gap-3">

                                <input
                                    type="checkbox"
                                    name="skillPublished"
                                    defaultChecked
                                    className="h-4 w-4 accent-cyan-400"
                                />

                                <span className="text-sm text-gray-400">
                                    Publier cette compétence
                                </span>

                            </label>


                            <div className="mt-7 flex justify-end">

                                <button
                                    type="submit"
                                    disabled={
                                        skillCategories.length === 0
                                    }
                                    className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    + Ajouter la compétence
                                </button>

                            </div>

                        </form>

                    </div>

                    {/* ==================================================
    SKILLS LIST
   ================================================== */}

                    <div className="mt-12">

                        <div>

                            <h3 className="text-2xl font-semibold">
                                Compétences existantes
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Modifiez, organisez et choisissez les compétences visibles publiquement.
                            </p>

                        </div>


                        <div className="mt-8 space-y-10">

                            {skillCategories.map(
                                (category) => (

                                    <div
                                        key={
                                            category.id
                                        }
                                    >

                                        {/* CATEGORY HEADER */}

                                        <div className="mb-4 flex items-center justify-between">

                                            <div>

                                                <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
                                                    Catégorie
                                                </p>

                                                <h4 className="mt-2 text-xl font-semibold">
                                                    {category.name}
                                                </h4>

                                            </div>


                                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-500">

                                                {category.skills.length} compétence
                                                {category.skills.length > 1
                                                    ? "s"
                                                    : ""
                                                }

                                            </span>

                                        </div>


                                        {category.skills.length > 0 ? (

                                            <div className="space-y-4">

                                                {category.skills.map(
                                                    (
                                                        skill,
                                                        index
                                                    ) => (

                                                        <div
                                                            key={
                                                                skill.id
                                                            }
                                                            className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                                                        >

                                                            {/* TOP */}

                                                            <div className="flex flex-wrap items-center justify-between gap-3">

                                                                <div className="flex items-center gap-2">

                                                                    <span className="rounded-lg border border-white/10 bg-black/30 px-2.5 py-1.5 text-xs text-gray-500">
                                                                        #{index + 1}
                                                                    </span>


                                                                    {skill.published ? (

                                                                        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                                                                            Publiée
                                                                        </span>

                                                                    ) : (

                                                                        <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs text-amber-300">
                                                                            Masquée
                                                                        </span>

                                                                    )}

                                                                </div>


                                                                {/* ORDER */}

                                                                <div className="flex gap-2">

                                                                    <form
                                                                        action={
                                                                            moveSkill.bind(
                                                                                null,
                                                                                skill.id,
                                                                                "up"
                                                                            )
                                                                        }
                                                                    >

                                                                        <button
                                                                            type="submit"
                                                                            disabled={
                                                                                index === 0
                                                                            }
                                                                            className="rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 disabled:cursor-not-allowed disabled:opacity-25"
                                                                        >
                                                                            ↑
                                                                        </button>

                                                                    </form>


                                                                    <form
                                                                        action={
                                                                            moveSkill.bind(
                                                                                null,
                                                                                skill.id,
                                                                                "down"
                                                                            )
                                                                        }
                                                                    >

                                                                        <button
                                                                            type="submit"
                                                                            disabled={
                                                                                index ===
                                                                                category.skills.length - 1
                                                                            }
                                                                            className="rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 disabled:cursor-not-allowed disabled:opacity-25"
                                                                        >
                                                                            ↓
                                                                        </button>

                                                                    </form>

                                                                </div>

                                                            </div>


                                                            {/* EDIT */}

                                                            <form
                                                                action={
                                                                    updateSkill.bind(
                                                                        null,
                                                                        skill.id
                                                                    )
                                                                }
                                                                className="mt-5"
                                                            >

                                                                <div className="grid gap-4 md:grid-cols-2">

                                                                    <div>

                                                                        <label className="text-xs text-gray-500">
                                                                            Nom
                                                                        </label>

                                                                        <input
                                                                            name="skillName"
                                                                            required
                                                                            defaultValue={
                                                                                skill.name
                                                                            }
                                                                            className="mt-2 w-full rounded-xl border border-white/10 bg-[#050709] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
                                                                        />

                                                                    </div>


                                                                    <div>

                                                                        <label className="text-xs text-gray-500">
                                                                            Catégorie
                                                                        </label>

                                                                        <select
                                                                            name="skillCategoryId"
                                                                            defaultValue={
                                                                                skill.category_id
                                                                            }
                                                                            className="mt-2 w-full rounded-xl border border-white/10 bg-[#050709] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
                                                                        >

                                                                            {skillCategories.map(
                                                                                (
                                                                                    option
                                                                                ) => (

                                                                                    <option
                                                                                        key={
                                                                                            option.id
                                                                                        }
                                                                                        value={
                                                                                            option.id
                                                                                        }
                                                                                    >
                                                                                        {option.name}
                                                                                    </option>

                                                                                )
                                                                            )}

                                                                        </select>

                                                                    </div>


                                                                    <div>

                                                                        <label className="text-xs text-gray-500">
                                                                            Niveau
                                                                        </label>

                                                                        <input
                                                                            name="skillLevel"
                                                                            defaultValue={
                                                                                skill.level
                                                                                ?? ""
                                                                            }
                                                                            placeholder="Ex. Avancé"
                                                                            className="mt-2 w-full rounded-xl border border-white/10 bg-[#050709] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
                                                                        />

                                                                    </div>


                                                                    <div>

                                                                        <label className="text-xs text-gray-500">
                                                                            Pourcentage
                                                                        </label>

                                                                        <input
                                                                            name="skillPercentage"
                                                                            type="number"
                                                                            min="0"
                                                                            max="100"
                                                                            defaultValue={
                                                                                skill.percentage
                                                                                ?? ""
                                                                            }
                                                                            className="mt-2 w-full rounded-xl border border-white/10 bg-[#050709] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
                                                                        />

                                                                    </div>

                                                                </div>


                                                                <div className="mt-5 flex justify-end">

                                                                    <button
                                                                        type="submit"
                                                                        className="rounded-xl border border-cyan-400/20 px-4 py-2.5 text-sm text-cyan-400 transition hover:bg-cyan-400/10"
                                                                    >
                                                                        Enregistrer les modifications
                                                                    </button>

                                                                </div>

                                                            </form>


                                                            {/* ACTIONS */}

                                                            <div className="mt-5 flex flex-wrap gap-3 border-t border-white/10 pt-5">

                                                                <form
                                                                    action={
                                                                        toggleSkillPublished.bind(
                                                                            null,
                                                                            skill.id
                                                                        )
                                                                    }
                                                                >

                                                                    <button
                                                                        type="submit"
                                                                        className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition hover:bg-white/5"
                                                                    >

                                                                        {skill.published
                                                                            ? "Masquer"
                                                                            : "Publier"
                                                                        }

                                                                    </button>

                                                                </form>


                                                                <form
                                                                    action={
                                                                        deleteSkill.bind(
                                                                            null,
                                                                            skill.id
                                                                        )
                                                                    }
                                                                >

                                                                    <button
                                                                        type="submit"
                                                                        className="rounded-xl border border-red-500/20 px-4 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
                                                                    >
                                                                        Supprimer
                                                                    </button>

                                                                </form>

                                                            </div>

                                                        </div>

                                                    )
                                                )}

                                            </div>

                                        ) : (

                                            <div className="rounded-2xl border border-dashed border-white/10 px-5 py-8 text-center">

                                                <p className="text-sm text-gray-600">
                                                    Aucune compétence dans cette catégorie.
                                                </p>

                                            </div>

                                        )}

                                    </div>

                                )
                            )}

                        </div>

                    </div>

                </section>

                {/* ============================================================
    EXPERIENCES
   ============================================================ */}

                <section
                    id="experiences"
                    className="mt-20 max-w-4xl border-t border-white/10 pt-14"
                >

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                        <div>

                            <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
                                Page d&apos;accueil
                            </p>

                            <h2 className="mt-3 text-3xl font-bold">
                                Expériences
                            </h2>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
                                Gérez vos expériences, responsabilités,
                                compétitions et réalisations.
                            </p>

                        </div>


                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400">

                            {experiences.length} expérience
                            {experiences.length > 1
                                ? "s"
                                : ""
                            }

                        </span>

                    </div>


                    {experienceSuccessMessage && (

                        <div className="mt-7 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-300">
                            {experienceSuccessMessage}
                        </div>

                    )}


                    {experienceErrorMessage && (

                        <div className="mt-7 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
                            {experienceErrorMessage}
                        </div>

                    )}


                    {/* ==================================================
        CREATE
       ================================================== */}

                    <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">

                        <h3 className="text-xl font-semibold">
                            Nouvelle expérience
                        </h3>


                        <form
                            action={createExperience}
                            className="mt-7 space-y-5"
                        >

                            <div className="grid gap-5 md:grid-cols-2">

                                <Field
                                    label="Titre"
                                    name="experienceTitle"
                                    defaultValue=""
                                    required
                                />


                                <div>

                                    <label className="text-sm text-gray-400">
                                        Type *
                                    </label>

                                    <select
                                        name="experienceType"
                                        required
                                        defaultValue="experience"
                                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#050709] px-4 py-3 text-white outline-none focus:border-cyan-400"
                                    >
                                        <option value="experience">
                                            Expérience
                                        </option>

                                        <option value="responsibility">
                                            Responsabilité
                                        </option>

                                        <option value="competition">
                                            Compétition
                                        </option>

                                        <option value="project">
                                            Projet
                                        </option>

                                        <option value="event">
                                            Événement
                                        </option>
                                    </select>

                                </div>


                                <Field
                                    label="Organisation"
                                    name="experienceOrganization"
                                    defaultValue=""
                                />


                                <Field
                                    label="Période / date"
                                    name="experienceDateLabel"
                                    defaultValue=""
                                />

                            </div>


                            <TextArea
                                label="Description"
                                name="experienceDescription"
                                defaultValue=""
                                rows={5}
                                required
                            />


                            <TextArea
                                label="Points clés"
                                name="experienceHighlights"
                                defaultValue=""
                                rows={6}
                            />


                            <p className="-mt-2 text-xs text-gray-600">
                                Un point clé par ligne.
                            </p>


                            <div className="flex flex-wrap gap-6">

                                <label className="flex items-center gap-3 text-sm text-gray-400">

                                    <input
                                        type="checkbox"
                                        name="experiencePublished"
                                        defaultChecked
                                        className="h-4 w-4 accent-cyan-400"
                                    />

                                    Publier

                                </label>


                                <label className="flex items-center gap-3 text-sm text-gray-400">

                                    <input
                                        type="checkbox"
                                        name="experienceFeatured"
                                        className="h-4 w-4 accent-cyan-400"
                                    />

                                    Mettre en avant

                                </label>

                            </div>


                            <div className="flex justify-end">

                                <button
                                    type="submit"
                                    className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
                                >
                                    + Ajouter l&apos;expérience
                                </button>

                            </div>

                        </form>

                    </div>


                    {/* ==================================================
        EXISTING EXPERIENCES
       ================================================== */}

                    <div className="mt-12">

                        <h3 className="text-2xl font-semibold">
                            Expériences existantes
                        </h3>


                        <div className="mt-7 space-y-5">

                            {experiences.map(
                                (
                                    experience,
                                    index
                                ) => (

                                    <div
                                        key={experience.id}
                                        className="rounded-3xl border border-white/10 bg-white/[0.025] p-6"
                                    >

                                        {/* STATUS */}

                                        <div className="flex flex-wrap items-center justify-between gap-4">

                                            <div className="flex flex-wrap items-center gap-2">

                                                <span className="rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-gray-500">
                                                    #{index + 1}
                                                </span>


                                                {experience.published ? (

                                                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                                                        Publiée
                                                    </span>

                                                ) : (

                                                    <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs text-amber-300">
                                                        Masquée
                                                    </span>

                                                )}


                                                {experience.featured && (

                                                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                                                        Mise en avant
                                                    </span>

                                                )}

                                            </div>


                                            <div className="flex gap-2">

                                                <form
                                                    action={
                                                        moveExperience.bind(
                                                            null,
                                                            experience.id,
                                                            "up"
                                                        )
                                                    }
                                                >
                                                    <button
                                                        type="submit"
                                                        disabled={index === 0}
                                                        className="rounded-lg border border-white/10 px-3 py-2 text-sm disabled:opacity-25"
                                                    >
                                                        ↑
                                                    </button>
                                                </form>


                                                <form
                                                    action={
                                                        moveExperience.bind(
                                                            null,
                                                            experience.id,
                                                            "down"
                                                        )
                                                    }
                                                >
                                                    <button
                                                        type="submit"
                                                        disabled={
                                                            index ===
                                                            experiences.length - 1
                                                        }
                                                        className="rounded-lg border border-white/10 px-3 py-2 text-sm disabled:opacity-25"
                                                    >
                                                        ↓
                                                    </button>
                                                </form>

                                            </div>

                                        </div>


                                        {/* EDIT */}

                                        <form
                                            action={
                                                updateExperience.bind(
                                                    null,
                                                    experience.id
                                                )
                                            }
                                            className="mt-6 space-y-5"
                                        >

                                            <div className="grid gap-5 md:grid-cols-2">

                                                <Field
                                                    label="Titre"
                                                    name="experienceTitle"
                                                    defaultValue={
                                                        experience.title
                                                    }
                                                    required
                                                />


                                                <div>

                                                    <label className="text-sm text-gray-400">
                                                        Type
                                                    </label>

                                                    <select
                                                        name="experienceType"
                                                        defaultValue={
                                                            experience.type
                                                        }
                                                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#050709] px-4 py-3 text-white outline-none focus:border-cyan-400"
                                                    >
                                                        <option value="experience">
                                                            Expérience
                                                        </option>

                                                        <option value="responsibility">
                                                            Responsabilité
                                                        </option>

                                                        <option value="competition">
                                                            Compétition
                                                        </option>

                                                        <option value="project">
                                                            Projet
                                                        </option>

                                                        <option value="event">
                                                            Événement
                                                        </option>
                                                    </select>

                                                </div>


                                                <Field
                                                    label="Organisation"
                                                    name="experienceOrganization"
                                                    defaultValue={
                                                        experience.organization
                                                        ?? ""
                                                    }
                                                />


                                                <Field
                                                    label="Période / date"
                                                    name="experienceDateLabel"
                                                    defaultValue={
                                                        experience.date_label
                                                        ?? ""
                                                    }
                                                />

                                            </div>


                                            <TextArea
                                                label="Description"
                                                name="experienceDescription"
                                                defaultValue={
                                                    experience.description
                                                }
                                                rows={5}
                                                required
                                            />


                                            <TextArea
                                                label="Points clés"
                                                name="experienceHighlights"
                                                defaultValue={
                                                    experience.highlights
                                                        .join("\n")
                                                }
                                                rows={6}
                                            />


                                            <div className="flex justify-end">

                                                <button
                                                    type="submit"
                                                    className="rounded-xl border border-cyan-400/20 px-4 py-2.5 text-sm text-cyan-400 transition hover:bg-cyan-400/10"
                                                >
                                                    Enregistrer les modifications
                                                </button>

                                            </div>

                                        </form>


                                        {/* ACTIONS */}

                                        <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5">

                                            <form
                                                action={
                                                    toggleExperiencePublished.bind(
                                                        null,
                                                        experience.id
                                                    )
                                                }
                                            >
                                                <button
                                                    type="submit"
                                                    className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-gray-300"
                                                >
                                                    {experience.published
                                                        ? "Masquer"
                                                        : "Publier"
                                                    }
                                                </button>
                                            </form>


                                            <form
                                                action={
                                                    toggleExperienceFeatured.bind(
                                                        null,
                                                        experience.id
                                                    )
                                                }
                                            >
                                                <button
                                                    type="submit"
                                                    className="rounded-xl border border-cyan-400/20 px-4 py-2.5 text-sm text-cyan-400"
                                                >
                                                    {experience.featured
                                                        ? "Retirer la mise en avant"
                                                        : "Mettre en avant"
                                                    }
                                                </button>
                                            </form>


                                            <form
                                                action={
                                                    deleteExperience.bind(
                                                        null,
                                                        experience.id
                                                    )
                                                }
                                            >
                                                <button
                                                    type="submit"
                                                    className="rounded-xl border border-red-500/20 px-4 py-2.5 text-sm text-red-400"
                                                >
                                                    Supprimer
                                                </button>
                                            </form>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    </div>

                </section>
                {/* ============================================================
    CONTACT SETTINGS
   ============================================================ */}

                <section
                    id="contact-settings"
                    className="mt-20 max-w-4xl border-t border-white/10 pt-14"
                >

                    {/* HEADER */}

                    <div className="max-w-3xl">

                        <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
                            Page d&apos;accueil
                        </p>

                        <h2 className="mt-3 text-3xl font-bold">
                            Contact & ressources
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-gray-500">
                            Gérez les textes, liens professionnels,
                            CV et informations de contact de votre portfolio.
                        </p>

                    </div>


                    {/* SUCCESS */}

                    {contactSuccessMessage && (

                        <div className="mt-7 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-300">

                            {contactSuccessMessage}

                        </div>

                    )}


                    {/* ERROR */}

                    {contactErrorMessage && (

                        <div className="mt-7 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">

                            {contactErrorMessage}

                        </div>

                    )}


                    <form
                        action={
                            updateContactSettings
                        }
                        className="mt-8 space-y-8"
                    >

                        {/* ==================================================
            INTRODUCTION
           ================================================== */}

                        <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">

                            <div>

                                <h3 className="text-xl font-semibold">
                                    Présentation
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    Les textes affichés en haut de la section Contact.
                                </p>

                            </div>


                            <div className="mt-6 space-y-5">

                                <Field
                                    label="Petit titre"
                                    name="contactEyebrow"
                                    defaultValue={
                                        contactSettings.eyebrow
                                    }
                                    required
                                />


                                <Field
                                    label="Titre principal"
                                    name="contactTitle"
                                    defaultValue={
                                        contactSettings.title
                                    }
                                    required
                                />


                                <TextArea
                                    label="Introduction"
                                    name="contactIntro"
                                    defaultValue={
                                        contactSettings.intro
                                    }
                                    rows={4}
                                    required
                                />

                            </div>

                        </div>


                        {/* ==================================================
            CV
           ================================================== */}

                        <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">

                            <div>

                                <h3 className="text-xl font-semibold">
                                    CV
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    Paramètres de la carte permettant de télécharger votre CV.
                                </p>

                            </div>


                            <div className="mt-6 space-y-5">

                                <Field
                                    label="Lien du CV"
                                    name="contactCvUrl"
                                    defaultValue={
                                        contactSettings.cvUrl
                                    }
                                    required
                                />


                                <Field
                                    label="Titre de la carte"
                                    name="contactCvTitle"
                                    defaultValue={
                                        contactSettings.cvTitle
                                    }
                                    required
                                />


                                <TextArea
                                    label="Description"
                                    name="contactCvDescription"
                                    defaultValue={
                                        contactSettings.cvDescription
                                    }
                                    rows={3}
                                    required
                                />

                            </div>

                        </div>


                        {/* ==================================================
            GITHUB
           ================================================== */}

                        <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">

                            <div>

                                <h3 className="text-xl font-semibold">
                                    GitHub
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    Votre profil et la description de la carte GitHub.
                                </p>

                            </div>


                            <div className="mt-6 space-y-5">

                                <Field
                                    label="URL GitHub"
                                    name="contactGithubUrl"
                                    defaultValue={
                                        contactSettings.githubUrl
                                    }
                                    required
                                />


                                <Field
                                    label="Titre"
                                    name="contactGithubTitle"
                                    defaultValue={
                                        contactSettings.githubTitle
                                    }
                                    required
                                />


                                <TextArea
                                    label="Description"
                                    name="contactGithubDescription"
                                    defaultValue={
                                        contactSettings.githubDescription
                                    }
                                    rows={3}
                                    required
                                />

                            </div>

                        </div>


                        {/* ==================================================
            LINKEDIN
           ================================================== */}

                        <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">

                            <div>

                                <h3 className="text-xl font-semibold">
                                    LinkedIn
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    Votre profil professionnel LinkedIn.
                                </p>

                            </div>


                            <div className="mt-6 space-y-5">

                                <Field
                                    label="URL LinkedIn"
                                    name="contactLinkedinUrl"
                                    defaultValue={
                                        contactSettings.linkedinUrl
                                    }
                                    required
                                />


                                <Field
                                    label="Titre"
                                    name="contactLinkedinTitle"
                                    defaultValue={
                                        contactSettings.linkedinTitle
                                    }
                                    required
                                />


                                <TextArea
                                    label="Description"
                                    name="contactLinkedinDescription"
                                    defaultValue={
                                        contactSettings.linkedinDescription
                                    }
                                    rows={3}
                                    required
                                />

                            </div>

                        </div>


                        {/* ==================================================
            CTA
           ================================================== */}

                        <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.025] p-6 md:p-8">

                            <div>

                                <h3 className="text-xl font-semibold">
                                    Appel à l&apos;action
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    Le bloc final invitant un visiteur à vous contacter.
                                </p>

                            </div>


                            <div className="mt-6 space-y-5">

                                <Field
                                    label="Titre"
                                    name="contactCtaTitle"
                                    defaultValue={
                                        contactSettings.ctaTitle
                                    }
                                    required
                                />


                                <TextArea
                                    label="Texte"
                                    name="contactCtaText"
                                    defaultValue={
                                        contactSettings.ctaText
                                    }
                                    rows={4}
                                    required
                                />


                                <div className="grid gap-5 md:grid-cols-2">

                                    <Field
                                        label="Adresse e-mail"
                                        name="contactEmail"
                                        defaultValue={
                                            contactSettings.email
                                        }
                                        required
                                    />


                                    <Field
                                        label="Texte du bouton"
                                        name="contactCtaButtonLabel"
                                        defaultValue={
                                            contactSettings.ctaButtonLabel
                                        }
                                        required
                                    />

                                </div>

                            </div>

                        </div>


                        {/* ==================================================
            SAVE
           ================================================== */}

                        <div className="sticky bottom-4 z-20 flex justify-end">

                            <button
                                type="submit"
                                className="rounded-xl bg-cyan-400 px-6 py-3.5 text-sm font-semibold text-black shadow-xl shadow-black/30 transition hover:bg-cyan-300"
                            >
                                Enregistrer la section Contact
                            </button>

                        </div>

                    </form>

                </section>
                {/* ============================================================
    GLOBAL SETTINGS
   ============================================================ */}

                <section
                    id="global-settings"
                    className="mt-20 max-w-4xl border-t border-white/10 pt-14"
                >

                    <div className="max-w-3xl">

                        <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
                            Paramètres globaux
                        </p>

                        <h2 className="mt-3 text-3xl font-bold">
                            Identité & footer
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-gray-500">
                            Gérez les informations générales affichées
                            dans le pied de page du portfolio.
                        </p>

                    </div>


                    {globalSuccessMessage && (

                        <div className="mt-7 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-300">
                            {globalSuccessMessage}
                        </div>

                    )}


                    {globalErrorMessage && (

                        <div className="mt-7 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
                            {globalErrorMessage}
                        </div>

                    )}


                    <form
                        action={
                            updateGlobalSettings
                        }
                        className="mt-8"
                    >

                        <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">

                            <div className="space-y-5">

                                <Field
                                    label="Nom / marque"
                                    name="globalBrand"
                                    defaultValue={
                                        globalSettings.brand
                                    }
                                    required
                                />


                                <TextArea
                                    label="Signature professionnelle"
                                    name="globalTagline"
                                    defaultValue={
                                        globalSettings.tagline
                                    }
                                    rows={3}
                                    required
                                />


                                <Field
                                    label="Copyright"
                                    name="globalFooterCopyright"
                                    defaultValue={
                                        globalSettings.footerCopyright
                                    }
                                    required
                                />

                            </div>


                            <div className="mt-7 flex justify-end">

                                <button
                                    type="submit"
                                    className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
                                >
                                    Enregistrer les paramètres globaux
                                </button>

                            </div>

                        </div>

                    </form>

                </section>

            </section>

        </main>
    );
}


/* ============================================================
   FORM COMPONENTS
   ============================================================ */


function FormSection({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children:
    React.ReactNode;
}) {

    return (
        <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">

            <h3 className="text-xl font-semibold">
                {title}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
                {description}
            </p>

            <div className="mt-7 space-y-5">
                {children}
            </div>

        </section>
    );
}


function Field({
    label,
    name,
    defaultValue,
    required = false,
}: {
    label: string;
    name: string;
    defaultValue: string;
    required?: boolean;
}) {

    return (
        <div>

            <label
                htmlFor={name}
                className="text-sm text-gray-400"
            >
                {label}

                {required && (
                    <span className="ml-1 text-cyan-400">
                        *
                    </span>
                )}

            </label>


            <input
                id={name}
                name={name}
                defaultValue={
                    defaultValue
                }
                required={
                    required
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#050709] px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />

        </div>
    );
}


function TextArea({
    label,
    name,
    defaultValue,
    rows = 5,
    required = false,
}: {
    label: string;
    name: string;
    defaultValue: string;
    rows?: number;
    required?: boolean;
}) {

    return (
        <div>

            <label
                htmlFor={name}
                className="text-sm text-gray-400"
            >
                {label}

                {required && (
                    <span className="ml-1 text-cyan-400">
                        *
                    </span>
                )}

            </label>


            <textarea
                id={name}
                name={name}
                defaultValue={
                    defaultValue
                }
                rows={rows}
                required={
                    required
                }
                className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-[#050709] px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />

        </div>
    );
}