import { db } from "@/lib/db";

const insertUser = db.prepare(`
    INSERT OR IGNORE INTO users (username, password, role)
    VALUES (@username, @password, @role)
`);

insertUser.run({
    username: "admin",
    password: "admin123",
    role: "admin",
});

console.log("Seeded default admin user.");
