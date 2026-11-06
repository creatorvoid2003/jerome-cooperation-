import { esc, btn, section, head, tiles, hero, cta } from "../lib/components.mjs";

export default function about(cfg) {
  const n = esc(cfg.name);
  return {
    path: "/about/",
    title: "About Us",
    description: `Learn about ${cfg.name}, a parent company that creates, owns, develops, manages, and supports businesses across multiple industries.`,
    body: [
      hero({
        eyebrow: `About ${n}`,
        title: "Building businesses with long-term potential",
        lead: `${n} is a parent company designed to own, establish, manage, and develop multiple businesses and subsidiaries across different industries.`,
        image: cfg.images.about,
      }),

      section(
        "light",
        `<div class="split">
<div>
${head({ eyebrow: "Who We Are", title: "A parent company, not a single-service business" })}
<p class="intro">${n} is a parent company focused on developing and supporting businesses with the potential to create meaningful value, solve real-world problems, and contribute to long-term economic and technological growth.</p>
<p>Unlike a traditional company that operates in a single industry, ${n} is structured as a holding corporation — a parent entity that owns, manages, and supports a portfolio of businesses across diverse sectors.</p>
<p>This structure allows us to identify opportunities in multiple industries, allocate resources strategically, and build companies that are designed to last. Each subsidiary operates with autonomy while benefiting from the shared resources, expertise, and strategic direction of the parent company.</p>
</div>
<div class="glance">
<h3 class="subhead">At a Glance</h3>
<dl class="facts">
<dt>Company Type</dt><dd>Parent Company</dd>
<dt>Focus</dt><dd>Multi-Industry</dd>
<dt>Subsidiaries</dt><dd>In Development</dd>
<dt>Approach</dt><dd>Long-Term Value</dd>
</dl>
</div>
</div>`
      ),

      section(
        "dark",
        head({
          eyebrow: "What We Do",
          title: "Create, own, develop, manage, and support",
          intro: `${n} is actively involved in every stage of a business lifecycle — from inception to ongoing growth and development.`,
        }) +
          tiles([
            ["Create", "We establish new businesses from the ground up, identifying opportunities and building teams to pursue them."],
            ["Own", "We hold and manage equity in businesses, providing the capital and oversight needed for sustainable growth."],
            ["Develop", "We actively develop our companies, providing strategic direction and operational support."],
            ["Support", "We give our subsidiaries the resources, networks, and guidance they need to succeed."],
          ])
      ),

      section(
        "white",
        head({
          eyebrow: "Our Approach",
          title: "How we think about building businesses",
          intro: "Our approach is grounded in principles that prioritize lasting value over short-term gains.",
        }) +
          tiles(
            [
              ["Innovation", "We embrace new ideas, technologies, and better ways of solving problems."],
              ["Responsible Growth", "We pursue expansion thoughtfully, with consideration for long-term impact."],
              ["Long-Term Thinking", "We build with a horizon measured in decades, not quarters."],
              ["Strong Leadership", "We invest in capable leaders who share our vision and values."],
              ["Strategic Partnerships", "We believe strong partnerships create stronger businesses."],
              ["Sustainable Value Creation", "We focus on creating value that endures across cycles and generations."],
            ],
            "three"
          )
      ),

      section(
        "light",
        `<div class="split split--text">
${head({ eyebrow: "Our Future", title: "Building a portfolio of successful businesses" })}
<div>
<p class="intro">${n} aims to build a portfolio of successful businesses across multiple industries — each one solving meaningful problems and creating lasting value.</p>
<p>As we grow, we will continue to identify new opportunities, establish new companies, and support our existing subsidiaries in achieving their full potential. The architecture of ${n} is designed to scale — allowing new businesses to be added without disrupting the existing structure.</p>
</div>
</div>`
      ),

      cta({
        title: "Want to learn more about what we do?",
        text: "Explore our current companies or get in touch to start a conversation.",
        buttons: [btn("Our Companies", "/companies/"), btn("Contact Us", "/contact/", "line")],
      }),
    ].join("\n"),
  };
}
