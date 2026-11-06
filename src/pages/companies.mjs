// Companies overview and one page per company (company data lives in site.config.json).
import { esc, btn, section, head, tiles, hero, cta } from "../lib/components.mjs";

/** Company cards, used on the home page and the Companies page. */
export function companyCards(cfg) {
  if (!cfg.companies.length) return `<p class="empty">No companies have been added yet.</p>`;
  return `<ul class="cards">${cfg.companies
    .map(
      (c) => `<li class="card">
<p class="tag">${esc(c.status)}</p>
<h3>${esc(c.name)}</h3>
${c.tagline ? `<p class="card__sub">${esc(c.tagline)}</p>` : ""}
<p>${esc(c.summary)}</p>
<a class="more" href="/companies/${esc(c.slug)}/">Learn More<span class="sr"> about ${esc(c.name)}</span></a>
</li>`
    )
    .join("")}</ul>`;
}

export default function companies(cfg) {
  const n = esc(cfg.name);

  const overview = {
    path: "/companies/",
    title: "Our Companies",
    description: `Explore the subsidiaries and businesses owned and managed by ${cfg.name} across multiple industries.`,
    body: [
      hero({
        eyebrow: "Our Companies",
        title: "A growing portfolio of businesses",
        lead: `Each company within ${n} is an independent business designed to create value in its respective industry. New subsidiaries will be added as the company grows.`,
        image: cfg.images.companies,
      }),
      section(
        "light",
        head({
          eyebrow: "Portfolio",
          title: "Current and upcoming businesses",
          intro:
            "Our portfolio is in its early stages. The companies listed below are currently in planning or development. As businesses launch and grow, this section will be updated with detailed information.",
        }) + companyCards(cfg)
      ),
      section(
        "dark",
        head({
          eyebrow: "Our Model",
          title: "How we build and support companies",
          intro:
            "Every subsidiary benefits from the strategic direction, resources, and network of the parent company while maintaining the autonomy to execute on its vision.",
        }) +
          tiles([
            ["Establish", "We identify opportunities and build new businesses from the ground up with dedicated teams and clear strategies."],
            ["Develop", "We provide ongoing strategic direction, capital, and operational support to help each company grow."],
            ["Scale", "We help successful subsidiaries expand their reach, enter new markets, and maximize their impact."],
          ])
      ),
      cta({
        title: "Interested in working with us?",
        text: "Whether you're looking for investment, a strategic partnership, or a business opportunity, we'd welcome the conversation.",
        buttons: [btn("Get in Touch", "/contact/"), btn("About Us", "/about/", "line")],
      }),
    ].join("\n"),
  };

  const details = cfg.companies.map((c) => ({
    path: `/companies/${c.slug}/`,
    title: c.name,
    description: c.summary || `${c.name}, a company of ${cfg.name}.`,
    body: [
      hero({
        back: ["&larr; Back to Our Companies", "/companies/"],
        eyebrow: `<span class="tag">${esc(c.status)}</span>`,
        title: esc(c.name),
        lead: esc(c.tagline || ""),
      }),
      section(
        "light",
        `<div class="split"><div>
<h2>About ${esc(c.name)}</h2>
<p class="intro">${esc(c.about || c.summary)}</p>
</div>
<div>
<h3 class="subhead">Company Details</h3>
<dl class="facts">
<dt>Industry</dt><dd>${esc(c.industry || "To Be Announced")}</dd>
<dt>Status</dt><dd>${esc(c.status)}</dd>
<dt>Parent Company</dt><dd>${n}</dd>
<dt>Website</dt><dd>${c.url ? `<a href="${esc(c.url)}" rel="noopener">${esc(c.url.replace(/^https?:\/\//, ""))}</a>` : "To be announced"}</dd>
</dl>
</div></div>`
      ),
      cta({
        title: "Interested in this company?",
        text: `Get in touch to learn more about this subsidiary or explore opportunities with ${n}.`,
        buttons: [btn("Contact Us", "/contact/"), btn("All Companies", "/companies/", "line")],
      }),
    ].join("\n"),
  }));

  return [overview, ...details];
}
