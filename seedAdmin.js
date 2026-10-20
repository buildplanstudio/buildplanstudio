// Creates the admin (design team) account.  Run:  npm run seed:admin
// Optional env: ADMIN_EMAIL, ADMIN_PASSWORD
import "dotenv/config";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { store } from "./data/store.js";

const email = (process.env.ADMIN_EMAIL || "admin@buildplanstudio.com").toLowerCase();
const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";

if (store.find("users", (u) => u.email === email)) {
  console.log(`Admin ${email} already exists.`);
} else {
  store.insert("users", {
    id: crypto.randomUUID(),
    name: "Studio Admin",
    email,
    passwordHash: bcrypt.hashSync(password, 10),
    role: "admin",
    phone: "",
    company: "Build Plan Studio",
    createdAt: new Date().toISOString(),
  });
  console.log(`Admin created: ${email} / ${password}  (change this password!)`);
}
