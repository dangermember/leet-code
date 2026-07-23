import Link from "next/link";
import AppLogoIcon from "./app-logo-icon";
import { NavBar } from "./nav-bar";

export function Header() {
    return <header className="border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-3 text-white"
                >
                    <AppLogoIcon className="h-8 w-8 text-white" />
                    <span className="text-lg font-semibold">
                        LeetCode Tracker
                    </span>
                </Link>

                <NavBar
                    navClass="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex"
                    navLinkClass="transition hover:text-white" />
            </div>
            <NavBar
                navClass="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 md:hidden"
                navLinkClass="rounded-md px-3 py-2 transition hover:bg-white/10" />
        </div>
    </header>
}