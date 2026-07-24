import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

const insertUser = db.prepare(`
    INSERT OR IGNORE INTO users (username, password, role)
    VALUES (@username, @password, @role)
`);

insertUser.run({
    username: "admin",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin",
});

console.log("Seeded default admin user.");
