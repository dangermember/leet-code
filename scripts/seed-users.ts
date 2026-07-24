import bcrypt from "bcryptjs";
import { connection } from "@/lib/db";

const insertUser = connection.prepare(`
    INSERT OR IGNORE INTO users (username, password, role)
    VALUES (?, ?, ?)
`);

insertUser.run(
    "admin",
    bcrypt.hashSync("admin123", 10),
    "admin",
);

console.log("Seeded default admin user.");
