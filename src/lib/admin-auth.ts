import { createHmac, timingSafeEqual } from "node:crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserRepository } from "@/lib/user.repository";

const COOKIE_NAME = "leet-dashboard-session";
const SECRET = process.env.DASHBOARD_SESSION_SECRET ?? "leet-dashboard-secret";

export function verifyCredentials(username: string, password: string) {
    const user = UserRepository.getByUsername(username);

    if (!user) {
        return false;
    }

    return bcrypt.compareSync(password, user.password);
}

function createSignedPayload(payload: string) {
    const signature = createHmac("sha256", SECRET)
        .update(payload)
        .digest("hex");

    return `${payload}.${signature}`;
}

function verifySignedPayload(value: string) {
    const [payload, signature] = value.split(".");

    if (!payload || !signature) {
        return false;
    }

    const expected = createHmac("sha256", SECRET)
        .update(payload)
        .digest("hex");

    const expectedBuffer = Buffer.from(expected);
    const providedBuffer = Buffer.from(signature);

    if (expectedBuffer.length !== providedBuffer.length) {
        return false;
    }

    return timingSafeEqual(expectedBuffer, providedBuffer);
}

export function createSessionCookieValue(username: string) {
    return createSignedPayload(username);
}

export function verifySessionCookie(value: string | undefined) {
    if (!value) {
        return false;
    }

    if (!verifySignedPayload(value)) {
        return false;
    }

    const [payload] = value.split(".");

    return Boolean(payload);
}

export function getCookieValue(cookieHeader: string | null | undefined, name: string) {
    if (!cookieHeader) {
        return undefined;
    }

    const cookie = cookieHeader
        .split(";")
        .map((item) => item.trim())
        .find((item) => item.startsWith(`${name}=`));

    return cookie?.split("=")[1];
}

export async function requireAdminSession() {
    const cookieStore = await cookies();
    const value = cookieStore.get(COOKIE_NAME)?.value;

    if (!verifySessionCookie(value)) {
        redirect("/dashboard/login");
    }
}

export async function setAdminSessionCookie(cookieStore: Awaited<ReturnType<typeof cookies>>, username: string) {
    cookieStore.set(COOKIE_NAME, createSessionCookieValue(username), {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 8,
    });
}

export async function clearAdminSessionCookie(cookieStore: Awaited<ReturnType<typeof cookies>>) {
    cookieStore.delete(COOKIE_NAME);
}
