# Jhumur portfolio

Built as a standalone local Next.js application with React, TypeScript, and CSS. Run `npm run dev` for development at http://localhost:3000. Run `npm run build` and `npm start` for production. No Sites account or hosted runtime is required.

The supplied landing page skill informed typography, spacing, floating navigation, reduced motion support, and the word reveal. The CV supplied the professional information. No testimonials, patient counts, medical qualifications, or third party references were invented. Exact home address, birthday, and reference contact details are excluded from the portfolio.

The résumé opens a printable page with a Print / Save as PDF action. Contact actions open an email or telephone app. No server contact form is implied.

The revised design uses brighter pink and lilac surfaces, Phosphor medical and eye care icons, an animated eye character, and a clickable patient journey illustration. The mobile hero uses a two column introduction and portrait layout. Experience and Education are separate sections. The user confirmed the current workplace as Maula Buksh Sardar Dattebayo Chokkhu Hospital, মাওলা বখ্শ সরদার দাতব্য চক্ষু হাসপাতাল; shared workplace details are in `app/profile.ts`.

## Clinical scenes

The user confirmed that Jhumur also works as a visionist, performs eye chart tests, and checks every patient's blood pressure. The hero, care cards, experience, metadata, and printable résumé reflect these responsibilities without adding a medical qualification. Shared role text lives in `app/profile.ts`.

The clinical illustrations are real procedural Three.js scenes, created in code with rounded clay materials and the site's pink and lilac palette. One shows a female care professional pointing to an eye chart; the second shows a seated adult patient, an upper arm cuff, connecting tube, and monitor. These are generic professional illustrations rather than portraits of Jhumur. There are no invented patient measurements. Scene controls and a complete CSS illustration remain available without WebGL. Motion respects reduced motion preferences, pauses offscreen, and stops when the tab is hidden.

## Portrait generation

The built-in Imagegen tool produced both background edits. Original photographs remain untouched. Selected files are saved in `public/images/jhumur-hero.png` and `public/images/jhumur-about.png`.

Hero prompt: Use case: identity-preserve. Asset type: editorial portrait for Tanji Akhter Jhumur's personal patient care portfolio website. Edit the supplied photograph. Replace all birthday decorations, balloons, banners, brick wall and foil background with a clean solid pale blush rose studio backdrop (#ead0d2). Preserve the exact identity, facial features, natural skin texture, black hair, black embroidered sari, jewellery, hand gesture and relaxed smile of the woman. Gently rebalance harsh lighting to soft warm editorial studio lighting. Portrait vertical 3:4 composition, head fully visible with a little breathing room and torso extending beyond bottom, no text, no watermark, no new accessories. This is the same real woman, not a generic model. Only background and lighting should change. Elegant, authentic photograph for a feminine professional portfolio.

About prompt: Use case: identity-preserve. Asset type: second editorial portrait for the About section of Tanji Akhter Jhumur's personal patient attendant portfolio. Replace ONLY the birthday party background in this supplied portrait with a minimal warm ivory studio wall (#eee9e0), with soft natural window shadows cast on the wall. Preserve this exact real woman's identity, face, eyes, skin, gaze to the side, hair, black embroidered sari, jewellery, hands and pose. No balloons, banners or foil decorations. Gentle balanced natural daylight on the woman while retaining authentic skin texture. Sophisticated quiet professional personal portrait, vertical 3:4 framing, include her head and hands, no text or watermarks.
