'use client'
import { menuLinks } from "@/types/constants";
import Link from "next/link";
import { useState } from "react";
import { X, Menu} from "lucide-react";

interface NavBarProps {
    navLinkClass: string;
    navClass: string;
    isDrawer?: boolean;
}

export function NavBar({ navLinkClass, navClass, isDrawer = false }: Readonly<NavBarProps>) {
    const [open, setOpen] = useState(false);
    return <>
        {/* Desktop navigation */}
        <nav className={`${isDrawer === true && open ? "hidden" : ""} ${navClass}`}>
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
        </nav>

        {/* Mobile menu button */}
        <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className={`${isDrawer === true ? "hidden" : ""} rounded-md p-2 text-slate-300 transition hover:bg-white/10 hover:text-white md:hidden`}
            aria-label="Toggle navigation"
        >
            {open ? (
                <X className="h-6 w-6" />
            ) : (
                <Menu className="h-6 w-6" />
            )}
        </button>
    </>
}