// The list of every page on the site, in navigation order.
import home from "./home.mjs";
import about from "./about.mjs";
import companies from "./companies.mjs";
import vision from "./vision.mjs";
import missionValues from "./mission-values.mjs";
import leadership from "./leadership.mjs";
import careers from "./careers.mjs";
import insights from "./insights.mjs";
import contact from "./contact.mjs";
import legal from "./legal.mjs";

export function buildPages(cfg) {
  return [home, about, companies, vision, missionValues, leadership, careers, insights, contact, legal].flatMap((fn) => fn(cfg));
}
