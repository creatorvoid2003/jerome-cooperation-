# Jerome Co-operations website

A static website with no dependencies. It needs [Node.js](https://nodejs.org) 18 or newer only to build and edit; the built
site is plain HTML, CSS and one small JavaScript file that any web host can serve.

## Quick start

```
npm run admin      # edit content in a browser form, then rebuild   -> http://localhost:4174
npm run build          # build the website into dist/  (upload this to your host)
npm run build:offline  # build dist-offline/            (open index.html by double-clicking, no server)
npm run preview        # view dist/ at http://localhost:4173
npm run check          # build both, then verify styling, links, headings and metadata
```

Every page has its CSS and JavaScript built in and uses relative links, so the site looks the same on any host, in any
subfolder, and when opened from a folder. Upload the **contents of `dist/`** to your host. See [docs/DEPLOY.md](docs/DEPLOY.md).

## Folder layout

```
jerome-co-operations/
├─ site.config.json        All editable content: contact details, social links, companies,
│                          leadership, insights, hero images. Edit by hand or with the admin.
├─ src/
│  ├─ pages/               One file per page, with the page copy (home, about, vision, ...)
│  ├─ lib/                 Shared code: page shell (layout), components, config loader
│  └─ static/              css/styles.css, js/main.js (menu + forms), img/. CSS and JS are
│                          copied into every page by the build.
├─ scripts/
│  ├─ build.mjs            Builds dist/ (pages, sitemap, robots.txt, 404)
│  └─ preview.mjs          Local preview server
├─ tools/
│  ├─ admin/               Local admin editor (server.mjs + index.html)
│  └─ check.mjs            Quality checks run by `npm run check`
├─ docs/
│  ├─ DEPLOY.md            Hosting, forms and staging
│  └─ CHANGES.md           What matches the original site and what was adjusted
├─ dist/                   Website build (created by `npm run build`; this is what you upload)
└─ dist-offline/           Open-from-folder build (created by `npm run build:offline`)
```

## Editing content

**Admin (easiest).** Run `npm run admin` and open http://localhost:4174. Change organization details, contact info, social links,
hero images, companies, leadership and insights, then press **Save and rebuild**. Every field is validated first, and the previous
`site.config.json` is kept in `.backups/` (last 30). Set `ADMIN_PASSWORD=...` before the command to protect it with a password
(user name: `admin`). It listens on your computer only and is not part of the published site.

**By hand.** Edit `site.config.json`, then `npm run build`.

| Key | What it does |
| --- | --- |
| `contact.email` / `contact.formEndpoint` | Where form messages go. Set at least one, or the forms say they are not connected. |
| `contact.phone`, `contact.address`, `social.*` | Shown in the footer and on the Contact page once filled. Empty ones are hidden. |
| `legalEntity`, `jurisdiction` | Named in the footer, Privacy Policy and Terms (governing law). |
| `companies` | Each entry gets a card and its own page under `/companies/<slug>/`. |
| `leadership`, `insights` | Empty: the pages show their "coming soon" message. Add entries to replace it. |
| `images` | The photo at the top of each page. Empty = plain navy band. |
| `siteUrl` | Used for canonical links, social previews and the sitemap. |

The page wording itself lives in `src/pages/*.mjs`.

## Notes

- The Privacy Policy and Terms keep the original wording, with a few additions (retention period, governing law, fonts). They are
  not legal advice; have them reviewed for the country where the company is registered.
- The site sets no cookies and uses no analytics. It loads two typefaces from Google Fonts (disclosed in the Privacy Policy).
- Hero photos are linked from Pexels, as on the original site. Download them and host them yourself if you want to avoid that dependency.
