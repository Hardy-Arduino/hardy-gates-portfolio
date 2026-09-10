import type {
    ContactSettings,
} from "@/lib/content/site-settings";

export default function Contact({
    settings,
}: {
    settings: ContactSettings;
}) {
    return (
        <section
            id="contact"
            className="border-t border-white/10 px-6 py-24"
        >
            <div className="mx-auto max-w-7xl">

                {/* HEADER */}
                <div className="max-w-3xl">

                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
                        {settings.eyebrow}
                    </p>

                    <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                        {settings.title}
                    </h2>

                    <p className="mt-5 leading-8 text-gray-400">
                        {settings.intro}
                    </p>

                </div>


                {/* CARDS */}
                <div className="mt-12 grid gap-5 md:grid-cols-3">

                    {/* CV */}
                    <a
                        href={settings.cvUrl}
                        download
                        className="group rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
                    >

                        <div className="flex items-center justify-between">

                            <span className="text-3xl">
                                📄
                            </span>

                            <span className="text-cyan-400 transition group-hover:translate-x-1">
                                →
                            </span>

                        </div>

                        <h3 className="mt-6 text-xl font-semibold">
                            {settings.cvTitle}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-gray-500">
                            {settings.cvDescription}
                        </p>

                    </a>


                    {/* GITHUB */}
                    <a
                        href={settings.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
                    >

                        <div className="flex items-center justify-between">

                            <span className="text-3xl">
                                ◉
                            </span>

                            <span className="text-cyan-400 transition group-hover:translate-x-1">
                                →
                            </span>

                        </div>

                        <h3 className="mt-6 text-xl font-semibold">
                            {settings.githubTitle}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-gray-500">
                            {settings.githubDescription}
                        </p>

                    </a>


                    {/* LINKEDIN */}
                    <a
                        href={settings.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
                    >

                        <div className="flex items-center justify-between">

                            <span className="text-3xl">
                                in
                            </span>

                            <span className="text-cyan-400 transition group-hover:translate-x-1">
                                →
                            </span>

                        </div>

                        <h3 className="mt-6 text-xl font-semibold">
                            {settings.linkedinTitle}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-gray-500">
                            {settings.linkedinDescription}
                        </p>

                    </a>

                </div>


                {/* CALL TO ACTION */}
                <div className="mt-12 rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.03] p-8 md:p-10">

                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                        <div>

                            <p className="text-xl font-semibold">
                                {settings.ctaTitle}
                            </p>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                {settings.ctaText}
                            </p>

                        </div>


                        <a
                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                                settings.email
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex shrink-0 items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
                        >
                            {settings.ctaButtonLabel}
                        </a>

                    </div>

                </div>

            </div>
        </section>
    );
}