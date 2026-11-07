# Jhumur

An animated, responsive personal portfolio for **Tanji Akhter Jhumur**, a visionist and patient attendant in eye care in Dhaka, Bangladesh.

Built with Next.js, React, TypeScript, and Tailwind CSS. Runs locally without a hosted service, database, sign-in, or API key.

## Run locally

Requires Node.js 22.13 or newer and npm.

```powershell
cd D:\Projects\Protfolio
npm install
npm run dev
```

Open **http://localhost:3000**.

When cloning from GitHub:

```powershell
git clone https://github.com/ismahin/Jhumur.git
cd Jhumur
npm ci
npm run dev
```

## Production build

```powershell
npm run build
npm start
```

The production server also runs at http://localhost:3000. Run `npm run typecheck` to check TypeScript.

## Features

- Pink and lilac visual design with two adapted portrait backgrounds.
- Compact mobile hero with the portrait beside the introduction.
- Animated eye care illustrations, pointer responsive portrait, scroll reveals, and word reveal.
- Responsive navigation with keyboard controls and a full mobile menu.
- Illustrated care cards covering patient care, vision testing, and blood pressure checks.
- Two independent Three.js scenes, displayed side by side on desktop and stacked on mobile: eye chart testing and a seated patient's BP check.
- Selectable chart rows, scene replay, pause controls, and an illustrated fallback when WebGL is unavailable.
- Separate Experience and Education sections, with all qualifications visible.
- FAQs and practical skill cards with Phosphor icons.
- Email, telephone, and copy email actions.
- Printable résumé at `/resume` with a Save as PDF action.
- Privacy, terms, and branded 404 pages.
- Reduced motion support, focus states, and a skip to content link.

## Edit the portfolio

- `app/page.tsx`: main content and interactions.
- `app/profile.ts`: shared contact details and hospital name.
- `app/components/clinical-showcase.tsx`: interactive 3D care section and fallback.
- `app/components/clinical-world.ts`: procedural models and animation.
- `app/components/clinical-renderer.ts`: lazy WebGL renderer, camera, lighting, and resource management.
- `app/globals.css`: colours, type, animation, and responsive styles.
- `app/layout.tsx`: page title and social metadata.
- `app/resume/page.tsx`: printable résumé.
- `public/images/`: edited portraits.
- `DESIGN.md`: design notes and full portrait edit prompts.

Set `NEXT_PUBLIC_SITE_URL` when deploying to a domain to use that origin for social sharing metadata. Local development defaults to `http://localhost:3000`.

Google Fonts supplies Manrope; the website remains readable with its fallback font when offline. Contact links open the visitor's email or telephone application. There is no server contact form.

Run `npm test` for scene geometry, animation stability, camera framing, cuff alignment, patient arm support, reduced motion, and resource cleanup checks. Each 3D renderer loads near the viewport and pauses offscreen or when the browser tab is hidden. The two cards have independent pause controls. No external 3D model downloads are needed. The blood pressure display contains illustrative dashes rather than a patient reading.

The earlier hosted project is retained in the ignored `jhumur-portfolio/` folder on the original computer. The standalone application is at this repository's root.
