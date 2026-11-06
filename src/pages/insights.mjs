import { esc, btn, section, hero, cta } from "../lib/components.mjs";

export default function insights(cfg) {
  const n = esc(cfg.name);
  const posts = [...cfg.insights].sort((a, b) => String(b.date).localeCompare(String(a.date)));
  const list = posts.length
    ? `<ul class="posts">${posts
        .map(
          (x) => `<li class="post"><time datetime="${esc(x.date)}">${esc(x.date)}</time><h3>${x.url ? `<a href="${esc(x.url)}">${esc(x.title)}</a>` : esc(x.title)}</h3>${x.summary ? `<p>${esc(x.summary)}</p>` : ""}</li>`
        )
        .join("")}</ul>`
    : `<div class="panel"><h3>Our latest insights and company updates will appear here</h3><p>We're just getting started. As ${n} grows and our portfolio companies launch, we'll share news, insights, and perspectives right here.</p></div>`;

  return {
    path: "/insights/",
    title: "News & Insights",
    description: `Stay up to date with the latest news, insights, and company updates from ${cfg.name}.`,
    body: [
      hero({
        eyebrow: "News &amp; Insights",
        title: "Latest updates and perspectives",
        lead: `Company news, industry insights, and updates from ${n} and our portfolio companies.`,
      }),
      section("light", list),
      cta({
        title: "Want to stay in the loop?",
        text: `Follow our journey as we build ${n}. Get in touch if you'd like to learn more.`,
        buttons: [btn("Contact Us", "/contact/")],
      }),
    ].join("\n"),
  };
}
