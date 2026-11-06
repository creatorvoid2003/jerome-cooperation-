// Privacy Policy and Terms. Same sections and wording as the original site; the few additions are marked.
import { esc, section, hero } from "../lib/components.mjs";
import { LEGAL_UPDATED } from "../lib/config.mjs";

const wrap = (cfg, title, inner) =>
  [hero({ eyebrow: "Legal", title, lead: `Last updated: ${LEGAL_UPDATED}` }), section("white", `<div class="prose">${inner}</div>`)].join("\n");

export default function legal(cfg) {
  const n = esc(cfg.name);
  const C = cfg.contact;
  const entity = esc(cfg.legalEntity || cfg.name);
  const reach = C.email
    ? `<a href="mailto:${esc(C.email)}">${esc(C.email)}</a> or through our <a href="/contact/">contact page</a>`
    : `through our <a href="/contact/">contact page</a>`;

  const privacy = {
    path: "/privacy-policy/",
    title: "Privacy Policy",
    description: `Read the privacy policy of ${cfg.name} to understand how we collect, use, and protect your information.`,
    body: wrap(
      cfg,
      "Privacy Policy",
      `<h2>1. Introduction</h2>
<p>${entity} (“we,” “us,” or “our”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.</p>

<h2>2. Information We Collect</h2>
<p>We may collect the following types of information:</p>
<ul>
<li><strong>Contact information:</strong> Name, email, phone number, and organization when you submit a contact form.</li>
<li><strong>Career information:</strong> Name, email, area of interest, and background details when you join our talent network.</li>
<li><strong>Technical data:</strong> IP address, browser type, and usage data collected automatically when you visit our website.</li>
</ul>

<h2>3. How We Use Your Information</h2>
<p>We use the information we collect to:</p>
<ul>
<li>Respond to your inquiries and provide information you request.</li>
<li>Notify you about relevant career opportunities if you join our talent network.</li>
<li>Improve our website and services.</li>
<li>Comply with legal obligations.</li>
</ul>

<h2>4. Information Sharing</h2>
<p>We do not sell, trade, or rent your personal information to third parties. We may share information with service providers who help us operate our website, and we may disclose information when required by law.</p>

<h2>5. Data Retention</h2>
<p>We keep messages and talent network submissions for up to ${cfg.retentionMonths} months after our last contact with you, then delete them. You can ask us to delete your information sooner.</p>

<h2>6. Data Security</h2>
<p>We implement appropriate technical and organizational measures to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>

<h2>7. Your Rights</h2>
<p>You have the right to access, correct, or delete your personal information. You may also opt out of receiving communications from us at any time. To exercise these rights, please contact us ${reach}.</p>

<h2>8. Cookies</h2>
<p>Our website may use cookies to improve your browsing experience. You can control cookies through your browser settings. This site sets no cookies of its own and loads its typefaces from Google Fonts, so your browser requests font files from Google’s servers.</p>

<h2>9. Changes to This Policy</h2>
<p>We may update this Privacy Policy from time to time. We will post any changes on this page and update the “last updated” date.</p>

<h2>10. Contact Us</h2>
<p>If you have questions about this Privacy Policy, please contact us ${reach}.</p>`
    ),
  };

  const law = cfg.jurisdiction ? `the laws of ${esc(cfg.jurisdiction)}` : "applicable laws";
  const terms = {
    path: "/terms/",
    title: "Terms & Conditions",
    description: `Read the terms and conditions governing the use of the ${cfg.name} website.`,
    body: wrap(
      cfg,
      "Terms &amp; Conditions",
      `<h2>1. Acceptance of Terms</h2>
<p>By accessing and using the ${n} website, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website.</p>

<h2>2. Use of the Website</h2>
<p>You agree to use this website for lawful purposes only. You must not:</p>
<ul>
<li>Use the website in any way that violates applicable laws or regulations.</li>
<li>Attempt to gain unauthorized access to any part of the website.</li>
<li>Submit false, misleading, or fraudulent information through our forms.</li>
<li>Use automated systems to submit forms or scrape content.</li>
</ul>

<h2>3. Intellectual Property</h2>
<p>All content on this website, including text, graphics, logos, and design elements, is the property of ${entity} or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.</p>

<h2>4. User Submissions</h2>
<p>When you submit information through our contact or talent network forms, you are responsible for the accuracy of the information provided. You grant us the right to use the information you submit for the purposes described in our <a href="/privacy-policy/">Privacy Policy</a>.</p>

<h2>5. Disclaimer</h2>
<p>The information on this website is provided for general informational purposes only. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, or reliability of the information. Nothing on this website is financial, legal, or investment advice, or an offer to sell or a solicitation to buy any security or investment.</p>

<h2>6. Limitation of Liability</h2>
<p>${entity} shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use this website.</p>

<h2>7. Third-Party Links</h2>
<p>Our website may contain links to third-party websites. We are not responsible for the content or practices of these websites.</p>

<h2>8. Changes to Terms</h2>
<p>We may update these Terms and Conditions from time to time. Continued use of the website after changes are posted constitutes your acceptance of the updated terms.</p>

<h2>9. Governing Law</h2>
<p>These Terms and Conditions are governed by ${law}. Any disputes will be resolved in accordance with those laws.</p>

<h2>10. Contact</h2>
<p>If you have questions about these Terms and Conditions, please <a href="/contact/">contact us</a>${C.email ? ` or write to <a href="mailto:${esc(C.email)}">${esc(C.email)}</a>` : ""}.</p>`
    ),
  };

  return [privacy, terms];
}
