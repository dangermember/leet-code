"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { NavLinks } from "./nav-links";

export function MobileNav() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    return (
        <>
            <button
                type="button"
                aria-label="Open navigation"
                aria-expanded={open}
                aria-controls="mobile-navigation"
                onClick={() => setOpen(true)}
                className="rounded-md p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white md:hidden"
            >
                <Menu className="h-6 w-6" />
            </button>

            <div
                className={`fixed inset-0 z-50 transition-all duration-300 md:hidden ${
                    open
                        ? "pointer-events-auto visible bg-black w-screen h-screen"
                        : "pointer-events-none invisible opacity-0"
                }`}
            >
                <div
                    id="mobile-navigation"
                    className={`absolute right-0 top-0 flex h-full w-72 flex-col gap-2 p-6 transition-transform duration-300 ${
                        open ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="mb-6 flex justify-end">
                        <button
                            type="button"
                            aria-label="Close navigation"
                            onClick={() => setOpen(false)}
                            className="rounded-md p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <NavLinks
                        className="rounded-md px-3 py-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                        onNavigate={() => setOpen(false)}
                    />
                </div>

                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10"
                    onClick={() => setOpen(false)}
                />
            </div>
        </>
    );
}