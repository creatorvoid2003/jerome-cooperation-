# Original site vs this rebuild

Reference: https://jerome-co-operations-2xg0.bolt.host (read on 13 October 2026).

## Kept exactly

- **Pages and addresses:** Home, About, Companies, Company One, Company Two, Vision, Mission & Values, Leadership, Careers, Insights,
  Contact, Privacy Policy, Terms & Conditions, at the same paths (`/about`, `/vision`, `/mission-values`, `/privacy-policy`, ...).
  Addresses now end in a slash (`/about/`), which hosts redirect automatically.
- **Navigation and footer:** the same eight menu items plus Contact Us, and the same footer columns (Company, Organization, Legal).
- **Wording:** every heading, paragraph, value, pillar, timeline step, career area, button label and form field label.
- **Page order and sections** on every page, including the six hero photos (same Pexels images).
- **Page titles and descriptions** from the original metadata.

## Adjusted (the fixes from the site review)

| # | Change | Why |
| --- | --- | --- |
| 1 | Address, email, phone and social links are hidden until filled in, instead of reading "to be announced". | Placeholders in every footer undermined trust. They appear automatically once set in the admin. |
| 2 | Each page has its own social-preview tags and a canonical address. A staging build is marked `noindex`. Sitemap, robots.txt, 404 page and organization markup added. | The original repeated the home page's preview on every page, and the test address could be indexed. |
| 3 | Forms validate in the browser, explain errors, send to a form service or email, and say clearly when nothing was sent. The hidden spam field is kept. | Submissions could fail silently. |
| 4 | Legal pages keep all original sections and add: a retention period, a contact email once set, governing law once set, a note on Google Fonts, and a no-investment-advice line. | The originals named no controller, retention or jurisdiction. |
| 5 | Mobile menu with keyboard support, skip link, visible focus, reduced-motion support. Hero photos are decorative (empty alt text) and fall back to a plain navy band if they fail to load. | Accessibility and resilience. |
| 6 | The CSS and JavaScript are built into every page, and links are relative. | A first version linked `/assets/styles.css`, which left pages unstyled when opened from a folder or placed in a subfolder. |
| 7 | Admin editor (`npm run admin`) and the organized project structure. | Requested. |

## Could not be copied

The original site's host refused downloads from my workspace, so I could not copy its stylesheet. I rebuilt the **look** from the text
of the pages, the original theme colour (#0a0f1c) and its hero photos. Layout, spacing, typefaces and section colours may therefore
differ from the original. The contact form's inquiry-type options were not visible in the page text, so they are my own:
Partnership, Investment, Business Opportunity, Careers, Media, General Inquiry.

If you can send a screenshot of any page, or export the original project's CSS, I can match the styling more closely.
