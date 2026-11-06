import { esc, btn, section, head, tiles, hero, cta } from "../lib/components.mjs";

export default function leadership(cfg) {
  const n = esc(cfg.name);
  const profiles = cfg.leadership.length
    ? `<ul class="people">${cfg.leadership
        .map((l) => `<li class="person"><h3>${esc(l.name)}</h3><p class="role">${esc(l.role)}</p>${l.bio ? `<p>${esc(l.bio)}</p>` : ""}</li>`)
        .join("")}</ul>`
    : `<div class="panel"><h3>Leadership profiles coming soon</h3><p>${n} is in its early stages. Leadership profiles will be published here once our team is in place. We are committed to building a team of talented, experienced leaders who share our vision and values.</p></div>`;

  return {
    path: "/leadership/",
    title: "Leadership",
    description: `Meet the leadership team guiding ${cfg.name}. Leadership profiles will be added as our team grows.`,
    body: [
      hero({
        eyebrow: "Leadership",
        title: "Guided by experienced leadership",
        lead: `Our leadership team sets the strategic direction of ${n} and guides the growth of our portfolio companies.`,
      }),
      section("light", profiles),
      section(
        "dark",
        head({
          eyebrow: "Building Our Team",
          title: "What we look for in leaders",
          intro: `As ${n} grows, we seek leaders who embody our values and share our commitment to building businesses with long-term potential.`,
        }) +
          tiles([
            ["Integrity", "Leaders who operate with honesty, accountability, and transparency in all they do."],
            ["Vision", "Leaders who can see beyond the horizon and chart a course toward long-term success."],
            ["Excellence", "Leaders who hold themselves and their teams to the highest standards."],
          ])
      ),
      cta({
        title: "Are you a leader who shares our vision?",
        text: "We're always interested in connecting with talented people. Join our talent network or get in touch directly.",
        buttons: [btn("Join Our Talent Network", "/careers/"), btn("Contact Us", "/contact/", "line")],
      }),
    ].join("\n"),
  };
}
