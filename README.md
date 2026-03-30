# 1blood studio — Tattoo Website

A production-ready marketing site for **1blood studio**: **React + Vite**, **Tailwind CSS v4**, **Framer Motion**, and a **working contact form** powered by [EmailJS](https://www.emailjs.com/) (no custom backend). Visual identity is **black, grey, and white** with light grey as the primary highlight on buttons and focus states.

Studio email shown sitewide: **`test@email.com`** — set in **`src/constants.js`** as `STUDIO_EMAIL`. Match this address in your EmailJS template **To** field (see below).

---

## 1. Install dependencies

```bash
cd tattoo-project
npm install
```

---

## 2. Run locally

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Site structure (multi-page)

Routing uses **React Router**. Each major section has its own URL:

| Path | Page |
|------|------|
| `/` | Home — hero, explore cards, review highlights |
| `/services` | Services & styles (expanded copy + session info) |
| `/artists` | Artist profiles (edit `src/data/artists.js`) |
| `/gallery` | Full gallery with lightbox |
| `/about` | Studio story + values |
| `/reviews` | Extended reviews + CTA |
| `/merch` | Merch (caps, shirts, hoodies, bags) — email to order |
| `/contact` | Booking form + studio details |
| `/dev/emailjs-env` | (Dev only) masked EmailJS env diagnostic |

Unknown paths show a **404** page. On refresh/deep links, the host must serve `index.html` for all routes (see **Deploying** below).

Other scripts:

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run build`   | Production build → `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint`    | ESLint                   |
| `npm run test`    | Vitest — env parsing unit tests |
| `npm run test:watch` | Vitest watch mode      |

---

## EmailJS: test env loading vs code

1. **Automated:** run `npm run test`. This only checks **`src/utils/emailjsEnv.js`** (normalization + reading mock env objects). It does **not** read your real `.env` file.

2. **In the browser (dev):** start `npm run dev` and open **`http://localhost:5173/dev/emailjs-env`**. You’ll see whether each `VITE_EMAILJS_*` variable is **present**, its **length** (not the value), and a **placeholder warning** if the string looks like dummy text. Production builds hide the useful details on that page.

---

## Social links (header)

Instagram, TikTok, and Facebook icons live in the header and open in a new tab. Edit **`src/data/social.js`** and set each `href` to your real profile URLs before going live.

---

## 3. Configure EmailJS (send to test@email.com)

The **booking form** sends many fields plus a compiled **`message`** summary. Your EmailJS template should list every variable you want in the email body, or at minimum **`{{message}}`** and **`{{reply_to}}`**.

**Parameters sent** (match these names in the template or remove unused ones in `ContactForm.jsx`):

| Variable | Description |
|----------|-------------|
| `from_name` | Full name |
| `first_name`, `last_name` | Split name |
| `from_email` | Client email |
| `phone` | Phone |
| `preferred_date` | Preferred date (YYYY-MM-DD) |
| `placement` | Body placement |
| `tattoo_style` | Style dropdown |
| `tattoo_description` | Idea / details |
| `budget` | Budget text |
| `is_18` | `Yes` if checkbox checked |
| `travel_status` | `Local` or `Travelling` |
| `client_status` | `New` or `Returning` |
| `preferred_artist` | From artist link, or “Not specified” |
| `message` | Full text summary of the request |
| `reply_to` | Same as client email |

### Step A — Account & API key

1. Create a free account at [emailjs.com](https://www.emailjs.com/).
2. Go to **Account** → **General** → **API keys**.
3. Copy your **Public Key** (safe to use in the browser with EmailJS).

### Step B — Email service

1. Go to **Email Services** → **Add New Service**.
2. Connect **Gmail** (or another provider you prefer).
3. Complete the connection wizard and note the **Service ID** (e.g. `service_xxxx`).

### Step C — Email template

1. Go to **Email Templates** → **Create New Template**.
2. Set **To Email** to: **`test@email.com`** (or the address you use in `STUDIO_EMAIL`).
3. Set **Subject**, for example:  
   `Booking: {{from_name}} · {{preferred_date}}`
4. In the **Content** (body), you can use **`{{message}}`** for the full block, or individual fields, e.g.:

```text
{{message}}

---
Phone: {{phone}}
Placement: {{placement}} · Style: {{tattoo_style}}
Budget: {{budget}}
{{travel_status}} · {{client_status}} · 18+: {{is_18}}
Artist: {{preferred_artist}}
Reply-To: {{reply_to}}
```

5. Save and copy the **Template ID** (e.g. `template_xxxx`).

> **Important:** EmailJS only substitutes variables that exist in your template. Either include all names from the table above or rely mainly on **`{{message}}`**.

### Step D — Environment variables (this project)

1. Copy `.env.example` to `.env` in the project root.
2. Fill in:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
```

3. **Restart** `npm run dev` after changing `.env` (Vite reads env at startup).

### Step E — Test

1. Open the site, go to **Contact** (`/contact`), submit the form.
2. Check **test@email.com** (and spam folder the first time).

If keys are missing, the UI shows a clear error instead of failing silently.

**“Public Key is invalid” but the value looks right**

- Restart `npm run dev` after editing `.env` (Vite reads env at startup).
- Ensure the file is named **`.env`** in the **project root** (same folder as `vite.config.js`), not `.env.txt`.
- No spaces around `=` : `VITE_EMAILJS_PUBLIC_KEY=myKey` (not `KEY = myKey`).
- Paste **Public Key** from [Account → API keys](https://dashboard.emailjs.com/admin/account), not Private Key / Service ID.
- The app strips BOM, CR characters, and outer quotes when reading env vars (see `normalizeEnvValue` in `ContactForm.jsx`).

---

## Project structure (high level)

```
src/
  App.jsx                 # BrowserRouter + routes
  layouts/RootLayout.jsx  # Header, main outlet, footer, scroll-to-top
  pages/                  # One file per route (Home, Services, Artists, …)
  components/
    Header.jsx            # NavLink + mobile menu
    Hero.jsx
    PageHeader.jsx        # Inner page title band
    Gallery.jsx           # Grid + modal (focus trap, Escape)
    About.jsx
    Testimonials.jsx
    ContactForm.jsx       # Booking form + EmailJS (detailed fields)
    Footer.jsx
    SocialLinks.jsx
  data/
    gallery.js
    services.js           # Long-form service copy
    artists.js            # Team bios & photos
    reviews.js            # Short + extended quotes
    social.js
    booking.js            # Placement & style dropdowns
    merch.js              # Merch products
  constants.js            # STUDIO_EMAIL (test@email.com)
  utils/
    emailjsEnv.js         # Env read/normalize (+ tests)
public/
  _redirects              # Netlify SPA fallback
vercel.json               # Vercel SPA rewrites
```

---

## Bonuses included

- **SEO basics:** `meta` description, Open Graph / Twitter tags, `robots.txt`, canonical placeholder in `index.html` (update the URL when you deploy).
- **Lazy loading:** Gallery thumbs use `loading="lazy"` (first row eager); modal image lazy-loads.
- **Accessibility:** Skip link, labels tied to inputs, `aria-live` / `role="alert"` for form feedback, dialog semantics, keyboard close (Escape), focus trap in the gallery modal, `prefers-reduced-motion` respected in animations.

---

## Deploying

Build with `npm run build` and host the `dist/` folder on any static host (Netlify, Vercel, Cloudflare Pages, etc.). Add the same `VITE_EMAILJS_*` variables in the host’s environment UI for production builds.

**SPA routing:** This app is a client-side router. The server must return `index.html` for deep links (e.g. `/gallery`). This repo includes **`public/_redirects`** (Netlify) and **`vercel.json`** (Vercel). For other hosts, configure an equivalent “rewrite all paths to `/index.html`” rule.

---

## License

Private / client project — adjust as needed.
