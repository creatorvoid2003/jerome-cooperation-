# Deploying the site

The build output in `dist/` is a normal static website. Upload the **contents** of `dist/` (so `index.html` sits at the top level).

## Before you upload

1. Open the admin (`npm run admin`) or `site.config.json` and fill in:
   - a public email **or** a form service address (otherwise the contact and careers forms cannot deliver messages),
   - `siteUrl` (the live address, for example `https://jeromecooperations.com`),
   - optionally phone, address, social links, registered company name and country.
2. Run `npm run check` and fix anything it reports.

## Hosting options

Any static host works. Common ones, all with a free tier:

- **Netlify:** drag the contents of `dist/` onto the Deploys page, or connect the repository (build command `npm run build`, publish directory `dist`).
- **Cloudflare Pages:** create a project, upload `dist/`, or connect the repository with the same two settings.
- **Vercel, GitHub Pages, S3 + CloudFront:** upload `dist/` as the site root.

The CSS and JavaScript are built into every page and all links are relative, so the site also works when placed in a subfolder
(for example `example.com/jerome/`). To browse the site straight from a folder on your computer, use the `dist-offline/` build
(`npm run build:offline`, or the open-from-folder zip), whose links point at `index.html` files so every page opens by double-clicking.

Pages are folders (`/about/index.html`), so the addresses are `/about/`, `/vision/`, `/privacy-policy/` and so on. The 404 page is `dist/404.html`;
most hosts use it automatically.

## Making the forms work

The forms post JSON to `contact.formEndpoint` when it is set. With a service such as Formspree, Basin or Getform:

1. Create a form there and copy its address (it starts with `https://`).
2. Paste it into **Contact → Form service address** in the admin, save, and re-upload `dist/`.
3. Send a test message from the live site.

If you set only `contact.email`, the forms open the visitor's email app with the message filled in. That works with no extra service
but depends on the visitor having an email app, so a form service is the better choice.

## Staging copy

`npm run build:staging` builds the same site marked `noindex` with a `robots.txt` that blocks crawlers. Use it for any test address
(for example a preview URL), so it is not indexed beside the real domain. Always run the normal `npm run build` for the live upload.

## After launch

- Submit `https://your-domain/sitemap.xml` in Google Search Console.
- Check the social preview by pasting a page address into a link-preview tool.
- To change content later: edit, rebuild, re-upload `dist/`.

## GitHub Pages

The project includes `.github/workflows/pages.yml`, which checks and builds the site and publishes `dist/` on every push to `main`.

1. Create an empty public repository on GitHub (for example `jerome-co-operations`).
2. Upload the project files (everything except `dist/`, `dist-offline/` and `.backups/`), or push them with git.
3. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Open the **Actions** tab and wait for "Deploy site to GitHub Pages" to finish. The address is `https://<username>.github.io/<repository>/`.

Links are relative, so the site works under the `/<repository>/` path. For your own domain, add it under **Settings → Pages → Custom domain**
and set `siteUrl` in `site.config.json` to match. Until then, search engines are told the canonical address is `siteUrl`, so use a staging build
(`npm run build:staging`) if you do not want the GitHub address indexed beside the real domain.
