# Dev Portfolio — Angular (Standalone)

A fast, single-page developer portfolio built with **Angular 20** (standalone
components + signals + new control flow) and deployed free on **GitHub Pages**.

- Warm-ink editorial/terminal aesthetic, fully responsive
- Scroll-reveal animations, animated hero, scrollspy navigation
- **All content lives in one file** so you never have to dig through HTML

---

## 1. Prerequisites

- **Node.js 20.11+** (Angular 20 requires Node 20.11 / 22.11+). Check with `node -v`.
- The Angular CLI: `npm install -g @angular/cli`

## 2. Run it locally

```bash
npm install
npm start
```

Open http://localhost:4200 — it live-reloads as you edit.

## 3. Make it yours (the only file you need)

Open **`src/app/data/portfolio.data.ts`** and edit:

- `profile` — your name, tagline, about text, facts, email, social links
- `skills` — your tech stack groups
- `projects` — your projects (title, description, tags, live/code links)
- `experience` — your work history

Notes:
- In the hero name and lede you can use `<em>word</em>` (accent color) and
  `<strong>word</strong>` (brighter text).
- In the about paragraphs you can use `<span class="hl">phrase</span>`.
- To re-theme the whole site, change the CSS variables at the top of
  **`src/styles.css`** (`--ink`, `--accent`, fonts, etc.).
- Update the page `<title>`, description, and favicon in **`src/index.html`**.

---

## 4. Deploy to GitHub Pages (free)

### One-time setup

1. Create a **public** GitHub repo. The name matters — your site URL becomes
   `https://<your-username>.github.io/<repo-name>/`.
   This template assumes the repo is named **`dev-portfolio`**. If you use a
   different name, update it in two places:
   - `package.json` → the `deploy` script (`--base-href=/<repo-name>/`)
   - `angular.json` → `outputPath` (optional, just cosmetic)

2. Push your code:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

3. Add the deploy tool (adds the `ng deploy` builder to the project):

   ```bash
   ng add angular-cli-ghpages
   ```

### Deploy (run this anytime you want to publish)

```bash
npm run deploy
```

Behind the scenes that runs:

```bash
ng deploy --base-href=/dev-portfolio/
```

It builds for production, then pushes the contents of
`dist/dev-portfolio/browser` to a `gh-pages` branch.

> ⚠️ **Important:** the `--base-href` value must match your repo name exactly,
> with leading and trailing slashes (`/dev-portfolio/`). Getting this wrong is
> the #1 cause of blank pages / 404s on assets.

### Turn on Pages

In your repo → **Settings → Pages** → set **Source = Deploy from a branch**,
**Branch = `gh-pages` / `(root)`**, Save. Give it a minute, then visit:

```
https://<your-username>.github.io/<repo-name>/
```

### Using a custom domain instead?

If you point your own domain at GitHub Pages, you don't need the repo name in the
path. Deploy with:

```bash
ng deploy --base-href=/ --cname=yourdomain.com
```

---

## 5. Project structure

```
src/
├─ index.html                  # <head>, fonts, title, favicon
├─ main.ts                     # bootstrap
├─ styles.css                  # 🎨 design system (colors, fonts, all styling)
└─ app/
   ├─ app.component.ts          # scrollspy + nav state (signals)
   ├─ app.component.html        # the whole page layout
   ├─ app.config.ts             # providers
   ├─ data/portfolio.data.ts    # ✏️ ALL your content lives here
   └─ directives/reveal.directive.ts  # scroll-reveal animation
```

## Troubleshooting

- **Blank page / 404 on JS & CSS after deploy** → `--base-href` doesn't match
  your repo name. Re-run `npm run deploy` with the correct `/<repo-name>/`.
- **`ng deploy` not found** → run `ng add angular-cli-ghpages` first.
- **Push rejected on `gh-pages`** → you may need a Personal Access Token; see the
  angular-cli-ghpages docs on `GH_TOKEN`.
- **Fonts not loading** → they come from Google Fonts; make sure you're online,
  or self-host them in `public/` and update the `<link>` in `index.html`.
