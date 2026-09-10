import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { logout } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    await requireAdmin();

    return (
        <div className="min-h-screen bg-black text-white">

            <div className="flex min-h-screen">

                {/* SIDEBAR */}
                <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-[#050709] lg:block">

                    <div className="flex h-full flex-col p-6">

                        {/* LOGO */}
                        <Link
                            href="/admin"
                            className="text-2xl font-bold"
                        >
                            HG
                            <span className="text-cyan-400">.</span>
                        </Link>

                        <p className="mt-2 text-xs uppercase tracking-[0.25em] text-gray-600">
                            Portfolio CMS
                        </p>


                        {/* NAV */}
                        <nav className="mt-12 space-y-2">

                            <Link
                                href="/admin"
                                className="block rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-cyan-400"
                            >
                                Dashboard
                            </Link>

                            <Link
                                href="/admin/projects"
                                className="block rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-cyan-400"
                            >
                                Projets
                            </Link>

                            <Link
                                href="/admin/media"
                                className="block rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-cyan-400"
                            >
                                Médias
                            </Link>

                            <Link
                                href="/admin/content"
                                className="block rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-cyan-400"
                            >
                                Contenu
                            </Link>

                        </nav>


                        {/* BOTTOM */}
                        <div className="mt-auto space-y-3">

                            <Link
                                href="/"
                                className="block rounded-xl border border-white/10 px-4 py-3 text-center text-sm text-gray-400 transition hover:border-cyan-400/40 hover:text-cyan-400"
                            >
                                Voir le portfolio ↗
                            </Link>

                            <form action={logout}>

                                <button
                                    type="submit"
                                    className="w-full rounded-xl border border-red-500/20 px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
                                >
                                    Déconnexion
                                </button>

                            </form>

                        </div>

                    </div>

                </aside>


                {/* MAIN */}
                <div className="min-w-0 flex-1">

                    {/* MOBILE NAVIGATION */}
                    <div className="border-b border-white/10 bg-[#050709] lg:hidden">

                        {/* TOP BAR */}
                        <header className="flex items-center justify-between px-5 py-4">

                            <Link
                                href="/admin"
                                className="text-xl font-bold"
                            >
                                HG
                                <span className="text-cyan-400">.</span>
                            </Link>


                            <div className="flex items-center gap-3">

                                <Link
                                    href="/"
                                    className="text-xs text-gray-400 transition hover:text-cyan-400"
                                >
                                    Portfolio ↗
                                </Link>

                                <form action={logout}>
                                    <button
                                        type="submit"
                                        className="rounded-lg border border-red-500/20 px-3 py-2 text-xs text-red-400 transition hover:bg-red-500/10"
                                    >
                                        Déconnexion
                                    </button>
                                </form>

                            </div>

                        </header>


                        {/* MOBILE ADMIN MENU */}
                        <nav className="flex gap-2 overflow-x-auto px-5 pb-4">

                            <Link
                                href="/admin"
                                className="shrink-0 rounded-xl border border-white/10 px-4 py-2 text-xs text-gray-300 transition hover:border-cyan-400/40 hover:text-cyan-400"
                            >
                                Dashboard
                            </Link>

                            <Link
                                href="/admin/projects"
                                className="shrink-0 rounded-xl border border-white/10 px-4 py-2 text-xs text-gray-300 transition hover:border-cyan-400/40 hover:text-cyan-400"
                            >
                                Projets
                            </Link>

                            <Link
                                href="/admin/media"
                                className="shrink-0 rounded-xl border border-white/10 px-4 py-2 text-xs text-gray-300 transition hover:border-cyan-400/40 hover:text-cyan-400"
                            >
                                Médias
                            </Link>

                            <Link
                                href="/admin/content"
                                className="shrink-0 rounded-xl border border-white/10 px-4 py-2 text-xs text-gray-300 transition hover:border-cyan-400/40 hover:text-cyan-400"
                            >
                                Contenu
                            </Link>

                        </nav>

                    </div>


                    <div className="px-5 py-8 md:px-8 lg:px-12">
                        {children}
                    </div>

                </div>

            </div>

        </div>
    );
}