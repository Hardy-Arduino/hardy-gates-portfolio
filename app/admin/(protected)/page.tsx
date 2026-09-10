import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {

    const supabase = await createClient();

    const [
        projectsResult,
        publishedResult,
        mediaResult,
    ] = await Promise.all([

        supabase
            .from("projects")
            .select("*", {
                count: "exact",
                head: true,
            }),

        supabase
            .from("projects")
            .select("*", {
                count: "exact",
                head: true,
            })
            .eq("published", true),

        supabase
            .from("project_media")
            .select("*", {
                count: "exact",
                head: true,
            }),

    ]);

    const projectCount =
        projectsResult.count ?? 0;

    const publishedCount =
        publishedResult.count ?? 0;

    const mediaCount =
        mediaResult.count ?? 0;

    const draftCount =
        projectCount - publishedCount;


    return (
        <main>

            {/* HEADER */}
            <div>

                <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
                    Dashboard
                </p>

                <h1 className="mt-3 text-4xl font-bold md:text-5xl">
                    Administration
                </h1>

                <p className="mt-4 text-gray-500">
                    Gérez votre portfolio depuis un seul espace.
                </p>

            </div>


            {/* STATS */}
            <section className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    label="Projets"
                    value={projectCount}
                />

                <StatCard
                    label="Publiés"
                    value={publishedCount}
                />

                <StatCard
                    label="Brouillons"
                    value={draftCount}
                />

                <StatCard
                    label="Médias"
                    value={mediaCount}
                />

            </section>


            {/* QUICK ACTIONS */}
            <section className="mt-14">

                <h2 className="text-2xl font-semibold">
                    Actions rapides
                </h2>

                <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                    <DashboardCard
                        title="Projets"
                        description="Ajouter, modifier, publier ou supprimer vos projets."
                    />

                    <DashboardCard
                        title="Médias"
                        description="Gérer les images, galeries et démonstrations vidéo."
                    />

                    <DashboardCard
                        title="Contenu"
                        description="Modifier les textes, compétences et expériences."
                    />

                </div>

            </section>

        </main>
    );
}


function StatCard({
    label,
    value,
}: {
    label: string;
    value: number;
}) {

    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <p className="text-sm text-gray-500">
                {label}
            </p>

            <p className="mt-3 text-4xl font-bold text-cyan-400">
                {value}
            </p>

        </div>
    );
}


function DashboardCard({
    title,
    description,
}: {
    title: string;
    description: string;
}) {

    return (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">

            <h3 className="text-xl font-semibold">
                {title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
                {description}
            </p>

        </div>
    );
}