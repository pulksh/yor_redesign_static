# YourOwnROOM HTML template

## Run and deliver
- The ten root `.html` files are the actual website. They contain all page content and shared header/footer markup, not a React application.
- `pnpm build` creates a portable static site in `dist/`. Upload the entire contents, including `assets/` and `images/`, to ordinary static hosting.
- Vite remains the development/build tool. React packages are unused legacy dependencies.
- `src/index.css` imports Tailwind and supplies shared brand tokens. The build produces compiled local CSS; no Tailwind CDN or runtime is used.
- `src/site.js` progressively enhances navigation, image fallbacks and contact interactions. Core page content and links work without JavaScript.
- DM Sans is loaded from Google Fonts, with a system fallback. Self-host it before production if external font requests are not desired.

## Editing
- Edit `scripts/create-template.mjs` for shared layouts and page content, then run `node scripts/create-template.mjs` to regenerate the ten HTML files.
- You may also edit individual HTML files directly, but regeneration will overwrite those direct edits.
- The legal pages are generated from `content/legal.json`, extracted from the owner's DOCX without shortening its text.
- `public/images/logo.png` is the official owner-supplied logo. Preserve its proportions.
- `home-interior.jpg` and `residences.jpg` are AI-generated illustrative images, not completed work, actual listings or client properties. Their captions disclose this.
- Replace illustrative imagery with approved project photography when available. Add meaningful alt text.
- Leadership uses initials, not invented headshots. Press and Blogs deliberately have empty states until approved content is supplied.

## Form limitations
- There is no server, CRM or automatic email delivery.
- With JavaScript enabled, the form validates input and stores drafts under `yor-template-enquiries` in localStorage only after submission.
- Confirmation explicitly says that the enquiry was not sent. Storage failures produce an email alternative.
- “Open in email app” builds a draft for `pmo@yourownroom.com` or `crm@yourownroom.com`. Users must review and send in their own mail app. A configured mail client is required.
- The reset button removes local draft data, including drafts from the superseded prototype.
- URL context uses allowlisted `service=projects|rental` and service-specific `category` values. Unknown values fall back safely.
- With JavaScript disabled, users are directed to the visible service email addresses rather than submitting a nonfunctional form.

## WordPress conversion
1. Extract the commented header/footer into `header.php` and `footer.php`.
2. Enqueue the compiled shared stylesheet and vanilla script with WordPress asset functions; update asset paths with theme-directory helpers.
3. Convert the ten documents into page templates, using WordPress permalink functions for navigation.
4. Replace repeated navigation with registered WordPress menus; retain keyboard and current-page semantics.
5. Convert Blogs and Press into a posts archive/custom post type only once the content model is agreed.
6. Use the WordPress media library for project photos, logos and approved leadership headshots.
7. Replace the local-only preview form with an approved WordPress form plugin or secured server handler. Include validation, consent handling, spam protection, error/success handling and tested email delivery.
8. Remove local draft persistence and preview notices when real delivery is working, and update the privacy notice to match actual processing.

## Before production
- Have the legal text reviewed. Its provided privacy revision date is 25 November 2026; it has not been silently changed. The terms document supplies no separate effective date.
- Confirm cookies, processors, hosting/cross-border processing, retention and rights procedures. Source drafting caveats are preserved.
- The preview has no analytics, tracking pixels or marketing cookies. Google Fonts still makes an external font request.
- Verify business claims, biographies and project/community references with the owner.
- Add approved press items, blog articles, real case studies and headshots when available; never label illustrative images as project evidence.
- Keep the Figma preview's noindex setting until production indexing is intentionally enabled.
- Recheck every page, link, mobile menu and form path on the final WordPress host.
