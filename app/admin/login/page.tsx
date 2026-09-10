import { login } from "./actions";

type LoginPageProps = {
    searchParams: Promise<{
        error?: string;
    }>;
};

export default async function AdminLoginPage({
    searchParams,
}: LoginPageProps) {

    const { error } = await searchParams;

    let errorMessage = "";

    if (error === "missing") {
        errorMessage =
            "Veuillez renseigner votre email et votre mot de passe.";
    }

    if (error === "invalid") {
        errorMessage =
            "Email ou mot de passe incorrect.";
    }

    if (error === "unauthorized") {
        errorMessage =
            "Ce compte n'est pas autorisé à accéder à l'administration.";
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">

            <div className="w-full max-w-md">

                {/* BRAND */}
                <div className="mb-10 text-center">

                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
                        Hardy Gates
                    </p>

                    <h1 className="mt-4 text-4xl font-bold">
                        Administration
                    </h1>

                    <p className="mt-3 text-sm text-gray-500">
                        Accès privé au portfolio
                    </p>

                </div>


                {/* FORM */}
                <form
                    action={login}
                    className="rounded-3xl border border-white/10 bg-white/[0.03] p-8"
                >

                    <div>

                        <label
                            htmlFor="email"
                            className="text-sm text-gray-400"
                        >
                            Adresse email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none transition focus:border-cyan-400"
                        />

                    </div>


                    <div className="mt-5">

                        <label
                            htmlFor="password"
                            className="text-sm text-gray-400"
                        >
                            Mot de passe
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none transition focus:border-cyan-400"
                        />

                    </div>


                    {errorMessage && (

                        <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">

                            {errorMessage}

                        </div>

                    )}


                    <button
                        type="submit"
                        className="mt-7 w-full rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black transition hover:bg-cyan-300"
                    >
                        Se connecter
                    </button>

                </form>


                <p className="mt-6 text-center text-xs text-gray-600">
                    Zone réservée à l&apos;administrateur.
                </p>

            </div>

        </main>
    );
}