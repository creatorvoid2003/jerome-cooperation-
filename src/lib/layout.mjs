// The page shell: <head>, SEO tags, header, footer.
import { esc } from "./components.mjs";
import { STAGING } from "./config.mjs";

const NAV = [
  ["/", "Home"],
  ["/about/", "About"],
  ["/companies/", "Companies"],
  ["/vision/", "Vision"],
  ["/mission-values/", "Mission & Values"],
  ["/leadership/", "Leadership"],
  ["/careers/", "Careers"],
  ["/insights/", "Insights"],
];

const logo = `<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect x="2" y="20" width="28" height="8" fill="currentColor"/><rect x="2" y="9" width="13" height="8" fill="currentColor"/><rect x="18" y="9" width="12" height="8" fill="none" stroke="#7d9bff" stroke-width="2" stroke-dasharray="3 2.5"/></svg>`;

function orgJsonLd(cfg) {
  const C = cfg.contact;
  const o = { "@context": "https://schema.org", "@type": "Organization", name: cfg.name, url: cfg.siteUrl + "/", description: cfg.description, logo: cfg.siteUrl + "/assets/favicon.svg" };
  if (C.email) o.email = C.email;
  if (C.phone) o.telephone = C.phone;
  if (C.address) o.address = { "@type": "PostalAddress", streetAddress: C.address };
  const same = Object.values(cfg.social).filter(Boolean);
  if (same.length) o.sameAs = same;
  return JSON.stringify(o).replace(/</g, "\\u003c");
}

export function layout(cfg, page) {
  const { path: p, title, description, body, home = false, noindex = false } = page;
  const C = cfg.contact;
  const fullTitle = home ? `${cfg.name} | Building Businesses, Creating Opportunities` : `${title} | ${cfg.name}`;
  const url = cfg.siteUrl + p;
  const robots = STAGING || noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large";
  const current = (href) => (href === "/" ? p === "/" : p === href || p.startsWith(href));

  const navLinks = NAV.map(([href, label]) => `<li><a href="${href}"${current(href) ? ' aria-current="page"' : ""}>${esc(label)}</a></li>`).join("");

  const social = [["linkedin", "LinkedIn"], ["x", "X"], ["facebook", "Facebook"], ["instagram", "Instagram"]]
    .filter(([k]) => cfg.social[k])
    .map(([k, l]) => `<li><a href="${esc(cfg.social[k])}" rel="noopener">${l}</a></li>`)
    .join("");

  const contactBits = [
    C.address && `<span>${esc(C.address)}</span>`,
    C.email && `<a href="mailto:${esc(C.email)}">${esc(C.email)}</a>`,
    C.phone && `<a href="tel:${esc(C.phone.replace(/[^+\d]/g, ""))}">${esc(C.phone)}</a>`,
  ].filter(Boolean);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="${esc(cfg.name)}">
<meta name="robots" content="${robots}">
<meta name="theme-color" content="#0a0f1c">
<link rel="canonical" href="${url}">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_US">
<meta property="og:site_name" content="${esc(cfg.name)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${cfg.siteUrl}/assets/og.png">
<meta property="og:image:alt" content="${esc(cfg.name)}: a parent company building businesses with long-term potential.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${cfg.siteUrl}/assets/og.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=Public+Sans:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/styles.css">
<script type="application/ld+json">${orgJsonLd(cfg)}</script>
</head>
<body>
<a class="skip" href="#main-content">Skip to main content</a>
<header class="site-header"><div class="wrap bar">
<a class="wordmark" href="/" aria-label="${esc(cfg.name)}, home">${logo}<span>${esc(cfg.name)}</span></a>
<button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
<nav class="nav" id="site-nav" aria-label="Main"><ul>${navLinks}</ul><a class="btn btn--solid" href="/contact/"${current("/contact/") ? ' aria-current="page"' : ""}>Contact Us</a></nav>
</div></header>
<main id="main-content">
${body}
</main>
<footer class="site-footer"><div class="wrap">
<div class="foot-grid">
<div class="foot-about">
<a class="wordmark" href="/">${logo}<span>${esc(cfg.name)}</span></a>
<p>${esc(cfg.description)}</p>
${contactBits.length ? `<address>${contactBits.join("")}</address>` : ""}
${social ? `<ul class="social" aria-label="Social media">${social}</ul>` : ""}
</div>
<div><h2>Company</h2><ul><li><a href="/about/">About Us</a></li><li><a href="/companies/">Our Companies</a></li><li><a href="/vision/">Our Vision</a></li><li><a href="/mission-values/">Mission &amp; Values</a></li></ul></div>
<div><h2>Organization</h2><ul><li><a href="/leadership/">Leadership</a></li><li><a href="/careers/">Careers</a></li><li><a href="/insights/">Insights</a></li><li><a href="/contact/">Contact</a></li></ul></div>
<div><h2>Legal</h2><ul><li><a href="/privacy-policy/">Privacy Policy</a></li><li><a href="/terms/">Terms &amp; Conditions</a></li></ul></div>
</div>
<p class="copy">&copy; ${new Date().getFullYear()} ${esc(cfg.legalEntity || cfg.name)}. All rights reserved.</p>
</div></footer>
<script src="/assets/main.js" defer></script>
</body>
</html>
`;
}
