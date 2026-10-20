import { Router } from "express";
import crypto from "node:crypto";
import { store } from "../data/store.js";
import { userTypes, pricing } from "../data/catalog.js";

const router = Router();

router.get("/services", (_req, res) => res.json({ userTypes }));
router.get("/pricing", (_req, res) => res.json({ plans: pricing }));

router.post("/contact", (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: "Name, email and message are required." });
  store.insert("messages", {
    id: crypto.randomUUID(),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  });
  res.status(201).json({ ok: true });
});

export default router;
