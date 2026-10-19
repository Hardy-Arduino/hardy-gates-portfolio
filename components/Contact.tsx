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
            className="
                border-t
                border-[var(--portfolio-border)]
                px-6
                py-24
            "
        >
            <div className="mx-auto max-w-7xl">

                {/* ================= HEADER ================= */}
                <div className="max-w-3xl">

                    <p
                        className="
                            text-sm
                            uppercase
                            tracking-[0.3em]
                            text-[var(--portfolio-accent)]
                        "
                    >
                        {settings.eyebrow}
                    </p>

                    <h2
                        className="
                            mt-3
                            text-4xl
                            font-bold
                            text-[var(--portfolio-text)]
                            md:text-5xl
                        "
                    >
                        {settings.title}
                    </h2>

                    <p
                        className="
                            mt-5
                            leading-8
                            text-[var(--portfolio-text-secondary)]
                        "
                    >
                        {settings.intro}
                    </p>

                </div>


                {/* ================= CARDS ================= */}
                <div className="mt-12 grid gap-5 md:grid-cols-3">

                    {/* ================= CV ================= */}
                    <a
                        href={settings.cvUrl}
                        download
                        className="
                            group
                            rounded-3xl
                            border
                            border-[var(--portfolio-border)]
                            bg-[var(--portfolio-surface)]
                            p-7
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-[var(--portfolio-accent)]
                            hover:bg-[var(--portfolio-surface-hover)]
                        "
                    >

                        <div className="flex items-center justify-between">

                            <span className="text-3xl">
                                📄
                            </span>

                            <span
                                className="
                                    text-[var(--portfolio-accent)]
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1
                                "
                            >
                                →
                            </span>

                        </div>


                        <h3
                            className="
                                mt-6
                                text-xl
                                font-semibold
                                text-[var(--portfolio-text)]
                            "
                        >
                            {settings.cvTitle}
                        </h3>


                        <p
                            className="
                                mt-3
                                text-sm
                                leading-6
                                text-[var(--portfolio-muted)]
                            "
                        >
                            {settings.cvDescription}
                        </p>

                    </a>


                    {/* ================= GITHUB ================= */}
                    <a
                        href={settings.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            group
                            rounded-3xl
                            border
                            border-[var(--portfolio-border)]
                            bg-[var(--portfolio-surface)]
                            p-7
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-[var(--portfolio-accent)]
                            hover:bg-[var(--portfolio-surface-hover)]
                        "
                    >

                        <div className="flex items-center justify-between">

                            <span
                                className="
                                    text-3xl
                                    text-[var(--portfolio-text)]
                                "
                            >
                                ◉
                            </span>

                            <span
                                className="
                                    text-[var(--portfolio-accent)]
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1
                                "
                            >
                                →
                            </span>

                        </div>


                        <h3
                            className="
                                mt-6
                                text-xl
                                font-semibold
                                text-[var(--portfolio-text)]
                            "
                        >
                            {settings.githubTitle}
                        </h3>


                        <p
                            className="
                                mt-3
                                text-sm
                                leading-6
                                text-[var(--portfolio-muted)]
                            "
                        >
                            {settings.githubDescription}
                        </p>

                    </a>


                    {/* ================= LINKEDIN ================= */}
                    <a
                        href={settings.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            group
                            rounded-3xl
                            border
                            border-[var(--portfolio-border)]
                            bg-[var(--portfolio-surface)]
                            p-7
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-[var(--portfolio-accent)]
                            hover:bg-[var(--portfolio-surface-hover)]
                        "
                    >

                        <div className="flex items-center justify-between">

                            <span
                                className="
                                    text-3xl
                                    font-semibold
                                    text-[var(--portfolio-text)]
                                "
                            >
                                in
                            </span>

                            <span
                                className="
                                    text-[var(--portfolio-accent)]
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1
                                "
                            >
                                →
                            </span>

                        </div>


                        <h3
                            className="
                                mt-6
                                text-xl
                                font-semibold
                                text-[var(--portfolio-text)]
                            "
                        >
                            {settings.linkedinTitle}
                        </h3>


                        <p
                            className="
                                mt-3
                                text-sm
                                leading-6
                                text-[var(--portfolio-muted)]
                            "
                        >
                            {settings.linkedinDescription}
                        </p>

                    </a>

                </div>


                {/* ================= CALL TO ACTION ================= */}
                <div
                    className="
                        mt-12
                        rounded-3xl
                        border
                        border-[var(--portfolio-accent)]
                        bg-[var(--portfolio-surface)]
                        p-8
                        transition-colors
                        duration-300
                        md:p-10
                    "
                >

                    <div
                        className="
                            flex
                            flex-col
                            gap-6
                            md:flex-row
                            md:items-center
                            md:justify-between
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-xl
                                    font-semibold
                                    text-[var(--portfolio-text)]
                                "
                            >
                                {settings.ctaTitle}
                            </p>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    leading-6
                                    text-[var(--portfolio-muted)]
                                "
                            >
                                {settings.ctaText}
                            </p>

                        </div>


                        <a
                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                                settings.email
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                inline-flex
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-[var(--portfolio-accent)]
                                px-6
                                py-3
                                text-sm
                                font-semibold
                                text-[var(--portfolio-accent-text)]
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:opacity-90
                            "
                        >
                            {settings.ctaButtonLabel}
                        </a>

                    </div>

                </div>

            </div>
        </section>
    );
}