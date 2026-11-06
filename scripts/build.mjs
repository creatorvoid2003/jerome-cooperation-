// Build the site into dist/.
//   npm run build           production
//   npm run build:staging   every page noindex and robots.txt blocks crawlers
import fs from "node:fs";
import path from "node:path";
import { DIST, STATIC, STAGING, OFFLINE, loadConfig } from "../src/lib/config.mjs";
import { layout } from "../src/lib/layout.mjs";
import { hero, section, btn } from "../src/lib/components.mjs";
import { buildPages } from "../src/pages/index.mjs";

const cfg = loadConfig();
const pages = buildPages(cfg);
const BUILT = new Date().toISOString().slice(0, 10);

const CSS = fs.readFileSync(path.join(STATIC, "css/styles.css"), "utf8");
const JS = fs.readFileSync(path.join(STATIC, "js/main.js"), "utf8");

/**
 * Make a page self-contained and location-independent:
 *  - the stylesheet and script are inlined, so a page is styled wherever it is opened;
 *  - every site-root link (href="/about/", src="/assets/og.png") becomes relative to the page,
 *    so the site works in a subfolder or opened from disk;
 *  - in the offline build, folder links point at index.html so double-clicking works.
 * Absolute https:// addresses (canonical, social tags, Google Fonts) are left alone.
 */
function finalize(html, pagePath) {
  html = html
    .replace('<link rel="stylesheet" href="/assets/styles.css">', () => `<style>\n${CSS}</style>`)
    .replace('<script src="/assets/main.js" defer></script>', () => `<script>\n${JS}</script>`);
  if (pagePath === "/404.html") return html; // a 404 is served at any depth, so keep root-relative links
  const dir = pagePath.endsWith("/") ? pagePath : path.posix.dirname(pagePath) + "/";
  return html.replace(/\b(href|src)="(\/(?!\/)[^"]*)"/g, (_, attr, value) => {
    const m = value.match(/^([^#?]*)(.*)$/);
    let target = m[1], rest = m[2];
    let rel = path.posix.relative(dir, target) || ".";
    if (target.endsWith("/")) rel = (rel === "." ? "./" : rel + "/");
    if (OFFLINE && target.endsWith("/")) rel = (rel === "./" ? "" : rel) + "index.html";
    return `${attr}="${rel}${rest}"`;
  });
}

const write = (rel, content) => {
  const f = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content);
};

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(path.join(DIST, "assets"), { recursive: true });

// Pages: /about/ -> dist/about/index.html
for (const page of pages) write(page.path === "/" ? "index.html" : path.join(page.path, "index.html"), finalize(layout(cfg, page), page.path));

// 404
write(
  "404.html",
  finalize(layout(cfg, {
    path: "/404.html",
    title: "Page not found",
    description: "This page does not exist.",
    noindex: true,
    body:
      hero({ eyebrow: "Error 404", title: "That page does not exist", lead: "The link may be old or mistyped. Try the home page or contact us." }) +
      section("light", `<div class="btn-row">${btn("Go to the home page", "/")}${btn("Contact Us", "/contact/", "line-dark")}</div>`),
  }), "/404.html")
);

// Search engine files
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((p) => `  <url><loc>${cfg.siteUrl}${p.path}</loc><lastmod>${BUILT}</lastmod></url>`)
    .join("\n")}\n</urlset>\n`
);
write("robots.txt", STAGING ? "User-agent: *\nDisallow: /\n" : `User-agent: *\nAllow: /\n\nSitemap: ${cfg.siteUrl}/sitemap.xml\n`);

// Static files (the CSS and JS are already inside every page; only images remain)
for (const f of fs.readdirSync(path.join(STATIC, "img"))) fs.copyFileSync(path.join(STATIC, "img", f), path.join(DIST, "assets", f));

console.log(`Built ${pages.length} pages + 404 into ${path.basename(DIST)}/ (${STAGING ? "STAGING: noindex" : OFFLINE ? "OFFLINE: open index.html from the folder" : "production"}).`);
const C = cfg.contact;
if (!C.email && !C.formEndpoint) console.warn("WARNING: no contact.email or contact.formEndpoint in site.config.json, so the forms cannot deliver messages.");
if (!C.email && !C.phone && !C.address) console.warn("NOTE: no public contact details set (email, phone, address). They stay hidden until you add them.");
if (!cfg.legalEntity) console.warn("NOTE: legalEntity is empty. Set it so the footer and legal pages name the registered company.");
if (!cfg.jurisdiction) console.warn("NOTE: jurisdiction is empty. Set it so the Terms name the governing law.");
