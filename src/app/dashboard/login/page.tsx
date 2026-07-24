import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifySessionCookie, verifyCredentials, setAdminSessionCookie } from "@/lib/admin-auth";

export default async function LoginPage({
    searchParams,
}: Readonly<{
    searchParams?: Promise<{ error?: string }>;
}>) {
    const cookieStore = await cookies();
    const session = cookieStore.get("leet-dashboard-session")?.value;

    if (verifySessionCookie(session)) {
        redirect("/dashboard");
    }

    const params = await searchParams;
    const error = params?.error === "invalid" ? "Invalid credentials" : "";

    async function handleSubmit(formData: FormData) {
        "use server";

        const username = formData.get("username")?.toString() ?? "";
        const password = formData.get("password")?.toString() ?? "";

        if (!verifyCredentials(username, password)) {
            redirect("/dashboard/login?error=invalid");
        }

        const cookieStore = await cookies();
        await setAdminSessionCookie(cookieStore, username);
        redirect("/dashboard");
    }

    return (
        <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center px-4 py-12">
            <div className="w-full rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
                <h1 className="text-2xl font-semibold text-white">Admin dashboard</h1>
                <p className="mt-2 text-sm text-slate-400">Sign in to manage problems.</p>
                <form action={handleSubmit} className="mt-8 space-y-4">
                    <div>
                        <label className="mb-2 block text-sm text-slate-300" htmlFor="username">Username</label>
                        <input id="username" name="username" className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none" />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm text-slate-300" htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none" />
                    </div>
                    {error ? <p className="text-sm text-rose-400">{error}</p> : null}
                    <button type="submit" className="w-full rounded-2xl bg-sky-500 px-4 py-3 font-semibold text-slate-950">Sign in</button>
                </form>
            </div>
        </div>
    );
}
