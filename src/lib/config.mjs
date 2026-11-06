// Loads site.config.json and the build environment. Everything else imports from here.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const OFFLINE = process.env.BUILD_TARGET === "offline"; // pages open by double-clicking, no web server needed
export const DIST = path.join(ROOT, OFFLINE ? "dist-offline" : "dist");
export const STATIC = path.join(ROOT, "src", "static");
export const STAGING = process.env.BUILD_ENV === "staging";
export const LEGAL_UPDATED = "October 2026";

export function loadConfig() {
  const raw = JSON.parse(fs.readFileSync(path.join(ROOT, "site.config.json"), "utf8"));
  return {
    ...raw,
    siteUrl: String(raw.siteUrl || "").replace(/\/+$/, ""),
    contact: { email: "", phone: "", address: "", formEndpoint: "", responseTime: "", ...(raw.contact || {}) },
    social: { linkedin: "", x: "", facebook: "", instagram: "", ...(raw.social || {}) },
    images: raw.images || {},
    companies: Array.isArray(raw.companies) ? raw.companies : [],
    leadership: Array.isArray(raw.leadership) ? raw.leadership : [],
    insights: Array.isArray(raw.insights) ? raw.insights : [],
    retentionMonths: Number(raw.retentionMonths) || 24,
  };
}
