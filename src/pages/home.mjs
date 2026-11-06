import { esc, btn, section, head, tiles, hero, cta } from "../lib/components.mjs";
import { companyCards } from "./companies.mjs";

export const VALUES = [
  ["Integrity", "We operate with honesty, accountability, and transparency in everything we do."],
  ["Innovation", "We embrace new ideas, technologies, and better ways of solving problems."],
  ["Excellence", "We strive for high standards in everything we build."],
  ["Growth", "We believe in continuous learning, development, and expansion."],
  ["Responsibility", "We consider the impact of our decisions on people, businesses, and communities."],
  ["Collaboration", "We believe strong partnerships create stronger businesses."],
];

export default function home(cfg) {
  const n = esc(cfg.name);
  const about = `${n} is a parent company focused on building, managing, and supporting businesses with long-term potential across multiple industries.`;

  return {
    path: "/",
    home: true,
    title: cfg.name,
    description: about.replace(n, cfg.name),
    body: [
      hero({
        size: "home",
        eyebrow: "Parent Company · Holding Corporation",
        title: `<span>Building Businesses.</span> <span>Creating Opportunities.</span> <span>Shaping the Future.</span>`,
        lead: about,
        image: cfg.images.home,
        alt: "Modern corporate architecture",
        buttons: [btn("Explore Our Companies", "/companies/"), btn(`About ${n}`, "/about/", "line")],
      }),

      section(
        "light",
        `<div class="split">
<div>
${head({ eyebrow: "Who We Are", title: "A foundation for building multiple businesses" })}
<p class="intro">${n} is a parent company focused on developing and supporting businesses with the potential to create meaningful value, solve real-world problems, and contribute to long-term economic and technological growth.</p>
<p>Rather than operating as a single-service company, ${n} serves as a foundation — a corporate structure designed to own, establish, manage, and develop a portfolio of businesses across diverse industries.</p>
<p><a class="more" href="/about/">Learn more about us</a></p>
</div>
${tiles([
  ["Innovation", "We embrace new ideas, technologies, and better ways of solving problems."],
  ["Responsible Growth", "We pursue expansion thoughtfully, with consideration for long-term impact."],
  ["Long-Term Thinking", "We build with a horizon measured in decades, not quarters."],
  ["Strategic Partnerships", "We believe strong partnerships create stronger businesses."],
], "two")}
</div>`
      ),

      section(
        "dark",
        head({
          eyebrow: "Our Companies",
          title: "Building a portfolio of future businesses",
          intro: `Each subsidiary is an independent business owned or controlled by ${n}, designed to create value in its respective industry.`,
        }) +
          companyCards(cfg) +
          `<p class="after"><a class="more" href="/companies/">View all companies</a></p>`
      ),

      section(
        "light",
        `<div class="split split--vision">
<div>
${head({ eyebrow: "Our Vision", title: "A respected and innovative group of companies" })}
<p class="quote">To build a respected and innovative group of companies that creates lasting value, opportunities, and positive impact across industries and communities.</p>
<p><a class="more" href="/vision/">Read our full vision</a></p>
</div>
<aside class="aside">
<h3>Long-term value across multiple industries</h3>
<p>We measure success not by short-term gains, but by the enduring value we create for businesses, people, and communities.</p>
</aside>
</div>`
      ),

      section(
        "white",
        head({
          eyebrow: "Our Values",
          title: "Principles that guide every decision",
          intro: "Our core values define who we are and how we operate — they are the foundation of every business we build.",
        }) + tiles(VALUES, "three")
      ),

      cta({
        title: "Let's build the future together",
        text: `Whether you're interested in partnering, investing, or exploring business opportunities with ${n}, we'd welcome the conversation.`,
        buttons: [btn("Contact Us", "/contact/"), btn("Explore Careers", "/careers/", "line")],
      }),
    ].join("\n"),
  };
}
