import { esc, section, head, hero, field, form } from "../lib/components.mjs";

export default function contact(cfg) {
  const C = cfg.contact;
  const rows = [
    C.address && `<dt>Address</dt><dd>${esc(C.address)}</dd>`,
    C.email && `<dt>Email</dt><dd><a href="mailto:${esc(C.email)}">${esc(C.email)}</a></dd>`,
    C.phone && `<dt>Phone</dt><dd><a href="tel:${esc(C.phone.replace(/[^+\d]/g, ""))}">${esc(C.phone)}</a></dd>`,
  ].filter(Boolean);
  if (C.responseTime) rows.push(`<dt>Response Time</dt><dd>${esc(C.responseTime)}</dd>`);

  return {
    path: "/contact/",
    title: "Contact",
    description: `Get in touch with ${cfg.name}. Whether you're interested in partnerships, investments, business opportunities, or careers, we'd love to hear from you.`,
    body: [
      hero({
        eyebrow: "Contact Us",
        title: "Let's start a conversation",
        lead: "Whether you're interested in partnering, investing, exploring business opportunities, or joining our team, we welcome the opportunity to connect.",
        image: cfg.images.contact,
      }),
      section(
        "light",
        `<div class="split split--form">
<div>
${head({
  eyebrow: "Get in Touch",
  title: "We'd love to hear from you",
  intro: "Use the form to send us a message, or reach out through the contact details below.",
})}
${rows.length ? `<dl class="facts">${rows.join("")}</dl>` : ""}
</div>
${form(cfg, {
  kind: "contact",
  submit: "Send Message",
  success: "Thanks. Your message has been sent. " + (C.responseTime || ""),
  fields: [
    field({ id: "c-name", name: "name", label: "Full Name", noun: "your full name", required: true, autocomplete: "name" }),
    field({ id: "c-email", name: "email", label: "Email", noun: "your email address", type: "email", required: true, autocomplete: "email" }),
    field({ id: "c-phone", name: "phone", label: "Phone", type: "tel", autocomplete: "tel" }),
    field({ id: "c-org", name: "organization", label: "Organization", autocomplete: "organization" }),
    field({ id: "c-type", name: "inquiry", label: "Inquiry Type", noun: "an inquiry type", required: true, options: ["Partnership", "Investment", "Business Opportunity", "Careers", "Media", "General Inquiry"], placeholder: "Select an inquiry type" }),
    field({ id: "c-subject", name: "subject", label: "Subject", noun: "a subject", required: true }),
    field({ id: "c-msg", name: "message", label: "Message", noun: "your message", required: true, rows: 7 }),
  ],
})}
</div>`
      ),
    ].join("\n"),
  };
}
