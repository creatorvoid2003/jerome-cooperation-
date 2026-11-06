import { btn, section, head, tiles, hero, cta } from "../lib/components.mjs";
import { VALUES } from "./home.mjs";

export default function missionValues() {
  return {
    path: "/mission-values/",
    title: "Mission & Values",
    description:
      "Our mission is to create, develop, and support businesses that solve meaningful problems, embrace innovation, create opportunities, and deliver sustainable long-term value.",
    body: [
      hero({
        eyebrow: "Mission &amp; Values",
        title: "What drives us forward",
        lead: "Our mission and values are the foundation of every business we build and every decision we make.",
      }),

      section(
        "light",
        `${head({ eyebrow: "Our Mission" })}
<blockquote class="quote quote--big"><p>To create, develop, and support businesses that solve meaningful problems, embrace innovation, create opportunities, and deliver sustainable long-term value.</p></blockquote>`
      ),

      section(
        "dark",
        head({ eyebrow: "How We Fulfill Our Mission", title: "Four commitments that define our work" }) +
          tiles([
            ["Create", "We identify meaningful problems and build businesses designed to solve them."],
            ["Develop", "We nurture our companies with the resources, guidance, and strategic direction they need to grow."],
            ["Support", "We stand behind our subsidiaries with capital, expertise, and a network of partnerships."],
            ["Deliver", "We measure our success by the sustainable, long-term value we create for all stakeholders."],
          ])
      ),

      section(
        "white",
        head({
          eyebrow: "Core Values",
          title: "Principles that guide every decision",
          intro:
            "Our values are not aspirational slogans — they are the principles we use to make decisions, evaluate opportunities, and measure our success.",
        }) + tiles(VALUES, "three")
      ),

      cta({
        title: "Share our values?",
        text: "If our mission and values resonate with you, we'd welcome a conversation about how we might work together.",
        buttons: [btn("Contact Us", "/contact/"), btn("Our Vision", "/vision/", "line")],
      }),
    ].join("\n"),
  };
}
