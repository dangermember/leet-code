import { db } from "@/lib/db";

export interface UserRecord {
    id: number;
    username: string;
    password: string;
    role: string;
}

export class UserRepository {
    static getByUsername(username: string): UserRecord | undefined {
        return db
            .prepare(`
                SELECT id, username, password, role
                FROM users
                WHERE username = ?
                LIMIT 1
            `)
            .get(username) as UserRecord | undefined;
    }

    static create(username: string, password: string, role = "admin") {
        return db
            .prepare(`
                INSERT INTO users (username, password, role)
                VALUES (?, ?, ?)
            `)
            .run(username, password, role);
    }
}
