'use client'
import { menuLinks } from "@/types/constants";
import Link from "next/link";
import { useState } from "react";
import { X, Menu } from "lucide-react";

interface NavBarProps {
    navLinkClass: string;
    navClass: string;
    isDrawer?: boolean;
}

export function NavBar({ navLinkClass, navClass, isDrawer = false }: Readonly<NavBarProps>) {
    const [open, setOpen] = useState(false);
    return <>
        {isDrawer === true && <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-md p-2 text-slate-300 transition hover:bg-white/10 hover:text-white md:hidden"
            aria-label="Toggle navigation"
        >
            <Menu className="h-6 w-6" />
        </button>}
        {((isDrawer === false) || open) && <nav className={`${isDrawer === true ? "absolute top-0 left-0 w-screen h-screen bg-black " : ""} ${navClass}`}>
            {isDrawer === true && <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-5 rounded-md p-2 text-slate-300 transition hover:bg-white/10 hover:text-white md:hidden"
                aria-label="Toggle navigation"
            >
                <X className="h-6 w-6" />
            </button>}
            {menuLinks.map((link, index) => (
                <Link
                    key={'nav' + index}
                    href={link.href}
                    className={navLinkClass}
                    onClick={() => setOpen(false)}
                >
                    {link.label}
                </Link>
            ))}
        </nav>}
    </>
}