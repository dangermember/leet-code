import Link from "next/link";

import AppLogoIcon from "./app-logo-icon";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

export function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-700/5 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    className="flex items-center gap-3 text-white"
                >
                    <AppLogoIcon className="h-8 w-8 text-white" />
                    <span className="text-lg font-semibold">
                        LeetCode Tracker
                    </span>
                </Link>

                <DesktopNav />
                <MobileNav />
            </div>
        </header>
    );
}