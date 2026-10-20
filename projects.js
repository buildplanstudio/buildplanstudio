import { Router } from "express";
import crypto from "node:crypto";
import { store } from "../data/store.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { userTypes, projectStatuses } from "../data/catalog.js";

const router = Router();
router.use(requireAuth);

// Create a project request: the user shares ideas, our team prepares the plan.
router.post("/", (req, res) => {
  const { title, ideas, services, location = "", budget = "", plotSize = "" } = req.body || {};
  if (!title || !ideas) return res.status(400).json({ error: "Title and your ideas are required." });

  const type = userTypes.find((t) => t.id === req.user.role);
  const allowed = type ? type.services.map((s) => s.id) : [];
  const chosen = (services || []).filter((s) => allowed.includes(s));
  if (chosen.length === 0) return res.status(400).json({ error: "Select at least one service." });

  const project = store.insert("projects", {
    id: crypto.randomUUID(),
    ownerId: req.user.id,
    ownerRole: req.user.role,
    title,
    ideas,
    services: chosen,
    location,
    budget,
    plotSize,
    status: "submitted",
    createdAt: new Date().toISOString(),
    updates: [{ at: new Date().toISOString(), note: "Request received. Our team will review your ideas." }],
  });
  res.status(201).json({ project });
});

// My projects (admins see every project)
router.get("/", (req, res) => {
  const list =
    req.user.role === "admin"
      ? store.all("projects")
      : store.filter("projects", (p) => p.ownerId === req.user.id);
  res.json({ projects: list.sort((a, b) => b.createdAt.localeCompare(a.createdAt)) });
});

router.get("/:id", (req, res) => {
  const p = store.find("projects", (x) => x.id === req.params.id);
  if (!p || (p.ownerId !== req.user.id && req.user.role !== "admin"))
    return res.status(404).json({ error: "Project not found." });
  res.json({ project: p });
});

// Admin (our design team) updates status and posts progress notes.
router.patch("/:id/status", requireAdmin, (req, res) => {
  const { status, note } = req.body || {};
  if (!projectStatuses.includes(status)) return res.status(400).json({ error: "Invalid status." });
  const p = store.find("projects", (x) => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: "Project not found." });
  const updated = store.update("projects", p.id, {
    status,
    updates: [...p.updates, { at: new Date().toISOString(), note: note || `Status changed to ${status}.` }],
  });
  res.json({ project: updated });
});

export default router;
