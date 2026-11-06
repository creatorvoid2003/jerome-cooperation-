// Local admin for the Jerome Co-operations site.
//   npm run admin                       -> http://localhost:4174/
//   ADMIN_PASSWORD=secret npm run admin -> same, behind a password (user name: admin)
// Edits site.config.json, keeps timestamped backups in .backups/, and rebuilds dist/.
// Listens on 127.0.0.1 only. This is not part of the published site.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const CONFIG = path.join(ROOT, "site.config.json");
const BACKUPS = path.join(ROOT, ".backups");
const PORT = Number(process.env.ADMIN_PORT || 4174);
const PREVIEW_PORT = Number(process.env.PORT || 4173);
const PASSWORD = process.env.ADMIN_PASSWORD || "";

/* ---------------- validation ---------------- */

const str = (v, max = 400) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const HTTPS = /^https:\/\/[^\s/$.?#][^\s]*$/i;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

export function sanitize(input) {
  const errors = [];
  const bad = (field, msg) => errors.push({ field, msg });
  const i = input && typeof input === "object" ? input : {};
  const c = i.contact || {};
  const s = i.social || {};

  const out = {
    name: str(i.name, 120),
    siteUrl: str(i.siteUrl, 200).replace(/\/+$/, ""),
    description: str(i.description, 300),
    legalEntity: str(i.legalEntity, 160),
    jurisdiction: str(i.jurisdiction, 120),
    contact: {
      email: str(c.email, 200),
      phone: str(c.phone, 40),
      address: str(c.address, 300),
      formEndpoint: str(c.formEndpoint, 400),
      responseTime: str(c.responseTime, 200),
    },
    social: { linkedin: str(s.linkedin, 400), x: str(s.x, 400), facebook: str(s.facebook, 400), instagram: str(s.instagram, 400) },
    retentionMonths: Math.round(Number(i.retentionMonths)),
    images: {},
    companies: [],
    leadership: [],
    insights: [],
  };

  if (!out.name) bad("name", "Enter the company name.");
  if (!HTTPS.test(out.siteUrl)) bad("siteUrl", "Enter the site address starting with https://.");
  if (!out.description) bad("description", "Enter a one-sentence description.");
  if (out.contact.email && !EMAIL.test(out.contact.email)) bad("contact.email", "Enter an email address like name@example.com.");
  if (out.contact.formEndpoint && !HTTPS.test(out.contact.formEndpoint)) bad("contact.formEndpoint", "Enter the form service address starting with https://.");
  for (const k of Object.keys(out.social)) if (out.social[k] && !HTTPS.test(out.social[k])) bad("social." + k, "Enter a full address starting with https://.");
  const im = i.images || {};
  for (const k of ["home", "about", "companies", "vision", "careers", "contact"]) {
    out.images[k] = str(im[k], 600);
    if (out.images[k] && !HTTPS.test(out.images[k])) bad("images." + k, "Enter a full image address starting with https://.");
  }
  if (!(out.retentionMonths >= 1 && out.retentionMonths <= 120)) bad("retentionMonths", "Enter a number of months between 1 and 120.");

  const seen = new Set();
  (Array.isArray(i.companies) ? i.companies : []).slice(0, 50).forEach((x, n) => {
    const co = { slug: str(x?.slug, 60).toLowerCase(), name: str(x?.name, 120), tagline: str(x?.tagline, 160), status: str(x?.status, 40) || "Coming Soon", industry: str(x?.industry, 120) || "To Be Announced", summary: str(x?.summary, 400), about: str(x?.about, 1200), url: str(x?.url, 400) };
    if (!co.name) bad(`companies.${n}.name`, "Enter the company name.");
    if (!SLUG.test(co.slug)) bad(`companies.${n}.slug`, "Use lowercase letters, numbers and hyphens only.");
    else if (seen.has(co.slug)) bad(`companies.${n}.slug`, "Another company already uses this page address.");
    seen.add(co.slug);
    if (co.url && !HTTPS.test(co.url)) bad(`companies.${n}.url`, "Enter a full address starting with https://.");
    out.companies.push(co);
  });
  (Array.isArray(i.leadership) ? i.leadership : []).slice(0, 50).forEach((x, n) => {
    const p = { name: str(x?.name, 120), role: str(x?.role, 120), bio: str(x?.bio, 800) };
    if (!p.name) bad(`leadership.${n}.name`, "Enter the person's name.");
    if (!p.role) bad(`leadership.${n}.role`, "Enter the person's role.");
    out.leadership.push(p);
  });
  (Array.isArray(i.insights) ? i.insights : []).slice(0, 100).forEach((x, n) => {
    const p = { date: str(x?.date, 10), title: str(x?.title, 200), summary: str(x?.summary, 600), url: str(x?.url, 400) };
    if (!DATE.test(p.date)) bad(`insights.${n}.date`, "Enter a date like 2026-10-13.");
    if (!p.title) bad(`insights.${n}.title`, "Enter a title.");
    if (p.url && !HTTPS.test(p.url) && !p.url.startsWith("/")) bad(`insights.${n}.url`, "Enter a full address starting with https://.");
    out.insights.push(p);
  });
  return { config: out, errors };
}

/* ---------------- server ---------------- */

function runBuild(env) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, ["scripts/build.mjs"], { cwd: ROOT, env: { ...process.env, BUILD_ENV: env === "staging" ? "staging" : "production" } });
    let log = "";
    child.stdout.on("data", (d) => (log += d));
    child.stderr.on("data", (d) => (log += d));
    child.on("close", (code) => resolve({ ok: code === 0, log: log.trim() }));
  });
}

function authorized(req) {
  if (!PASSWORD) return true;
  const h = req.headers.authorization || "";
  if (!h.startsWith("Basic ")) return false;
  const given = Buffer.from(h.slice(6), "base64").toString().split(":").slice(1).join(":");
  const a = crypto.createHash("sha256").update(given).digest();
  const b = crypto.createHash("sha256").update(PASSWORD).digest();
  return crypto.timingSafeEqual(a, b);
}

const send = (res, code, body, type = "application/json") => {
  res.writeHead(code, { "Content-Type": type + (type.startsWith("text") ? "; charset=utf-8" : ""), "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
  res.end(typeof body === "string" || Buffer.isBuffer(body) ? body : JSON.stringify(body));
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = http.createServer(async (req, res) => {
    // Only answer requests addressed to localhost (blocks DNS-rebinding tricks).
    const host = (req.headers.host || "").split(":")[0];
    if (host !== "127.0.0.1" && host !== "localhost") return send(res, 403, { error: "Forbidden host" });
    if (!authorized(req)) {
      res.writeHead(401, { "WWW-Authenticate": 'Basic realm="Site admin"' });
      return res.end("Password required");
    }
    const url = new URL(req.url, "http://x");

    if (req.method === "GET" && url.pathname === "/") return send(res, 200, fs.readFileSync(path.join(HERE, "index.html")), "text/html");
    if (req.method === "GET" && url.pathname === "/api/config") {
      return send(res, 200, { config: JSON.parse(fs.readFileSync(CONFIG, "utf8")), previewPort: PREVIEW_PORT, passwordProtected: !!PASSWORD });
    }
    if (req.method === "POST" && url.pathname === "/api/config") {
      // A custom header can't be sent cross-origin without a preflight, which we never allow.
      if (req.headers["x-admin"] !== "1" || !String(req.headers["content-type"] || "").startsWith("application/json")) return send(res, 400, { error: "Bad request" });
      let raw = "";
      for await (const chunk of req) { raw += chunk; if (raw.length > 500_000) return send(res, 413, { error: "Too large" }); }
      let body;
      try { body = JSON.parse(raw); } catch { return send(res, 400, { error: "Invalid JSON" }); }
      const { config, errors } = sanitize(body.config);
      if (errors.length) return send(res, 422, { ok: false, errors });
      fs.mkdirSync(BACKUPS, { recursive: true });
      const stamp = new Date().toISOString().replace(/[:.]/g, "-");
      fs.copyFileSync(CONFIG, path.join(BACKUPS, `site.config.${stamp}.json`));
      for (const old of fs.readdirSync(BACKUPS).sort().slice(0, -30)) fs.rmSync(path.join(BACKUPS, old));
      fs.writeFileSync(CONFIG, JSON.stringify(config, null, 2) + "\n");
      const build = await runBuild(body.env);
      return send(res, 200, { ok: build.ok, log: build.log, config });
    }
    send(res, 404, { error: "Not found" });
  });

  server.listen(PORT, "127.0.0.1", () => {
    console.log(`Admin:   http://127.0.0.1:${PORT}/${PASSWORD ? "  (user: admin, password from ADMIN_PASSWORD)" : "  (no password set; local access only)"}`);
    // Start the preview server so "Open preview" works.
    const prev = spawn(process.execPath, ["scripts/preview.mjs", String(PREVIEW_PORT)], { cwd: ROOT, stdio: "ignore" });
    prev.on("error", () => {});
    process.on("exit", () => prev.kill());
    console.log(`Preview: http://localhost:${PREVIEW_PORT}/`);
  });
}
