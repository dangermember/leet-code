import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import AppLogoIcon from '@/components/app-logo-icon';
import Footer from '@/components/Footer';
import { NavLink } from '@/components/nav-link';
import { home, problems } from '@/routes';

const menuLinks = [
    { label: 'Home', href: home() },
    { label: 'Problems', href: problems() },
    { label: 'Portfolio', href: 'https://mohamedeid.net', external: true },
    {
        label: 'Github',
        href: 'https://github.com/dangermember',
        external: true,
    },
];

export default function GuestLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <header className="border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
                <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <NavLink
                            href={home()}
                            className="flex items-center gap-3 text-white"
                        >
                            <AppLogoIcon className="h-8 w-8 text-white" />
                            <span className="text-lg font-semibold">
                                LeetCode Tracker
                            </span>
                        </NavLink>

                        {/* Desktop navigation */}
                        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
                            {menuLinks.map((link, index) => (
                                <NavLink
                                    key={'nav' + index}
                                    href={link.href}
                                    external={link.external}
                                    className="transition hover:text-white"
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </nav>

                        {/* Mobile menu button */}
                        <button
                            type="button"
                            onClick={() => setOpen(!open)}
                            className="rounded-md p-2 text-slate-300 transition hover:bg-white/10 hover:text-white md:hidden"
                            aria-label="Toggle navigation"
                        >
                            {open ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {/* Mobile navigation */}
                    {open && (
                        <nav className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 md:hidden">
                            {menuLinks.map((link, index) => (
                                <NavLink
                                    key={'nav' + index}
                                    href={link.href}
                                    external={link.external}
                                    className="rounded-md px-3 py-2 transition hover:bg-white/10"
                                    onClick={() => setOpen(false)}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </nav>
                    )}
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                {children}
            </main>

            <Footer />
        </div>
    );
}
