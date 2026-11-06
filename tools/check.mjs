// Quality checks on the built site:  npm run check
// (checks dist/, or dist-offline/ when run with BUILD_TARGET=offline)
// Verifies, for every page: the CSS is built in, every link and image resolves from where the
// page sits, exactly one h1, unique ids, canonical = og:url, and no placeholder text in the footer.
import fs from "node:fs";
import path from "node:path";
import { DIST } from "../src/lib/config.mjs";

const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : files.push(p); } })(DIST);
const pages = files.filter((f) => f.endsWith(".html"));
let problems = 0;
const fail = (m) => { problems++; console.log("  FAIL " + m); };

for (const f of pages) {
  const rel = path.relative(DIST, f);
  const h = fs.readFileSync(f, "utf8");
  const is404 = rel === "404.html";

  if (!/<style>[\s\S]{2000,}<\/style>/.test(h)) fail(`${rel}: stylesheet is not built into the page`);
  if (/rel="stylesheet" href="[^"]*styles\.css"/.test(h)) fail(`${rel}: still links an external styles.css`);

  for (const m of h.matchAll(/\b(?:href|src)="([^"#?]+)/g)) {
    const link = m[1];
    if (/^(https?:|mailto:|tel:|data:|javascript:)/.test(link)) continue;
    if (!is404 && link.startsWith("/")) { fail(`${rel}: root-relative link ${link} (breaks in a subfolder or from disk)`); continue; }
    const target = link.startsWith("/") ? path.join(DIST, link) : path.resolve(path.dirname(f), link);
    const ok = fs.existsSync(target) && (fs.statSync(target).isFile() || fs.existsSync(path.join(target, "index.html")));
    if (!ok) fail(`${rel}: broken link ${link}`);
  }

  const h1 = (h.match(/<h1[ >]/g) || []).length;
  if (h1 !== 1) fail(`${rel}: ${h1} h1 elements`);
  const ids = h.match(/ id="[^"]+"/g) || [];
  const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (dup.length) fail(`${rel}: duplicate ids ${dup.join(", ")}`);
  const ogu = h.match(/property="og:url" content="([^"]*)"/)?.[1], can = h.match(/rel="canonical" href="([^"]*)"/)?.[1];
  if (!can) fail(`${rel}: no canonical`);
  else if (ogu !== can) fail(`${rel}: og:url (${ogu}) differs from canonical (${can})`);
  if (/to be announced<\/(span|p|dd|a)>\s*<\/address>/i.test(h)) fail(`${rel}: placeholder in footer`);
}
const titles = pages.map((f) => fs.readFileSync(f, "utf8").match(/<title>(.*?)<\/title>/)?.[1]);
if (new Set(titles).size !== titles.length) fail("duplicate <title> across pages");
for (const need of ["sitemap.xml", "robots.txt", "404.html", "assets/favicon.svg", "assets/og.png"]) if (!fs.existsSync(path.join(DIST, need))) fail("missing " + need);

console.log(problems ? `\n${problems} problem(s) found in ${path.basename(DIST)}/.` : `OK: ${pages.length} pages checked in ${path.basename(DIST)}/, no problems.`);
process.exit(problems ? 1 : 0);
