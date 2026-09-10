"use client";

import { useState } from "react";

type DeleteProjectButtonProps = {
    projectId: string;
    projectTitle: string;
    action: (
        projectId: string
    ) => Promise<void>;
};


export default function DeleteProjectButton({
    projectId,
    projectTitle,
    action,
}: DeleteProjectButtonProps) {

    const [isOpen, setIsOpen] =
        useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() =>
                    setIsOpen(true)
                }
                className="rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
            >
                Supprimer le projet
            </button>


            {isOpen && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 backdrop-blur-sm">

                    <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-[#090909] p-7 shadow-2xl">

                        <p className="text-sm uppercase tracking-[0.25em] text-red-400">
                            Suppression
                        </p>

                        <h2 className="mt-4 text-2xl font-bold">
                            Supprimer ce projet ?
                        </h2>

                        <p className="mt-4 text-sm leading-6 text-gray-400">
                            Vous êtes sur le point de supprimer
                            définitivement :
                        </p>

                        <p className="mt-3 font-semibold text-white">
                            {projectTitle}
                        </p>

                        <div className="mt-5 rounded-xl border border-red-500/10 bg-red-500/5 px-4 py-3 text-xs leading-5 text-red-300">
                            Cette action est irréversible.
                            Le projet et ses données associées
                            seront supprimés.
                        </div>


                        <div className="mt-7 flex gap-3">

                            <button
                                type="button"
                                onClick={() =>
                                    setIsOpen(false)
                                }
                                className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm text-gray-300 transition hover:bg-white/5"
                            >
                                Annuler
                            </button>


                            <form
                                action={() =>
                                    action(
                                        projectId
                                    )
                                }
                                className="flex-1"
                            >

                                <button
                                    type="submit"
                                    className="w-full rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-400"
                                >
                                    Oui, supprimer
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            )}
        </>
    );
}