import { NavLinks } from "./nav-links";

export function DesktopNav() {
    return (
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
            <NavLinks className="transition-colors hover:text-white" />
        </nav>
    );
}