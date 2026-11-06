import { esc, btn, section, head, tiles, hero, cta } from "../lib/components.mjs";

export default function vision(cfg) {
  const steps = [
    ["Now", "Establishing the foundation and identifying initial business opportunities."],
    ["Near Term", "Launching our first subsidiaries and building operational capabilities."],
    ["Mid Term", "Growing our portfolio across multiple industries with proven results."],
    ["Long Term", "A respected group of companies creating lasting value and impact."],
  ];
  return {
    path: "/vision/",
    title: "Our Vision",
    description:
      "Our vision is to build a respected and innovative group of companies that creates lasting value, opportunities, and positive impact across industries and communities.",
    body: [
      hero({
        eyebrow: "Our Vision",
        title: "Building a group of companies that creates lasting value",
        lead: "Our vision guides every decision we make and every business we build.",
        image: cfg.images.vision,
      }),

      section(
        "light",
        `${head({ eyebrow: "Our Vision Statement" })}
<blockquote class="quote quote--big"><p>To build a respected and innovative group of companies that creates lasting value, opportunities, and positive impact across industries and communities.</p></blockquote>`
      ),

      section(
        "white",
        head({
          eyebrow: "What This Means",
          title: "The pillars of our vision",
          intro: "Our vision is built on several key pillars that define what we aspire to achieve as a parent company.",
        }) +
          tiles(
            [
              ["A Group of Companies", "We envision a diversified portfolio of businesses, each a leader in its respective field, united under a common philosophy of excellence."],
              ["Lasting Value", "We are committed to creating value that endures — value measured not in quarters, but in the lasting impact we have on industries and communities."],
              ["Opportunities", "We aim to create opportunities for talented people, partners, and the communities where our businesses operate."],
              ["Positive Impact", "We believe businesses have a responsibility to contribute positively to society and the world around them."],
              ["Innovation", "We strive to be at the forefront of innovation, embracing new technologies and better ways of solving real-world problems."],
              ["Respect", "We aim to earn respect through our actions, our integrity, and the quality of the businesses we build."],
            ],
            "three"
          )
      ),

      section(
        "dark",
        head({
          eyebrow: "Long-Term Thinking",
          title: "Building for decades, not quarters",
          intro:
            "We believe that the most valuable businesses are built with patience and conviction. Our vision is not constrained by short-term expectations — it is rooted in the belief that lasting value requires long-term thinking.",
        }) +
          `<ol class="steps">${steps.map(([t, p], i) => `<li class="step"><span class="step__n" aria-hidden="true">${i + 1}</span><h3>${t}</h3><p>${p}</p></li>`).join("")}</ol>`
      ),

      cta({
        title: "Share our vision?",
        text: "If you're passionate about building businesses with long-term potential, we'd love to connect.",
        buttons: [btn("Contact Us", "/contact/"), btn("Our Mission &amp; Values", "/mission-values/", "line")],
      }),
    ].join("\n"),
  };
}
