import Link from "next/link";
import { createProject } from "./actions";

type NewProjectPageProps = {
    searchParams: Promise<{
        error?: string;
    }>;
};


export default async function NewProjectPage({
    searchParams,
}: NewProjectPageProps) {

    const { error } =
        await searchParams;


    const messages:
        Record<string, string> = {

        missing:
            "Veuillez remplir tous les champs obligatoires.",

        slug:
            "Le slug du projet est invalide.",

        duplicate:
            "Un projet utilise déjà ce slug.",

        year:
            "L'année renseignée est invalide.",

        order:
            "L'ordre d'affichage doit être un nombre positif.",

        database:
            "Une erreur est survenue lors de l'enregistrement du projet.",
    };


    const errorMessage =
        error
            ? messages[error]
            : null;


    return (
        <main>

            {/* HEADER */}
            <div className="border-b border-white/10 pb-8">

                <Link
                    href="/admin/projects"
                    className="text-sm text-gray-500 transition hover:text-cyan-400"
                >
                    ← Retour aux projets
                </Link>


                <p className="mt-8 text-sm uppercase tracking-[0.3em] text-cyan-400">
                    Portfolio CMS
                </p>


                <h1 className="mt-3 text-4xl font-bold md:text-5xl">
                    Nouveau projet
                </h1>


                <p className="mt-4 max-w-2xl text-gray-500">
                    Ajoutez une nouvelle réalisation
                    à votre portfolio.
                </p>

            </div>


            {/* FORM */}
            <form
                action={createProject}
                className="mt-10 max-w-4xl"
            >

                {errorMessage && (

                    <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">

                        {errorMessage}

                    </div>

                )}


                <div className="space-y-8">

                    {/* =========================
                        INFORMATIONS PRINCIPALES
                    ========================== */}

                    <FormSection
                        title="Informations principales"
                        description="Les informations générales du projet."
                    >

                        <Field
                            label="Titre"
                            name="title"
                            required
                            placeholder="Ex. Robot mobile autonome"
                        />


                        <Field
                            label="Slug"
                            name="slug"
                            placeholder="robot-mobile-autonome"
                            helper="Optionnel. S'il est vide, il sera généré automatiquement depuis le titre."
                        />


                        <Field
                            label="Catégorie"
                            name="category"
                            required
                            placeholder="Embedded Systems"
                        />


                        <div className="grid gap-5 sm:grid-cols-2">

                            <Field
                                label="Année"
                                name="year"
                                type="number"
                                placeholder="2026"
                            />


                            <div>

                                <label
                                    htmlFor="status"
                                    className="text-sm text-gray-400"
                                >
                                    Statut
                                </label>

                                <select
                                    id="status"
                                    name="status"
                                    defaultValue="Prototype"
                                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#050709] px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                                >
                                    <option>
                                        Prototype
                                    </option>

                                    <option>
                                        En développement
                                    </option>

                                    <option>
                                        Projet réalisé
                                    </option>

                                    <option>
                                        Projet académique
                                    </option>
                                </select>

                            </div>

                        </div>

                    </FormSection>


                    {/* =========================
                        DESCRIPTION
                    ========================== */}

                    <FormSection
                        title="Présentation"
                        description="Les textes visibles sur la carte et la page détaillée."
                    >

                        <TextArea
                            label="Description courte"
                            name="shortDescription"
                            required
                            rows={3}
                            placeholder="Résumé du projet affiché sur la carte..."
                        />


                        <TextArea
                            label="Description complète"
                            name="description"
                            required
                            rows={8}
                            placeholder="Présentez le projet, son objectif et son fonctionnement..."
                        />

                    </FormSection>


                    {/* =========================
                        TECHNOLOGIES
                    ========================== */}

                    <FormSection
                        title="Technologies"
                        description="Séparez les technologies par des virgules."
                    >

                        <Field
                            label="Technologies utilisées"
                            name="technologies"
                            placeholder="ESP32, Arduino, MQTT, Supabase"
                            helper="Exemple : ESP32, IoT, C++, PostgreSQL"
                        />

                    </FormSection>


                    {/* =========================
                        LIENS
                    ========================== */}

                    <FormSection
                        title="Liens"
                        description="Ces informations sont facultatives."
                    >

                        <Field
                            label="GitHub"
                            name="githubUrl"
                            type="url"
                            placeholder="https://github.com/..."
                        />


                        <Field
                            label="Démonstration"
                            name="demoUrl"
                            type="url"
                            placeholder="https://..."
                        />

                    </FormSection>


                    {/* =========================
                        PUBLICATION
                    ========================== */}

                    <FormSection
                        title="Publication"
                        description="Contrôlez la visibilité du projet."
                    >

                        <Field
                            label="Ordre d'affichage"
                            name="displayOrder"
                            type="number"
                            placeholder="Automatique"
                            helper="Laissez vide pour placer le projet à la fin."
                        />


                        <div className="grid gap-4 sm:grid-cols-2">

                            <Checkbox
                                name="featured"
                                label="Mettre en avant"
                                description="Le projet peut être identifié comme une réalisation importante."
                            />


                            <Checkbox
                                name="published"
                                label="Publier immédiatement"
                                description="Sinon le projet restera en brouillon dans l'administration."
                            />

                        </div>

                    </FormSection>

                </div>


                {/* ACTIONS */}
                <div className="mt-10 flex flex-col-reverse gap-3 border-t border-white/10 pt-8 sm:flex-row sm:justify-end">

                    <Link
                        href="/admin/projects"
                        className="rounded-xl border border-white/10 px-6 py-3 text-center text-sm text-gray-400 transition hover:text-white"
                    >
                        Annuler
                    </Link>


                    <button
                        type="submit"
                        className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
                    >
                        Créer le projet
                    </button>

                </div>

            </form>

        </main>
    );
}


/* ============================================================
   COMPONENTS FORM
   ============================================================ */


function FormSection({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: React.ReactNode;
}) {

    return (
        <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">

            <div className="mb-7">

                <h2 className="text-xl font-semibold">
                    {title}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    {description}
                </p>

            </div>


            <div className="space-y-5">
                {children}
            </div>

        </section>
    );
}


function Field({
    label,
    name,
    type = "text",
    required = false,
    placeholder,
    helper,
}: {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    helper?: string;
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
                type={type}
                required={required}
                placeholder={placeholder}
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#050709] px-4 py-3 text-white outline-none transition placeholder:text-gray-700 focus:border-cyan-400"
            />


            {helper && (

                <p className="mt-2 text-xs text-gray-600">
                    {helper}
                </p>

            )}

        </div>
    );
}


function TextArea({
    label,
    name,
    required = false,
    rows = 5,
    placeholder,
}: {
    label: string;
    name: string;
    required?: boolean;
    rows?: number;
    placeholder?: string;
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
                required={required}
                rows={rows}
                placeholder={placeholder}
                className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-[#050709] px-4 py-3 text-white outline-none transition placeholder:text-gray-700 focus:border-cyan-400"
            />

        </div>
    );
}


function Checkbox({
    name,
    label,
    description,
}: {
    name: string;
    label: string;
    description: string;
}) {

    return (
        <label className="flex cursor-pointer gap-4 rounded-2xl border border-white/10 bg-black/30 p-5 transition hover:border-cyan-400/20">

            <input
                name={name}
                type="checkbox"
                className="mt-1 h-4 w-4 accent-cyan-400"
            />


            <span>

                <span className="block text-sm font-medium text-white">
                    {label}
                </span>

                <span className="mt-1 block text-xs leading-5 text-gray-500">
                    {description}
                </span>

            </span>

        </label>
    );
}