"use client";

import {
    useEffect,
    useState,
} from "react";


type Theme =
    | "dark"
    | "light";


export default function ThemeToggle() {

    const [theme, setTheme] =
        useState<Theme>("dark");

    const [mounted, setMounted] =
        useState(false);


    useEffect(() => {

        const savedTheme =
            localStorage.getItem(
                "portfolio-theme"
            ) as Theme | null;


        const initialTheme: Theme =
            savedTheme === "light"
                ? "light"
                : "dark";


        document.documentElement.dataset.theme =
            initialTheme;

        setTheme(initialTheme);

        setMounted(true);

    }, []);


    function toggleTheme() {

        const newTheme: Theme =
            theme === "dark"
                ? "light"
                : "dark";


        document.documentElement.dataset.theme =
            newTheme;

        localStorage.setItem(
            "portfolio-theme",
            newTheme
        );

        setTheme(newTheme);
    }


    if (!mounted) {

        return (
            <div
                className="
                    h-10 w-10
                    rounded-full
                    border
                    border-white/10
                "
                aria-hidden="true"
            />
        );
    }


    return (
        <button
            type="button"
            onClick={toggleTheme}

            aria-label={
                theme === "dark"
                    ? "Activer le thème clair"
                    : "Activer le thème sombre"
            }

            title={
                theme === "dark"
                    ? "Thème clair"
                    : "Thème sombre"
            }

            className="
                theme-toggle
                flex h-10 w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                transition
                duration-300
            "
        >

            {theme === "dark" ? (

                /* SOLEIL */
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                    aria-hidden="true"
                >
                    <circle
                        cx="12"
                        cy="12"
                        r="4"
                    />

                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                </svg>

            ) : (

                /* LUNE */
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                    aria-hidden="true"
                >
                    <path
                        d="
                            M21 12.79
                            A9 9 0 1 1
                            11.21 3
                            7 7 0 0 0
                            21 12.79
                        "
                    />
                </svg>

            )}

        </button>
    );
}