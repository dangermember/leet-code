import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import Footer from '@/components/Footer';
import { home, problems } from '@/routes';

export default function GuestLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <header className="border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href={home()} className="flex items-center gap-3 text-white">
                        <AppLogoIcon className="h-8 w-8 text-white" />
                        <span className="text-lg font-semibold">LeetCode Tracker</span>
                    </Link>

                    <nav className="flex items-center gap-4 text-sm font-medium text-slate-300">
                        <Link href={home()} className="transition hover:text-white">
                            Home
                        </Link>
                        <Link href={problems()} className="transition hover:text-white">
                            Problems
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                {children}
            </main>

            <Footer />
        </div>
    );
}
