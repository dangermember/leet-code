"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { clearAdminSessionCookie, setAdminSessionCookie, verifyCredentials } from "@/lib/admin-auth";

function getBaseUrl() {
    return process.env.APP_URL ?? "http://localhost:3000";
}

async function callAdminApi(path: string, init: RequestInit = {}, body?: unknown) {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; ");

    const headers = new Headers(init.headers);
    if (cookieHeader) {
        headers.set("cookie", cookieHeader);
    }

    if (body !== undefined) {
        headers.set("content-type", "application/json");
    }

    const response = await fetch(`${getBaseUrl()}${path}`, {
        ...init,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
    });

    const data = await response.json().catch(() => undefined);

    if (!response.ok) {
        throw new Error(data?.error ?? "Request failed");
    }

    return data;
}

export async function loginAction(formData: FormData) {
    const username = formData.get("username")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    if (!verifyCredentials(username, password)) {
        redirect("/dashboard/login?error=invalid");
    }

    const cookieStore = await cookies();
    await setAdminSessionCookie(cookieStore, username);
    redirect("/dashboard");
}

export async function logoutAction() {
    const cookieStore = await cookies();
    await clearAdminSessionCookie(cookieStore);
    redirect("/dashboard/login");
}

export async function createProblemAction(formData: FormData) {
    const payload = {
        number: Number(formData.get("number") ?? 0),
        url: formData.get("url")?.toString() ?? "",
        title: formData.get("title")?.toString() ?? "",
        description: formData.get("description")?.toString() ?? "",
        difficulty: formData.get("difficulty")?.toString() ?? "Easy",
        solution: formData.get("solution")?.toString() ?? "",
        runtime: formData.get("runtime") ? Number(formData.get("runtime")) : null,
        memory: formData.get("memory") ? Number(formData.get("memory")) : null,
        major_version: formData.get("major_version") ? Number(formData.get("major_version")) : null,
        minor_version: formData.get("minor_version") ? Number(formData.get("minor_version")) : null,
        path_version: formData.get("path_version") ? Number(formData.get("path_version")) : null,
    };

    await callAdminApi("/api/admin/problems", { method: "POST" }, payload);
    revalidatePath("/dashboard");
    redirect("/dashboard");
}

export async function updateProblemAction(formData: FormData) {
    const id = formData.get("id")?.toString();
    const payload = {
        number: Number(formData.get("number") ?? 0),
        url: formData.get("url")?.toString() ?? "",
        title: formData.get("title")?.toString() ?? "",
        description: formData.get("description")?.toString() ?? "",
        difficulty: formData.get("difficulty")?.toString() ?? "Easy",
        solution: formData.get("solution")?.toString() ?? "",
        runtime: formData.get("runtime") ? Number(formData.get("runtime")) : null,
        memory: formData.get("memory") ? Number(formData.get("memory")) : null,
        major_version: formData.get("major_version") ? Number(formData.get("major_version")) : null,
        minor_version: formData.get("minor_version") ? Number(formData.get("minor_version")) : null,
        path_version: formData.get("path_version") ? Number(formData.get("path_version")) : null,
    };

    if (!id) {
        throw new Error("Missing problem id");
    }

    await callAdminApi(`/api/admin/problems/${id}`, { method: "PUT" }, payload);
    revalidatePath("/dashboard");
    redirect("/dashboard");
}

export async function deleteProblemAction(formData: FormData) {
    const id = formData.get("id")?.toString();

    if (!id) {
        throw new Error("Missing problem id");
    }

    await callAdminApi(`/api/admin/problems/${id}`, { method: "DELETE" });
    revalidatePath("/dashboard");
    redirect("/dashboard");
}
