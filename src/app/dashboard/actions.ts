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
    const topicsRaw = formData.get("topics")?.toString() ?? "";
    const topics = topicsRaw.split(",").map((t) => t.trim()).filter(Boolean);

    const payload = {
        number: Number(formData.get("number") ?? 0),
        url: formData.get("url")?.toString() ?? "",
        title: formData.get("title")?.toString() ?? "",
        description: formData.get("description")?.toString() ?? "",
        difficulty: formData.get("difficulty")?.toString() ?? "Easy",
        language: formData.get("language")?.toString() ?? "Python3",
        solution: formData.get("solution")?.toString() ?? "",
        runtime: formData.get("runtime") ? Number(formData.get("runtime")) : null,
        memory: formData.get("memory") ? Number(formData.get("memory")) : null,
        major_version: formData.get("major_version") ? Number(formData.get("major_version")) : null,
        minor_version: formData.get("minor_version") ? Number(formData.get("minor_version")) : null,
        patch_version: formData.get("patch_version") ? Number(formData.get("patch_version")) : null,
        topics,
    };

    await callAdminApi("/api/admin/problems", { method: "POST" }, payload);
    revalidatePath("/dashboard");
    redirect("/dashboard");
}

export async function updateProblemAction(formData: FormData) {
    const id = formData.get("id")?.toString();
    const topicsRaw = formData.get("topics")?.toString() ?? "";
    const topics = topicsRaw.split(",").map((t) => t.trim()).filter(Boolean);

    const payload = {
        number: Number(formData.get("number") ?? 0),
        url: formData.get("url")?.toString() ?? "",
        title: formData.get("title")?.toString() ?? "",
        description: formData.get("description")?.toString() ?? "",
        difficulty: formData.get("difficulty")?.toString() ?? "Easy",
        language: formData.get("language")?.toString() ?? "Python3",
        solution: formData.get("solution")?.toString() ?? "",
        runtime: formData.get("runtime") ? Number(formData.get("runtime")) : null,
        memory: formData.get("memory") ? Number(formData.get("memory")) : null,
        major_version: formData.get("major_version") ? Number(formData.get("major_version")) : null,
        minor_version: formData.get("minor_version") ? Number(formData.get("minor_version")) : null,
        patch_version: formData.get("patch_version") ? Number(formData.get("patch_version")) : null,
        topics,
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

export async function addSolutionAction(formData: FormData) {
    const problemId = Number(formData.get("problem_id") ?? 0);
    if (!problemId) {
        throw new Error("Missing problem_id");
    }

    const { ProblemAdminRepository } = await import("@/lib/problem-admin.repository");

    ProblemAdminRepository.createSolution({
        problemId,
        language: formData.get("language")?.toString() ?? "Python3",
        solution: formData.get("solution")?.toString() ?? "",
        runtime: formData.get("runtime") ? Number(formData.get("runtime")) : null,
        memory: formData.get("memory") ? Number(formData.get("memory")) : null,
        majorVersion: formData.get("major_version") ? Number(formData.get("major_version")) : null,
        minorVersion: formData.get("minor_version") ? Number(formData.get("minor_version")) : null,
        patchVersion: formData.get("patch_version") ? Number(formData.get("patch_version")) : null,
        submitted: formData.get("submitted") === "on" || formData.get("submitted") === "true" || true,
    });

    revalidatePath(`/dashboard/problems/${problemId}/solutions`);
    revalidatePath("/dashboard");
    redirect(`/dashboard/problems/${problemId}/solutions`);
}

export async function updateSolutionByIdAction(formData: FormData) {
    const id = Number(formData.get("id") ?? 0);
    const problemId = Number(formData.get("problem_id") ?? 0);

    if (!id || !problemId) {
        throw new Error("Missing id or problem_id");
    }

    const { ProblemAdminRepository } = await import("@/lib/problem-admin.repository");

    ProblemAdminRepository.updateSolution({
        id,
        language: formData.get("language")?.toString() ?? "Python3",
        solution: formData.get("solution")?.toString() ?? "",
        runtime: formData.get("runtime") ? Number(formData.get("runtime")) : null,
        memory: formData.get("memory") ? Number(formData.get("memory")) : null,
        majorVersion: formData.get("major_version") ? Number(formData.get("major_version")) : null,
        minorVersion: formData.get("minor_version") ? Number(formData.get("minor_version")) : null,
        patchVersion: formData.get("patch_version") ? Number(formData.get("patch_version")) : null,
        submitted: formData.get("submitted") === "on" || formData.get("submitted") === "true",
    });

    revalidatePath(`/dashboard/problems/${problemId}/solutions`);
    revalidatePath("/dashboard");
    redirect(`/dashboard/problems/${problemId}/solutions`);
}

export async function deleteSolutionByIdAction(formData: FormData) {
    const id = Number(formData.get("id") ?? 0);
    const problemId = Number(formData.get("problem_id") ?? 0);

    if (!id || !problemId) {
        throw new Error("Missing id or problem_id");
    }

    const { ProblemAdminRepository } = await import("@/lib/problem-admin.repository");

    ProblemAdminRepository.deleteSolution(id);

    revalidatePath(`/dashboard/problems/${problemId}/solutions`);
    revalidatePath("/dashboard");
    redirect(`/dashboard/problems/${problemId}/solutions`);
}
