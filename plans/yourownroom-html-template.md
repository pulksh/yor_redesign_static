# YourOwnROOM: static HTML website template

## Agreed direction
- Build a static HTML template first, not a React application or a WordPress theme.
- Deliver all ten requested pages with real navigation, responsive layouts and minimal vanilla JavaScript.
- Make Projects & Home Services the primary business offering on the homepage; Rental Management Services is secondary.
- Use NoBroker as inspiration for straightforward service discovery, clear navigation and prominent enquiries—not for copying its branding or building a property marketplace.
- Theme around the supplied official YourOwnROOM logo: red, cyan-blue and green, on predominantly white backgrounds. Do not retain the rejected green-and-cream editorial direction.
- WordPress conversion is a later phase. No PHP, CMS, database, authentication or live form delivery is included now.

## Sources and repository facts
- The repository currently contains a single React landing page, Vite, Tailwind v4 and Figma-managed Vite plugins.
- The current page's rental-first hierarchy, property search, Buy/Sell tab, invented wordmark and listing CTA must be replaced.
- `index.html` currently contains only a title placeholder; rebuild it as a valid complete HTML document.
- Source business copy from the previously supplied `2026-12 Website Content.docx`, attachment `de3df96c-d662-47fa-8b75-72152430ec6e`.
- Use the uploaded official logo, attachment `cbbf56f9-216d-4232-8c72-9e0d229d3dee`. Resolve its actual file through the attachment CLI and copy it into local image assets. Preserve its proportions and colours.
- The external logo URL did not respond during planning; the uploaded logo supersedes that dependency.
- The existing generated residential-building photograph is illustrative, not an actual completed company project. Do not present it as portfolio evidence.

## Visual system
- White surfaces, charcoal headings, readable grey body copy and subtle neutral section backgrounds.
- Use a strong accessible red for primary enquiry buttons, cyan-blue for supporting links and accents, and green for small trust/service indicators. Derive final accent tokens from the uploaded logo and darken UI variants as needed for contrast.
- Use a clean public sans-serif such as DM Sans, with a system fallback; no oversized italic serif typography.
- Use a centred content width of approximately 1200px, generous but practical spacing, crisp service cards, restrained corner radii and subtle shadows.
- Use relevant renovation, painting, repairs and residential-interior imagery. Stock/generated images must remain illustrative and never imply a completed client project.
- Keep logo on a white surface, sized legibly without distortion.

## Information architecture
All links are relative `.html` links, not client-side routes:
1. `index.html` — Home.
2. `about-us.html` — About Us.
3. `leadership.html` — Leadership.
4. `rental-management-services.html` — Rental Management Services.
5. `projects-and-home-services.html` — Projects & Home Services.
6. `press.html` — Press.
7. `blogs.html` — Blogs.
8. `privacy-policy.html` — Privacy Policy.
9. `terms-of-use.html` — Terms of Use.
10. `contact-us.html` — Contact Us.

### Shared navigation
- Logo links to Home.
- Desktop navigation: Home; Services dropdown (Projects & Home Services first, Rental Management second); Company dropdown (About Us, Leadership); Resources dropdown (Press, Blogs); Contact Us.
- Primary header CTA: “Get a quote”, linking to Contact Us with Projects & Home Services preselected.
- Mobile navigation uses an accessible toggle and expandable groups.
- Mark the current page using `aria-current="page"`.
- Footer includes all ten pages, service-specific email addresses, operating cities, company address and office hours from the document.

## Page content specifications

### Home
1. Service-led hero: headline about improving and caring for homes through projects, renovation and maintenance. Primary CTA “Get a project quote”; secondary CTA “Explore home services”. Use a relevant interior/renovation visual, not a rental search form.
2. Prominent service tiles: Maintenance & Repairs; Painting & Deep Cleaning; Civil Work & Interiors; Fabrication & Glasswork; Property Renovation. Each links to its corresponding section on the Projects page.
3. Projects & Home Services overview: scope, coordinated execution, vendor management and transparent work orders/invoicing.
4. Project process: Enquiry → assessment → agreed scope and quotation → execution and tracking → handover. Avoid guaranteed timelines or unsupported warranties.
5. Experience/credentials: document-backed company figures (10+ years, 400+ homes, 1M+ sq. ft., ₹400 Cr+ residential assets), explicitly identified as company/rental-management experience rather than project-completion totals. Use project/community names from the source only as described, not as invented endorsements.
6. Secondary Rental Management section: tenant discovery, KYC, agreements, collections, inspections, renewals and exit settlements; link to the dedicated page.
7. Short company introduction linking to About Us.
8. Final enquiry banner linking to Contact Us.
- No Buy/Sell section, property listings, account login or marketplace search.

### Projects & Home Services
- Primary service-page hero and enquiry CTA.
- Four document-backed groups: property onboarding/offboarding and maintenance; managed civil work and painting; fabrication and glasswork; property renovation.
- Explain included tasks without inventing rates.
- Explain scope/quotation, work-order management, vendor coordination, planning, reporting and invoicing.
- Include documented project/community credentials as text, with no unapproved logos or fabricated project photography.
- Include the project process, short service FAQs based on the source, and contextual Contact CTA.

### Rental Management Services
- Rental-focused hero and enquiry CTA.
- Four source groups: Discovery & Tenant Management; Inventory & Property Management; Service Request Management; Invoicing & Payment Processing.
- Explain tenant/property onboarding, ongoing operations, renewals and exit settlements.
- Use documented experience and developer/project references accurately, without claiming endorsement.
- No guaranteed yields, rental prices, occupancy rates or property availability.

### About Us
- Company story, owner pain points, residential asset-management positioning, Bengaluru/Pune footprint and documented experience.
- Explain technology-driven, asset-light approach in customer-facing language.
- Link to both service pages and Leadership.
- Exclude placeholder fee percentages, investor-market projections and transaction-service launch claims from promotional sections.

### Leadership
- Profiles for Prabhat Kumar Tiwary, Sanjay Singh, Venkat Dasari and Ravi Chaturvedi, using the supplied roles and biographies.
- Link to supplied LinkedIn profiles where available.
- Use neutral initials/graphic placeholders if approved headshots are unavailable; never substitute unrelated portraits.

### Press
- Include the supplied official legacy press-page link as an external resource, clearly labelled.
- Add a polished empty state explaining that individual coverage items will be added once supplied.
- Do not invent headlines, dates, publications or logos; no dead article links.

### Blogs
- Deliver the complete listing-page layout with a clear “Articles coming soon” state.
- No fabricated published posts, fake authors, dates or nonfunctional “Read more” buttons.
- Include a relevant services/contact CTA. Article detail pages are out of scope for these ten pages.

### Privacy Policy and Terms of Use
- Render the complete supplied documents with structured headings, readable line lengths and a linked contents list.
- Preserve the provided legal entities, contact details and stated revision date; do not silently substitute the current date.
- Retain any supplied legal drafting caveats rather than claiming unresolved providers/cookies are confirmed.
- State in the handoff that legal review and operational details must be confirmed before production publication.

### Contact Us
- Service selector, name, email, phone, city (Bengaluru/Pune) and message.
- Support contextual query parameters, e.g. `?service=projects&category=painting`, with allowlisted values; unknown values fall back safely to Projects & Home Services.
- Include rental email `crm@yourownroom.com`, projects email `pmo@yourownroom.com`, escalation email, office address, entities and opening hours from the document.
- Do not fabricate a phone number or social profile URL.
- No live map integration is needed.

## Template architecture and delivery
- Use ten complete HTML documents with semantic header, nav, main and footer landmarks; core content must be present without JavaScript.
- Keep header/footer markup consistent across documents and clearly comment their future WordPress extraction boundaries.
- Use a shared local vanilla JavaScript file for progressive enhancement only: menus, accordions, enquiry validation and contextual service selection.
- Honour the existing Tailwind setup: use utility styling with shared theme tokens in the CSS entry; compile a local shared stylesheet for the portable HTML output. No React runtime or Tailwind CDN dependency in the delivered site.
- Retain Vite as build tooling and preserve Figma-managed plugins. Configure all ten HTML entries for production output; do not modify `.figma/make/` setup.
- Disconnect the React mounting script from the site. Remove obsolete React page/entry sources when safe; dependency cleanup is not required.
- Deliver `dist/` through the regular build with all ten pages and bundled local assets, usable on ordinary static hosting.
- Include a short handoff document describing file structure, asset replacement, form limitations and later WordPress mapping: header/footer templates, page templates, menu integration, posts/archive, media library and form plugin.

## Interactions and data boundaries
- Service links and CTAs navigate to actual pages or anchors.
- Menus support keyboard, touch, outside-click and Escape closure; maintain focus and expanded state.
- Use native accessible disclosure/accordion elements for FAQs, avoiding unnecessary modal flows.
- Contact form uses labelled controls, appropriate input types, clear required fields and accessible validation.
- For this static preview, persist valid submissions in browser localStorage with try/catch, timestamp and an explicit “saved in this browser only; not sent” confirmation. Do not persist on every keystroke.
- Include a clear local-data reset action; handle missing, corrupted or unavailable storage with a useful message and email alternative.
- Provide a user-initiated email option routed to the selected service; explain that it opens their mail app and does not prove delivery.
- No server requests, fake submission success, CRM integration, analytics or marketing cookies in this phase.

## Accessibility and responsive behaviour
- Test at 375px, 800px, 1024px and 1280px widths.
- Stack service cards and enquiry fields cleanly on smaller screens; no horizontal clipping.
- Body copy, labels and descriptions at least 14px; small badges at least 12px; 44px interactive targets.
- WCAG AA contrast, visible focus, logical heading order, skip link and reduced-motion support.
- Supply informative image alt text and visible image-error fallbacks; do not lazy-load the hero.
- Add unique page titles and descriptions. No fabricated structured-data ratings or reviews.

## Implementation sequence
1. Resolve the official logo and source document; inventory content and usable assets.
2. Establish shared branding tokens, header/footer and static HTML build entries.
3. Rebuild Home with Projects & Home Services first.
4. Implement both service pages, About and Leadership.
5. Implement Press and Blogs with honest missing-content states.
6. Implement full legal pages and Contact, including contextual enquiry flow.
7. Complete responsive/accessibility checks and portable build/handoff.

## Verification and acceptance
- Production build succeeds and includes all ten distinct HTML pages.
- Direct navigation, refresh, internal links, dropdowns and service anchors work on preview and built output.
- Output uses no React mount/runtime, and core page content remains available with JavaScript disabled.
- Confirm homepage hierarchy visually: Projects & Home Services clearly precedes and outweighs Rental Management.
- Check correct official logo, consistent brand accents and no residual invented green wordmark.
- Verify all service CTAs select the right contact context; invalid URL parameters are ignored safely.
- Test empty/invalid/valid forms, local-storage failure/corruption, reset and truthful confirmation.
- Confirm legal copy completeness and accurate leadership/contact information.
- Confirm no invented testimonials, articles, clients, headshots, portfolio projects, guarantees or live delivery claims.
- Verify mobile navigation and keyboard access; check no overflow at target widths.

## Out of scope and pre-publication dependencies
- WordPress/PHP conversion, live enquiry routing, CRM, CMS publishing, authentication and property listings.
- Real case studies, testimonial approvals, headshots, press items and blog articles remain owner-supplied content; missing material is omitted or honestly identified, never fabricated.
- Legal approval and operational privacy-policy details must be completed before the site is treated as production-ready.
