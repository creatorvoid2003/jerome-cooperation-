// Small HTML helpers shared by every page.

export const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** A link styled as a button. kind: "solid" | "line" */
export const btn = (label, href, kind = "solid") => `<a class="btn btn--${kind}" href="${href}">${label}</a>`;

/** Wrap content in a full-width section. tone: "light" | "white" | "dark" */
export const section = (tone, inner, id = "") =>
  `<section class="section s-${tone}"${id ? ` id="${id}"` : ""}><div class="wrap">${inner}</div></section>`;

/** Small label, heading and optional intro paragraph. */
export const head = ({ eyebrow, title, intro }) =>
  title
    ? `<header class="head">${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}<h2>${title}</h2>${intro ? `<p class="intro">${intro}</p>` : ""}</header>`
    : `<header class="head"><h2 class="eyebrow">${eyebrow}</h2></header>`; // label-only heading, as on the original Vision and Mission pages

/** A grid of titled blurbs. */
export const tiles = (items, cols = "") =>
  `<ul class="tiles${cols ? " tiles--" + cols : ""}">${items.map(([t, p]) => `<li class="tile"><h3>${t}</h3><p>${p}</p></li>`).join("")}</ul>`;

/**
 * Page hero. With an image: photo behind a navy overlay (decorative, so empty alt).
 * Without one: a plain navy band.
 */
export function hero({ eyebrow, title, lead, image, alt = "", buttons = [], size = "page", back }) {
  const media = image
    ? `<div class="hero__media" aria-hidden="true"><img src="${esc(image)}" alt="${esc(alt)}" width="1920" height="1080" ${size === "home" ? 'fetchpriority="high"' : 'loading="eager"'} decoding="async" onerror="this.parentNode.remove()"></div>`
    : "";
  return `<header class="hero hero--${size}${image ? " has-image" : ""}">${media}<div class="wrap hero__inner">
${back ? `<a class="back" href="${back[1]}">${back[0]}</a>` : ""}
${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
<h1>${title}</h1>
${lead ? `<p class="lead">${lead}</p>` : ""}
${buttons.length ? `<div class="btn-row">${buttons.join("")}</div>` : ""}
</div></header>`;
}

/** Closing call to action band. */
export const cta = ({ title, text, buttons }) =>
  `<section class="section s-cta"><div class="wrap cta"><h2>${title}</h2><p class="intro">${text}</p><div class="btn-row">${buttons.join("")}</div></div></section>`;

/* ---------------- forms ---------------- */

export function field({ id, name, label, noun, type = "text", required = false, options, placeholder = "Select an option", rows, autocomplete }) {
  const req = required ? "required" : "";
  const star = required ? ` <span aria-hidden="true">*</span>` : "";
  const dl = `data-label="${esc(noun || label.toLowerCase())}"`;
  let control;
  if (options) {
    control = `<select id="${id}" name="${name}" ${req} ${dl} aria-describedby="${id}-err"><option value="">${esc(placeholder)}</option>${options.map((o) => `<option>${esc(o)}</option>`).join("")}</select>`;
  } else if (rows) {
    control = `<textarea id="${id}" name="${name}" rows="${rows}" ${req} ${dl} aria-describedby="${id}-err"></textarea>`;
  } else {
    control = `<input id="${id}" name="${name}" type="${type}" ${req} ${dl} ${autocomplete ? `autocomplete="${autocomplete}"` : ""} aria-describedby="${id}-err">`;
  }
  return `<div class="field"><label for="${id}">${esc(label)}${star}</label>${control}<p class="err" id="${id}-err" hidden></p></div>`;
}

export function form(cfg, { kind, fields, submit, success, note }) {
  const C = cfg.contact;
  return `<div class="form-wrap">
<form class="form" data-form="${kind}" novalidate data-endpoint="${esc(C.formEndpoint)}" data-email="${esc(C.email)}" data-success="${esc(success)}">
${fields.join("\n")}
<div class="hp" aria-hidden="true"><label>Website (leave empty)<input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label></div>
<div><button class="btn btn--solid" type="submit">${esc(submit)}</button></div>
<p class="fine">By submitting, you agree to our <a href="/privacy-policy/">Privacy Policy</a>.${note ? " " + note : ""}</p>
</form>
<p class="status" role="status" aria-live="polite" hidden></p>
</div>`;
}
