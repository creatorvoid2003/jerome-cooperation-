import { esc, btn, section, head, tiles, hero, cta, field, form } from "../lib/components.mjs";

export const AREAS = [
  ["Technology", "Software, infrastructure, data, and emerging technologies."],
  ["Business", "Strategy, business development, and corporate operations."],
  ["Operations", "Process, logistics, and organizational effectiveness."],
  ["Finance", "Financial planning, analysis, and capital management."],
  ["Marketing", "Brand, communications, and growth strategy."],
  ["Design", "Product design, user experience, and visual identity."],
  ["Research", "Market research, analysis, and emerging opportunity identification."],
  ["Management", "Leadership roles across our portfolio companies."],
];

export default function careers(cfg) {
  const n = esc(cfg.name);
  return {
    path: "/careers/",
    title: "Careers",
    description: "Build the future with " + cfg.name + ". Join our talent network and be the first to know about opportunities as our portfolio of companies grows.",
    body: [
      hero({
        eyebrow: "Careers",
        title: "Build the Future With Us",
        lead: `${n} intends to build a team of talented people as the company grows. Join our talent network to be the first to know about opportunities.`,
        image: cfg.images.careers,
      }),

      section(
        "light",
        head({
          eyebrow: "Potential Areas",
          title: "Where you might fit",
          intro: "As our portfolio of companies grows, opportunities may arise across a wide range of disciplines. Here are some of the areas where we expect to build teams.",
        }) + tiles(AREAS, "four")
      ),

      section(
        "white",
        `<div class="split split--form">
<div>
${head({
  eyebrow: "Join Our Talent Network",
  title: "Stay connected as we grow",
  intro: "We don't have open positions yet, but we're always interested in meeting talented people. Join our talent network and we'll reach out when relevant opportunities arise.",
})}
<p>Be the first to know about new opportunities across our portfolio.</p>
<p>Tell us about your skills, interests, and career aspirations.</p>
<p>We respect your privacy — your information will never be shared.</p>
</div>
${form(cfg, {
  kind: "talent",
  submit: "Join Talent Network",
  success: "Thanks. You are in the talent network, and we will be in touch when a role fits.",
  note: "We will only use your information to contact you about relevant opportunities.",
  fields: [
    field({ id: "t-name", name: "name", label: "Full Name", noun: "your full name", required: true, autocomplete: "name" }),
    field({ id: "t-email", name: "email", label: "Email", noun: "your email address", type: "email", required: true, autocomplete: "email" }),
    field({ id: "t-area", name: "area", label: "Area of Interest", noun: "an area of interest", required: true, options: AREAS.map(([a]) => a), placeholder: "Select an area" }),
    field({ id: "t-phone", name: "phone", label: "Phone", type: "tel", autocomplete: "tel" }),
    field({ id: "t-link", name: "linkedin", label: "LinkedIn Profile URL", type: "url" }),
    field({ id: "t-note", name: "message", label: "Tell us about yourself", rows: 5 }),
  ],
})}
</div>`
      ),

      cta({
        title: `Questions about careers at ${n}?`,
        text: "We're happy to answer any questions you may have about working with us.",
        buttons: [btn("Contact Us", "/contact/")],
      }),
    ].join("\n"),
  };
}
