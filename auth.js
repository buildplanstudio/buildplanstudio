import { Router } from "express";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { store } from "../data/store.js";
import { signToken, requireAuth } from "../middleware/auth.js";

const router = Router();
const USER_TYPES = ["client", "builder", "architect"];

const publicUser = (u) => ({ id: u.id, name: u.name, email: u.email, role: u.role, phone: u.phone, company: u.company });

router.post("/signup", (req, res) => {
  const { name, email, password, role, phone = "", company = "" } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ error: "Name, email and password are required." });
  if (password.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters." });
  if (!USER_TYPES.includes(role)) return res.status(400).json({ error: "Choose client, builder or architect." });
  if (store.find("users", (u) => u.email === email.toLowerCase()))
    return res.status(409).json({ error: "An account with this email already exists." });

  const user = store.insert("users", {
    id: crypto.randomUUID(),
    name,
    email: email.toLowerCase(),
    passwordHash: bcrypt.hashSync(password, 10),
    role,
    phone,
    company,
    createdAt: new Date().toISOString(),
  });
  res.status(201).json({ token: signToken(user), user: publicUser(user) });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  const user = store.find("users", (u) => u.email === (email || "").toLowerCase());
  if (!user || !bcrypt.compareSync(password || "", user.passwordHash))
    return res.status(401).json({ error: "Wrong email or password." });
  res.json({ token: signToken(user), user: publicUser(user) });
});

router.get("/me", requireAuth, (req, res) => {
  const user = store.find("users", (u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: "User not found." });
  res.json({ user: publicUser(user) });
});

export default router;
