export default function Footer() {
    return (
        <footer className="mt-14 border border-white/10 bg-slate-900/80 p-6 text-slate-400 ring-1 ring-white/5">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                <p>
                    Built to showcase LeetCode progress with performance metrics
                    and problem highlights.
                </p>
                <p>Powered by React, Inertia, and Tailwind CSS.</p>
            </div>
        </footer>
    );
}
