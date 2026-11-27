/**
 * Development-only HTML authoring helper.
 * Run `node scripts/create-template.mjs` after editing these shared templates.
 * The generated ten HTML files are the actual static site, not an SPA.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const esc = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const wrap = 'mx-auto max-w-[1280px] px-6 lg:px-12';
const section = 'py-14 lg:py-20';
const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue';
const button = `inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark ${focus}`;
const outline = `inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-ink hover:border-blue ${focus}`;
const textLink = `inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue hover:underline ${focus}`;
const field = `mt-2 min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm text-ink placeholder:text-slate-600 ${focus}`;
const projects = 'projects-and-home-services.html';
const rental = 'rental-management-services.html';
const contact = (service = 'projects', category = 'general') => `contact-us.html?service=${service}&amp;category=${category}`;
const icons = {
  arrow: 'M4 12h16m-6-6 6 6-6 6', chevron: 'm7 10 5 5 5-5',
  check: 'm5 12 4 4L19 6', plus: 'M12 5v14M5 12h14',
  pin: 'M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 1 1 14 0Zm-4 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  home: 'm3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8',
  tools: 'm14 6 4 4M3 21l9-9M14 3a6 6 0 0 0 7 7l-4-4 1-4M3 3l6 6m-6-6 1 4 3 1m6 7 6 6 3-3-6-6',
  paint: 'M4 3h13v7H4V3Zm13 3h3v8h-9v3m-2 0h4v6H9v-6',
  civil: 'M3 21h18M5 21V4h14v17M9 8h2m2 0h2m-6 4h2m2 0h2m-6 4h2m2 0h2',
  glass: 'M3 3h18v18H3V3Zm9 0v18M3 12h18M6 8l2-2m8 12 2-2',
  renovate: 'm3 11 9-8 9 8M5 10v11h14V10M9 21v-8h6v8M2 4V1m-2 2h4',
  shield: 'm12 2 8 3v6c0 5-8 11-8 11S4 16 4 11V5l8-3Zm-4 9 3 3 5-6',
  key: 'M14 14a6 6 0 1 0-4-10 6 6 0 0 0 4 10Zm-5-1-7 7v2h4v-3h3v-3',
  file: 'M5 2h10l4 4v16H5V2Zm9 0v6h5M8 12h8m-8 4h8',
  mail: 'M3 5h18v14H3V5Zm0 1 9 7 9-7',
  menu: 'M4 6h16M4 12h16M4 18h16',
  people: 'M16 21v-3a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v3m18 0v-3a4 4 0 0 0-3-4M13 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm3-3a4 4 0 0 1 0 8',
  time: 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM12 6v6l4 2',
};
const icon = (name, size = 'h-5 w-5') => `<svg class="${size} shrink-0" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="${icons[name] || icons.home}"/></svg>`;
const arrow = icon('arrow', 'h-4 w-4');
const eyebrow = text => `<p class="mb-3 text-xs font-bold tracking-[2px] text-brand">${text}</p>`;
const heading = text => `<h2 class="text-[30px] leading-tight font-bold tracking-[-1px] text-ink lg:text-[38px]">${text}</h2>`;
const lead = text => `<p class="mt-4 max-w-2xl text-base leading-7 text-copy">${text}</p>`;
const photo = (src, alt, classes = '', lazy = true) => `<img src="${src}" alt="${alt}" ${lazy ? 'loading="lazy"' : 'fetchpriority="high"'} class="${classes}" />`;
const check = text => `<li class="flex items-start gap-2.5 text-sm leading-6 text-copy"><span class="mt-1 text-green-700">${icon('check', 'h-4 w-4')}</span>${text}</li>`;
const routes = [
  ['index', 'Home'], ['about-us', 'About Us'], ['leadership', 'Leadership'],
  ['rental-management-services', 'Rental Management Services'],
  ['projects-and-home-services', 'Projects & Home Services'],
  ['press', 'Press'], ['blogs', 'Blogs'], ['privacy-policy', 'Privacy Policy'],
  ['terms-of-use', 'Terms of Use'], ['contact-us', 'Contact Us'],
];
const navLink = (file, label, current) => `<a href="${file}.html" ${file === current ? 'aria-current="page"' : ''} class="flex min-h-11 items-center rounded px-3 py-2 text-sm font-medium ${file === current ? 'text-brand' : 'text-ink hover:text-brand'} ${focus}">${label}</a>`;
function header(current) {
  const dropdown = (label, items) => `<details data-menu class="group relative"><summary aria-expanded="false" class="flex min-h-11 cursor-pointer list-none items-center gap-1.5 px-2 text-sm font-medium ${focus}">${label}${icon('chevron', 'h-3 w-3')}</summary><div class="absolute top-full left-0 z-30 w-64 rounded-lg border border-slate-200 bg-white p-2 shadow-xl">${items.map(([file, text]) => navLink(file, text, current)).join('\n')}</div></details>`;
  return `<!-- WordPress: extract header/navigation into header.php -->
  <a href="#main-content" class="fixed -top-20 left-4 z-50 rounded bg-ink px-5 py-3 text-sm text-white focus:top-4">Skip to content</a>
  <div class="border-b border-slate-100 bg-[#f8fafb]">
    <div class="${wrap} flex min-h-9 items-center justify-between gap-4 text-xs text-copy">
      <span class="flex items-center gap-1.5">${icon('pin', 'h-3.5 w-3.5')}Caring for homes in <strong class="font-semibold text-ink">Bengaluru &amp; Pune</strong></span>
      <a href="contact-us.html" class="hidden items-center gap-1.5 py-2 hover:text-blue sm:flex">One partner. Complete peace of mind. ${arrow}</a>
    </div>
  </div>
  <header class="relative z-20 border-b border-slate-200 bg-white">
    <div class="${wrap} flex min-h-22 items-center justify-between gap-6">
      <a href="index.html" class="shrink-0 ${focus}" aria-label="YourOwnROOM home"><img data-logo src="/images/logo.png" alt="YourOwnROOM" width="151" height="57" class="h-auto w-[145px] lg:w-[155px]" /></a>
      <nav aria-label="Main navigation" class="hidden items-center gap-3 lg:flex">
        ${navLink('index', 'Home', current)}
        ${dropdown('Services', [['projects-and-home-services', 'Projects & Home Services'], ['rental-management-services', 'Rental Management Services']])}
        ${dropdown('Company', [['about-us', 'About Us'], ['leadership', 'Leadership']])}
        ${dropdown('Resources', [['press', 'Press'], ['blogs', 'Blogs']])}
        ${navLink('contact-us', 'Contact Us', current)}
      </nav>
      <div class="flex items-center gap-4">
        <a href="${contact()}" class="${button.replace('inline-flex', 'hidden sm:inline-flex')}">Get a quote ${arrow}</a>
        <details data-menu data-mobile class="lg:hidden">
          <summary aria-label="Toggle navigation" aria-expanded="false" class="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-md border border-slate-200 ${focus}">${icon('menu')}</summary>
          <nav aria-label="Mobile navigation" class="absolute top-full right-0 left-0 max-h-[75vh] overflow-y-auto border-b border-slate-200 bg-white px-5 py-4 shadow-lg">${[routes[0], routes[4], routes[3], routes[1], routes[2], routes[5], routes[6], routes[9]].map(([file, label]) => navLink(file, label, current)).join('\n')}</nav>
        </details>
      </div>
    </div>
  </header>`;
}
function footer() {
  return `<!-- WordPress: extract footer into footer.php -->
  <footer class="border-t border-slate-200 bg-[#f7f9fb]">
    <div class="${wrap} grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.35fr]">
      <div><a href="index.html" aria-label="YourOwnROOM home" class="${focus} inline-block"><img data-logo src="/images/logo.png" alt="YourOwnROOM" width="145" height="54" loading="lazy" class="w-[145px]" /></a><p class="mt-5 max-w-xs text-sm leading-6 text-copy">Better spaces. Happier homes.<br />Your trusted partner for home services and residential asset management.</p><p class="mt-4 flex items-center gap-2 text-xs font-medium text-copy"><span class="h-2 w-2 rounded-full bg-green-600"></span>Bengaluru &amp; Pune</p></div>
      <div class="flex flex-col items-start"><h2 class="mb-4 text-sm font-bold">Our services</h2><a class="${textLink} font-normal text-copy" href="${projects}">Projects &amp; Home Services</a><a class="${textLink} font-normal text-copy" href="${rental}">Rental Management</a><a class="${textLink} font-normal text-copy" href="${contact()}">Request a quote</a></div>
      <div class="flex flex-col items-start"><h2 class="mb-4 text-sm font-bold">Explore</h2>${[['about-us','About Us'],['leadership','Leadership'],['press','Press'],['blogs','Blogs'],['contact-us','Contact Us']].map(([file,label])=>`<a class="${textLink} font-normal text-copy" href="${file}.html">${label}</a>`).join('')}</div>
      <div><h2 class="mb-4 text-sm font-bold">Let’s talk about your home</h2><a class="${textLink}" href="mailto:pmo@yourownroom.com">pmo@yourownroom.com ${arrow}</a><p class="text-xs text-copy">Projects &amp; Home Services</p><a class="${textLink} mt-2" href="mailto:crm@yourownroom.com">crm@yourownroom.com ${arrow}</a><p class="text-xs text-copy">Rental Management</p><p class="mt-5 text-xs leading-6 text-copy">Mon–Fri: 10 AM–6 PM<br />Sat: 10 AM–1 PM<br />Closed Sundays &amp; public holidays.</p></div>
    </div>
    <div class="${wrap} border-t border-slate-200 py-6">
      <p class="max-w-3xl text-xs leading-6 text-copy">YourOwnROOM Private Limited · B–302, 2nd Floor, 195/A, 12th Main Road, 4th Block, Koramangala, Bangalore, Karnataka, India – 560 034.</p>
      <div class="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-xs text-copy"><p>© ${new Date().getFullYear()} YourOwnROOM Private Limited. All rights reserved.</p><div class="flex gap-6"><a href="privacy-policy.html" class="inline-flex min-h-11 items-center hover:underline ${focus}">Privacy Policy</a><a href="terms-of-use.html" class="inline-flex min-h-11 items-center hover:underline ${focus}">Terms of Use</a></div></div>
    </div>
  </footer>`;
}
const banner = (title = 'A better home starts with a conversation.', text = 'Tell us what you have in mind. We’ll help you find the right way forward.', service = 'projects') => `<section class="${wrap} pb-16"><div class="flex flex-wrap items-center justify-between gap-7 rounded-xl bg-[#edf8fb] px-7 py-9 lg:px-10"><div><h2 class="text-2xl font-bold tracking-tight lg:text-3xl">${title}</h2><p class="mt-3 text-sm leading-6 text-copy">${text}</p></div><a href="${contact(service)}" class="${button}">Let’s get started ${arrow}</a></div></section>`;
function pageHero(title, subtitle, label = 'YOUR HOME. OUR PRIORITY.') {
  return `<section class="border-b border-slate-200 bg-[#f7f9fb] py-12 lg:py-16"><div class="${wrap}"><p class="mb-6 text-xs text-copy"><a href="index.html" class="hover:underline">Home</a><span class="mx-2">/</span>${title}</p>${eyebrow(label)}<h1 class="max-w-4xl text-4xl leading-tight font-bold tracking-[-1.5px] lg:text-5xl">${title}</h1>${lead(subtitle)}</div></section>`;
}
const metricValues = [
  ['10+', 'Years of experience'], ['400+', 'Homes managed'],
  ['1M+', 'Sq. ft. under management'], ['₹400 Cr+', 'Residential assets managed'],
];
const metrics = () => `<section class="border-y border-slate-200 bg-white" aria-label="Company and rental management experience"><div class="${wrap} grid grid-cols-2 gap-y-7 py-8 md:grid-cols-4">${metricValues.map(([v,l],i)=>`<div class="px-2 text-center ${i ? 'md:border-l md:border-slate-200' : ''}"><p class="text-3xl font-bold tracking-tight text-ink">${v}</p><p class="mt-2 text-xs text-copy">${l}</p></div>`).join('')}</div><p class="pb-5 text-center text-xs text-copy">A decade of company &amp; rental management experience.</p></section>`;
const serviceTiles = [
  ['tools', 'Maintenance<br />& repairs', 'maintenance', 'bg-[#fff0ee] text-[#bc3d31]'],
  ['paint', 'Painting &amp;<br />deep cleaning', 'painting', 'bg-[#eaf7fd] text-[#007da3]'],
  ['civil', 'Civil work<br />& interiors', 'civil', 'bg-[#eef8ed] text-[#387c37]'],
  ['glass', 'Fabrication<br />& glasswork', 'fabrication', 'bg-[#fff5e7] text-[#93621b]'],
  ['renovate', 'Property<br />renovation', 'renovation', 'bg-[#f2effb] text-[#7150a0]'],
];
const processData = [
  ['Tell us your needs', 'A small repair or a fresh start? Share your requirements.'],
  ['Assess & plan', 'We review your space and agree on a clear scope and quote.'],
  ['We take it from here', 'Coordinated teams, managed execution and progress updates.'],
  ['Ready for you', 'Review the completed work and move on to enjoying your home.'],
];
function process() {
  return `<section class="bg-[#f7f9fb] ${section}"><div class="${wrap}"><div class="text-center">${eyebrow('FROM TO-DO TO TAKEN CARE OF.')}${heading('Your project. A simpler process.')}${lead('Clear steps, one coordinated team, and fewer things for you to worry about.').replace('max-w-2xl','mx-auto max-w-2xl')}</div><ol class="mt-10 grid gap-8 md:grid-cols-4">${processData.map(([title,text],i)=>`<li class="relative"><span class="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#f1c7c8] bg-[#fff1f1] text-sm font-bold text-brand">0${i+1}</span><h3 class="text-base font-bold">${title}</h3><p class="mt-2 text-sm leading-6 text-copy">${text}</p></li>`).join('')}</ol></div></section>`;
}
const projectGroups = [
  ['maintenance', 'tools', 'Property onboarding, offboarding & maintenance', 'A well-kept home, between tenancies and every day in between.', ['Electrical fittings, plumbing & carpentry', 'Waterproofing & civil finishing repairs', 'Pest control, painting & deep cleaning']],
  ['civil', 'civil', 'Managed civil work & painting', 'Considered improvements, delivered through a coordinated scope of work.', ['Painting, POP & false ceilings', 'Interiors, tiling & granite laying', 'Landscaping, electrical & plumbing fitments']],
  ['fabrication', 'glass', 'Fabrication & glasswork', 'Functional, durable additions made to the approved design and site requirements.', ['Pergolas, metal frames, railings & grills', 'Doors, windows & structural supports', 'Toughened, clear, tinted & sandwich glass']],
  ['renovation', 'renovate', 'Property renovation', 'Give your home a fresh chapter, with one team managing the moving parts.', ['Civil work, interiors & fabrication', 'Painting, ceiling & flooring upgrades', 'Electrical, plumbing & landscaping']],
];
function faq(items) {
  return `<section class="${wrap} ${section}"><div class="mx-auto max-w-3xl text-center">${eyebrow('A LITTLE MORE CLARITY.')}${heading('Your questions, answered.')}</div><div class="mx-auto mt-8 max-w-3xl border-t border-slate-200">${items.map(([q,a])=>`<details class="group border-b border-slate-200"><summary class="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-semibold ${focus}">${q}<span class="text-blue">${icon('plus')}</span></summary><p class="max-w-2xl pb-6 text-sm leading-7 text-copy">${a}</p></details>`).join('')}</div></section>`;
}
function home() {
  return `<section class="relative overflow-hidden bg-[#fbfcfd]">
    <div class="${wrap} grid items-center gap-10 py-11 md:grid-cols-[1fr_1.05fr] lg:gap-14 lg:py-14">
      <div class="min-w-0">
        <span class="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f1d5d4] bg-[#fff4f2] px-3 py-1.5 text-xs font-semibold text-[#b6282a]"><span class="h-1.5 w-1.5 rounded-full bg-brand"></span>PROJECTS &amp; HOME SERVICES</span>
        <h1 class="text-[45px] leading-[1.1] font-bold tracking-[-2px] text-ink lg:text-[62px]">Better spaces.<br /><span class="text-blue">Happier homes.</span></h1>
        <p class="mt-6 max-w-[440px] text-base leading-7 text-copy lg:text-lg lg:leading-8">From everyday fixes to complete transformations,<br class="hidden xl:block" /> we take care of your home. So you don’t have to.</p>
        <div class="mt-7 flex flex-wrap gap-3"><a href="${contact()}" class="${button}">Get a project quote ${arrow}</a><a href="${projects}" class="${outline}">Explore home services</a></div>
        <div class="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs text-copy">${['End-to-end execution','Transparent scope & pricing'].map(t=>`<span class="flex items-center gap-1.5 text-xs"><span class="text-green-700">${icon('check','h-4 w-4')}</span>${t}</span>`).join('')}</div>
      </div>
      <div class="relative min-w-0 pb-5">
        <div class="absolute -top-4 -right-4 h-28 w-28 rounded-full bg-[#edf7fa]"></div>
        ${photo('/images/home-interior.jpg','Illustrative contemporary living room with warm wood interiors and natural light','relative h-[290px] w-full rounded-xl object-cover md:h-[350px] lg:h-[390px]',false)}
        <div class="absolute bottom-0 left-4 flex items-center gap-3 rounded-lg border border-slate-100 bg-white px-4 py-3.5 shadow-lg shadow-slate-900/5 md:-left-5">
          <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#ebf7ec] text-green-700">${icon('shield','h-6 w-6')}</span>
          <div><p class="text-sm font-bold">One team. Every detail.</p><p class="mt-1 text-xs text-copy">Your home is in experienced hands.</p></div>
        </div>
        <span class="absolute right-3 bottom-8 rounded bg-white px-2 py-1 text-xs text-slate-700">Design inspiration</span>
      </div>
    </div>
  </section>
  <section class="${wrap} pb-12 pt-10">
    <div class="mb-6 flex flex-wrap items-end justify-between gap-3"><div><h2 class="text-2xl font-bold tracking-tight">What can we take care of?</h2><p class="mt-2 text-sm text-copy">A little repair. A big transformation. We’re here for both.</p></div><a href="${projects}" class="${textLink}">View all services ${arrow}</a></div>
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:gap-4">${serviceTiles.map(([i,title,id,color])=>`<a href="${projects}#${id === 'painting' ? 'painting' : id}" class="group flex min-h-40 flex-col items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-5 text-center transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md motion-reduce:transform-none ${focus}"><span class="mb-3 flex h-14 w-14 items-center justify-center rounded-full ${color}">${icon(i,'h-7 w-7')}</span><span class="text-sm leading-5 font-semibold">${title}</span></a>`).join('')}</div>
  </section>
  ${metrics()}
  <section class="${wrap} grid items-center gap-10 ${section} md:grid-cols-2 lg:gap-20">
    <div class="relative overflow-hidden rounded-xl bg-[#f3f5f7]">
      ${photo('/images/home-interior.jpg','Illustrative renovated home with custom wood cabinetry','h-[350px] w-full object-cover object-left lg:h-[410px]')}
      <div class="absolute bottom-0 left-0 right-0 bg-white p-5"><p class="flex items-center gap-2 text-sm font-semibold">${icon('home')}Thoughtful spaces. Expertly managed.</p><p class="mt-1 text-xs text-copy">Interior inspiration · not a completed project</p></div>
    </div>
    <div>${eyebrow('PROJECTS & HOME SERVICES')}${heading('Your vision.<br />Our hands-on expertise.')}${lead('A fresh coat of paint, a better-functioning space, or a complete home makeover. We bring the right people and a clear plan together.')}<ul class="mt-6 space-y-3">${['Repairs, maintenance & move-in readiness','Renovation, civil work & interiors','Managed vendors, work orders & progress reporting'].map(check).join('')}</ul><a href="${projects}" class="${textLink} mt-6">Discover Projects &amp; Home Services ${arrow}</a></div>
  </section>
  ${process()}
  <section class="${wrap} ${section}">
    <div class="mb-9 flex flex-wrap items-end justify-between gap-5"><div>${eyebrow('LOCAL EXPERIENCE. LASTING RELATIONSHIPS.')}${heading('Care that goes beyond the work.')}</div><p class="max-w-sm text-sm leading-6 text-copy">Serving homeowners and residential communities across Bengaluru and Pune for over a decade.</p></div>
    <div class="grid gap-5 md:grid-cols-3">${[['shield','One accountable partner','From scope to handover, one team to bring all the moving parts together.'],['file','Clarity from day one','An agreed scope, documented work orders and coordinated invoicing.'],['people','Experienced local teams','On-ground knowledge and vendor coordination for your home’s needs.']].map(([i,t,d])=>`<article class="rounded-lg border border-slate-200 p-6"><span class="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#eaf7fb] text-blue">${icon(i,'h-6 w-6')}</span><h3 class="text-lg font-bold">${t}</h3><p class="mt-3 text-sm leading-7 text-copy">${d}</p></article>`).join('')}</div>
  </section>
  <section class="bg-[#f7f9fb] ${section}"><div class="${wrap} grid items-center gap-9 md:grid-cols-[1.15fr_1fr] lg:gap-20"><div>${eyebrow('ALSO HERE FOR YOUR RENTAL JOURNEY')}${heading('Own the home.<br />Leave the everyday to us.')}${lead('Our Rental Management Services take the effort out of ownership—from finding the right tenants to renewals and property upkeep.')}<a href="${rental}" class="${textLink} mt-5">Explore Rental Management ${arrow}</a></div><div class="rounded-xl border border-slate-200 bg-white p-7"><span class="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#ebf7ec] text-green-700">${icon('key','h-6 w-6')}</span><h3 class="text-xl font-bold">Your property. Our priority.</h3><ul class="mt-5 space-y-3">${['Tenant discovery, KYC & onboarding','Rent collections, agreements & renewals','Inspections, upkeep & exit settlements'].map(check).join('')}</ul></div></div></section>
  <section class="${wrap} ${section} text-center"><div class="mx-auto max-w-3xl">${eyebrow('GET TO KNOW YOUROWNROOM')}${heading('We care for your home like it’s our own.')}${lead('We’re building a trusted residential asset management company that helps homeowners, NRIs, investors and developers get more from their most valuable asset.').replace('max-w-2xl','mx-auto max-w-2xl')}<a href="about-us.html" class="${textLink} mt-5">Our story ${arrow}</a></div></section>
  ${banner()}`;
}
function projectsPage() {
  return `${pageHero('Projects &amp; Home Services','From everyday upkeep to complete home transformations. One team to plan, coordinate and deliver.','IMPROVE. RESTORE. TRANSFORM.')}
  <section class="${wrap} grid items-center gap-10 ${section} md:grid-cols-2"><div>${eyebrow('YOUR HOME, TAKEN CARE OF.')}${heading('Small fixes.<br />Big possibilities.')}${lead('We support property onboarding, offboarding, maintenance and managed residential projects in Bengaluru and Pune. Get a clear scope, coordinated vendors and visibility through execution.')}<a href="${contact()}" class="${button} mt-6">Get a project quote ${arrow}</a></div><figure>${photo('/images/home-interior.jpg','Illustrative home renovation and interior design','h-[320px] w-full rounded-xl object-cover',false)}<figcaption class="mt-2 text-xs text-copy">Interior inspiration; not a company case study.</figcaption></figure></section>
  <section class="${wrap} pb-16"><div class="mb-8">${eyebrow('OUR SERVICES')}${heading('The right support for every space.')}</div><div class="grid gap-6 md:grid-cols-2">${projectGroups.map(([id,i,title,text,items])=>`<article id="${id}" class="scroll-mt-8 rounded-xl border border-slate-200 p-7"><span class="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#eaf7fb] text-blue">${icon(i,'h-6 w-6')}</span><h3 class="text-xl font-bold">${title}</h3><p class="mt-3 text-sm leading-7 text-copy">${text}</p>${id==='maintenance'?'<span id="painting" class="scroll-mt-8"></span>':''}<ul class="mt-5 space-y-3">${items.map(check).join('')}</ul><a class="${textLink} mt-5" href="${contact('projects',id)}">Discuss your requirements ${arrow}</a></article>`).join('')}</div></section>
  ${process()}
  <section class="${wrap} ${section}"><div class="grid gap-8 md:grid-cols-2"><div>${eyebrow('THE DETAILS MAKE THE DIFFERENCE')}${heading('Execution, without<br />the juggling act.')}${lead('Our project coordination brings quotation management, vendor management, work orders, planning, invoicing and issue tracking into a defined engagement.')}</div><ul class="space-y-4 rounded-xl bg-[#f7f9fb] p-7">${['Scope of work agreed before execution','Planning and coordination with empanelled vendors','Work-order and invoice management','Issue tracking, reporting and handover review'].map(check).join('')}</ul></div></section>
  <section class="border-y border-slate-200 bg-[#fbfcfd] py-12"><div class="${wrap}">${eyebrow('EXPERIENCE ACROSS RESIDENTIAL COMMUNITIES')}${heading('Homes and communities we’ve worked in.')}<p class="mt-4 max-w-3xl text-sm leading-7 text-copy">Our supplied project credentials include work associated with the following communities and organisations. Names are references to service experience, not endorsements.</p><div class="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">${['Adarsh Palm Retreat','Prestige Lakeside Habitat','Embassy Pristine','Brigade Exotica','Nambiar','NVT','Ganga Orchard','Habitat Crest'].map(n=>`<p class="rounded-md border border-slate-200 bg-white p-4 text-sm font-medium">${n}</p>`).join('')}</div></div></section>
  ${faq([['Which cities do you serve?','Projects and Home Services are offered in Bengaluru and Pune. The team will confirm the location and scope for your requirements.'],['Can I request only painting or a repair?','Yes. The service scope includes painting, deep cleaning and repairs as well as larger managed civil, fabrication and renovation projects.'],['How are pricing and timelines decided?','Scope, specifications, materials, timelines, costs and payment milestones are agreed separately through a quotation, work order or service agreement.'],['Who manages the work?','YourOwnROOM coordinates project planning, vendors, work orders, invoicing and issue tracking within the agreed scope of engagement.']])}
  ${banner()}`;
}
function rentalPage() {
  const groups = [
    ['key','Discovery & tenant management','Property listing, tenant discovery, KYC verification, lease and rental agreements, onboarding, renewals, collections and receipts.'],
    ['home','Inventory & property management','Property onboarding, inspections, audits, inventory, rental summaries, property offboarding, settlements and spend analytics.'],
    ['tools','Service request management','Service requests and tracking, operations coordination, reports and communication.'],
    ['file','Invoicing & payment processing','Receivables and payables, payment generation, property P&L and TDS filing within the agreed service scope.'],
  ];
  return `${pageHero('Rental Management Services','Your property deserves more than occasional attention. We handle the day-to-day so you can focus on the bigger picture.','OWNERSHIP, WITHOUT THE EVERYDAY EFFORT.')}
  <section class="${wrap} grid items-center gap-10 ${section} md:grid-cols-2"><div>${eyebrow('ONE PARTNER FOR YOUR RENTAL JOURNEY')}${heading('From the first tenant<br />to the next renewal.')}${lead('For homeowners, NRIs and investors, our team brings tenant and property management together—from discovery and onboarding to upkeep and exit settlements.')}<a href="${contact('rental')}" class="${button} mt-6">Discuss my property ${arrow}</a></div><figure>${photo('/images/residences.jpg','Illustrative residential apartment building surrounded by greenery','h-[320px] w-full rounded-xl object-cover',false)}<figcaption class="mt-2 text-xs text-copy">Illustrative residential architecture; not an available property.</figcaption></figure></section>
  ${metrics()}
  <section class="${wrap} ${section}">${eyebrow('END-TO-END RENTAL OPERATIONS')}${heading('Everyday details. Professionally managed.')}<div class="mt-9 grid gap-6 md:grid-cols-2">${groups.map(([i,t,d])=>`<article class="rounded-xl border border-slate-200 p-7"><span class="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#edf7ed] text-green-700">${icon(i,'h-6 w-6')}</span><h3 class="text-xl font-bold">${t}</h3><p class="mt-4 text-sm leading-7 text-copy">${d}</p></article>`).join('')}</div></section>
  <section class="bg-[#f7f9fb] ${section}"><div class="${wrap}">${eyebrow('A CONNECTED RENTAL JOURNEY')}${heading('One team, through every stage.')}<ol class="mt-8 grid gap-5 md:grid-cols-4">${[['Onboard your property','Agree the scope and document property details and inventory.'],['Find & onboard tenants','Discovery, verification and rental documentation.'],['Manage the everyday','Collections, maintenance coordination and property reporting.'],['Renew or settle','Renewals, offboarding and exit settlements.']].map(([t,d],i)=>`<li class="rounded-lg border border-slate-200 bg-white p-6"><p class="mb-4 text-sm font-bold text-blue">0${i+1}</p><h3 class="font-bold">${t}</h3><p class="mt-3 text-sm leading-6 text-copy">${d}</p></li>`).join('')}</ol></div></section>
  <section class="${wrap} ${section}">${eyebrow('LOCAL KNOWLEDGE, BROAD EXPERIENCE')}${heading('Experience across leading developments.')}${lead('Our rental service experience covers homes in developments by Prestige, Brigade, Godrej, Assetz, Embassy, Adarsh, Raheja, Amanora, Gera and more across Bengaluru and Pune.')}<p class="mt-4 text-xs text-copy">Developer names describe property-management experience, not a guarantee of partnership or endorsement.</p></section>
  ${faq([['What does the management service include?','The offering includes tenant discovery, onboarding, property operations, invoicing, collections and renewals. The exact responsibilities and fees are set out in your service agreement.'],['Can you help with property maintenance?','Yes. Property upkeep and service-request coordination are part of the offering. Larger improvements can be discussed with the Projects & Home Services team.'],['Do you guarantee rent or investment returns?','No guarantee of rental yield, occupancy or future value is made on this website. Commercial terms and service responsibilities are agreed separately.']])}
  ${banner('Make ownership feel simpler.','Tell us about your property in Bengaluru or Pune.','rental')}`;
}
function aboutPage() {
  return `${pageHero('About YourOwnROOM','One trusted partner for your home’s everyday needs and long-term potential.','A HOME IS PERSONAL. SO IS OUR APPROACH.')}
  <section class="${wrap} grid gap-10 ${section} md:grid-cols-[0.85fr_1.2fr] lg:gap-20"><div>${eyebrow('OUR STORY')}${heading('Owning a home is easy.<br />Managing it well isn’t.')}<a href="leadership.html" class="${textLink} mt-6">Meet our leadership ${arrow}</a></div><div class="space-y-5 text-base leading-8 text-copy"><p>YourOwnROOM is building India’s most trusted residential real estate asset management company: a technology-driven, asset-light platform that helps homeowners, investors and developers maximise occupancy, rental yield, asset upkeep and long-term capital appreciation.</p><p>Homeowners often juggle brokers, tenants, repairs and renewals, with no single partner to rely on. We bring those moving parts together—with professional rental management, projects and home services.</p><p>For over 10 years, we have managed 400+ homes covering more than 1 million sq. ft. and worth ₹400 Cr+, across Bengaluru and Pune. Homeowners, NRIs, investors and developers trust us to find tenants, care for their properties and handle renovations and renewals.</p><p>Our technology platform helps maintain consistent standards and visibility. Whether you own one apartment or a hundred, we’ll treat your home like it’s our own.</p></div></section>
  ${metrics()}
  <section class="${wrap} ${section}">${eyebrow('WHAT WE BELIEVE')}${heading('Good homes deserve consistent care.')}<div class="mt-9 grid gap-6 md:grid-cols-3">${[['home','Care for the asset','Proactive upkeep and considered improvements that support a home’s long-term value.'],['people','Own the responsibility','One team to coordinate people, processes and the details owners should not have to chase.'],['file','Keep things clear','Technology-enabled operations, reporting and communication throughout the engagement.']].map(([i,t,d])=>`<article class="rounded-xl border border-slate-200 p-7"><span class="text-blue">${icon(i,'h-7 w-7')}</span><h3 class="mt-5 text-lg font-bold">${t}</h3><p class="mt-3 text-sm leading-7 text-copy">${d}</p></article>`).join('')}</div><div class="mt-8 flex flex-wrap gap-4"><a href="${projects}" class="${button}">Projects &amp; Home Services ${arrow}</a><a href="${rental}" class="${outline}">Rental Management ${arrow}</a></div></section>${banner()}`;
}
function leadershipPage() {
  const people = [
    ['PT','Prabhat Kumar Tiwary','Founder, MD & Group CEO','https://www.linkedin.com/in/prabhatkumartiwary','Prabhat is an alumnus of Stanford Business School with over 30 years of experience in technology enterprises and startups. He has held senior leadership roles at Xchanging, MphasiS, Zensar and Hewlett-Packard, building and managing IT services P&Ls of up to $100M. He holds a bachelor’s degree in computer engineering from Birla Institute of Technology, Ranchi. He is passionate about advising technology startups and enjoys travelling and exploring new places.'],
    ['SS','Sanjay Singh','Director, COO & CTO','https://www.linkedin.com/in/sanjay--k--singh','Sanjay has over 30 years of experience in real estate rental and property management, business operations and technology. His leadership experience includes Xchanging/DXC, HP, Sasken and Hinduja across India, the US, UK and France. He brings deep knowledge of ERP, SaaS, analytical reporting and accounting, and believes technology is key to a differentiated service.'],
    ['VD','Venkat Dasari','Director','','Venkat is an IT services executive with extensive global sales and delivery experience. His background spans P&L management, executive relationships, operations and large global outsourcing programmes at Fortune 500 clients. He has a strong interest in residential real estate in the US and India, where he has made several investments.'],
    ['RC','Ravi Chaturvedi','Advisor & Mentor','','Ravi is a former President of P&G and former Group Chief Executive of Jet Airways. He is a consultant and advisor to the President and Chief Learning Officer of Nitto Denko Corporation in Osaka, Japan. His expertise spans the consumer and food industries. He was a Senior Fellow at Wharton School of Business and a lecturer in the Organizational Dynamics Program at the University of Pennsylvania, teaching Globally Capable Leadership.'],
  ];
  return `${pageHero('Our Leadership','Experienced minds. A shared commitment to better property ownership.','THE PEOPLE BEHIND THE PROMISE.')}<section class="${wrap} ${section}"><div class="grid gap-7 md:grid-cols-2">${people.map(([initials,name,role,url,bio])=>`<article class="rounded-xl border border-slate-200 p-7 lg:p-8"><div class="flex items-center gap-5"><span aria-hidden="true" class="flex h-18 w-18 shrink-0 items-center justify-center rounded-full bg-[#eaf7fb] text-xl font-semibold text-blue">${initials}</span><div><h2 class="text-xl font-bold">${name}</h2><p class="mt-2 text-sm font-medium text-blue">${role}</p></div></div><p class="mt-6 text-sm leading-7 text-copy">${bio}</p>${url?`<a href="${url}" target="_blank" rel="noopener noreferrer" class="${textLink} mt-4">LinkedIn <span aria-hidden="true">↗</span><span class="sr-only">(opens in new tab)</span></a>`:''}</article>`).join('')}</div></section>${banner()}`;
}
function resourcePage(type) {
  const press = type === 'press';
  return `${pageHero(press ? 'Press & Media' : 'From the YourOwnROOM Blog',press ? 'Company news, perspectives and coverage from the world of residential asset management.' : 'Ideas and perspectives on taking better care of your home.','NEWS. IDEAS. PERSPECTIVES.')}
  <section class="${wrap} ${section}"><div class="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-[#fbfcfd] px-7 py-12 text-center"><span class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#eaf7fb] text-blue">${icon(press?'file':'home','h-8 w-8')}</span><h2 class="text-2xl font-bold">${press?'Our press collection is being updated.':'Good reads are on their way.'}</h2><p class="mx-auto mt-4 max-w-lg text-base leading-7 text-copy">${press?'Individual press stories will appear here once their publication details and links are available. You can explore our existing press page in the meantime.':'We’re preparing articles about home improvement, maintenance and rental ownership. No articles have been published in this template yet.'}</p>${press?`<a href="https://yourownroom.com/page/14/Press" target="_blank" rel="noopener noreferrer" class="${outline} mt-7">Visit our existing press page <span aria-hidden="true">↗</span><span class="sr-only">(opens in new tab)</span></a>`:`<a href="${projects}" class="${outline} mt-7">Explore home services ${arrow}</a>`}</div></section>${banner(press?'For company and service enquiries.':'Have a home project in mind?',press?'Reach the right team through our contact page.':'Our team can help you find the right next step.')}`;
}
function legalPage(type) {
  const paragraphs = JSON.parse(readFileSync(new URL('../content/legal.json', import.meta.url), 'utf8'))[type];
  const sections = [];
  for (const text of paragraphs) {
    if (/^\d+\.\s/.test(text)) sections.push({ title: text, paragraphs: [] });
    else if (sections.length) sections[sections.length-1].paragraphs.push(text);
  }
  const title = type === 'privacy' ? 'Privacy Policy' : 'Terms of Use';
  return `${pageHero(title,'Please read the following information about your use of our website and services.','LEGAL & WEBSITE INFORMATION')}
  <div class="${wrap} grid items-start gap-10 py-12 lg:grid-cols-[280px_1fr]">
    <aside class="rounded-xl border border-slate-200 bg-[#f7f9fb] p-6"><h2 class="mb-4 text-base font-bold">On this page</h2><nav aria-label="${title} contents" class="space-y-1">${sections.map((s,i)=>`<a href="#section-${i+1}" class="flex min-h-11 items-center py-2 text-sm leading-5 text-copy hover:text-blue ${focus}">${esc(s.title)}</a>`).join('')}</nav></aside>
    <article class="min-w-0 max-w-3xl"><p class="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">Template review notice: the supplied policy text is reproduced below. Operational details and legal approval must be confirmed before production publication. This static template does not send enquiries or run analytics.</p>${sections.map((s,i)=>`<section id="section-${i+1}" class="mb-9 scroll-mt-8"><h2 class="mb-4 text-xl font-bold">${esc(s.title)}</h2>${s.paragraphs.map(p=>`<p class="mb-4 text-sm leading-7 text-copy">${esc(p)}</p>`).join('\n')}</section>`).join('\n')}</article>
  </div>`;
}
function contactPage() {
  return `${pageHero('Let’s talk about your home.','A project to plan, a property to manage, or just a question? We’re here to help.','THE RIGHT TEAM. THE RIGHT SUPPORT.')}
  <section class="${wrap} grid items-start gap-10 ${section} lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
    <div class="rounded-xl border border-slate-200 bg-white p-6 lg:p-8"><h2 class="text-2xl font-bold">Tell us what you need</h2><p class="mt-3 text-sm leading-6 text-copy">Static template preview: the form saves only in this browser. To contact our team, use the email option after completing your details.</p>
    <noscript><p class="mt-5 rounded bg-amber-50 p-4 text-sm text-amber-900">JavaScript is disabled. This preview form cannot save a draft. Please email pmo@yourownroom.com or crm@yourownroom.com directly.</p></noscript>
    <form id="enquiry-form" class="mt-6 space-y-5">
      <div class="grid gap-5 sm:grid-cols-2"><label class="text-sm font-medium" for="service">I’m interested in<select id="service" name="service" class="${field}"><option value="projects">Projects &amp; Home Services</option><option value="rental">Rental Management</option></select></label><label class="text-sm font-medium" for="category">Service requirement<select id="category" name="category" class="${field}"><option value="general">Not sure yet — help me choose</option><option value="maintenance">Maintenance &amp; repairs</option><option value="painting">Painting &amp; deep cleaning</option><option value="civil">Civil work &amp; interiors</option><option value="fabrication">Fabrication &amp; glasswork</option><option value="renovation">Property renovation</option></select></label></div>
      <div class="grid gap-5 sm:grid-cols-2"><label class="text-sm font-medium" for="name">Your name <span class="text-brand">*</span><input id="name" name="name" required maxlength="100" autocomplete="name" placeholder="Full name" class="${field}" /></label><label class="text-sm font-medium" for="email">Email address <span class="text-brand">*</span><input id="email" name="email" required type="email" maxlength="200" autocomplete="email" placeholder="you@example.com" class="${field}" /></label></div>
      <div class="grid gap-5 sm:grid-cols-2"><label class="text-sm font-medium" for="phone">Phone number <span class="text-brand">*</span><input id="phone" name="phone" required type="tel" pattern="[+0-9 ()\\-]{10,18}" title="Enter a phone number using 10 to 18 digits, spaces, +, hyphens or parentheses." maxlength="18" autocomplete="tel" placeholder="+91" class="${field}" /></label><label class="text-sm font-medium" for="city">City<select id="city" name="city" class="${field}"><option>Bengaluru</option><option>Pune</option></select></label></div>
      <label class="block text-sm font-medium" for="message">Tell us a little more <span class="text-brand">*</span><textarea id="message" name="message" required maxlength="3000" rows="4" placeholder="What would you like us to take care of?" class="${field} resize-y"></textarea></label>
      <label class="flex items-start gap-3 text-sm leading-6 text-copy"><input type="checkbox" required name="acknowledgement" class="mt-1 h-5 w-5 shrink-0 accent-brand" /> <span>I understand this preview stores my details locally and does not send them to YourOwnROOM. <a href="privacy-policy.html" class="text-blue underline">Privacy Policy</a></span></label>
      <p id="form-status" hidden role="status" aria-live="polite" tabindex="-1" class="rounded-md border border-blue/25 bg-[#edf8fb] p-4 text-sm leading-6 text-ink"></p>
      <button type="submit" disabled class="${button} w-full disabled:cursor-not-allowed disabled:bg-slate-600">Save enquiry in this browser ${arrow}</button>
      <a id="email-enquiry" href="mailto:pmo@yourownroom.com" class="${outline} w-full">${icon('mail','h-4 w-4')}Open in email app</a>
      <p class="text-xs leading-6 text-copy">The email option opens your mail app. Review and send the message there; opening it does not confirm delivery.</p>
      <button id="clear-enquiries" type="button" class="min-h-11 text-sm text-copy underline ${focus}">Clear local enquiry drafts</button>
    </form></div>
    <aside class="space-y-7"><div class="rounded-xl bg-[#f7f9fb] p-7"><h2 class="text-xl font-bold">Reach the right team</h2><div class="mt-5 border-b border-slate-200 pb-4"><h3 class="text-sm font-semibold">Projects &amp; Home Services</h3><p class="mt-1 text-xs text-copy">Program Management Office</p><a class="${textLink}" href="mailto:pmo@yourownroom.com">pmo@yourownroom.com ${arrow}</a></div><div class="border-b border-slate-200 py-4"><h3 class="text-sm font-semibold">Rental Management Services</h3><a class="${textLink}" href="mailto:crm@yourownroom.com">crm@yourownroom.com ${arrow}</a></div><div class="pt-4"><h3 class="text-sm font-semibold">Escalation</h3><a class="${textLink} break-all" href="mailto:escalation@yourownroom.com">escalation@yourownroom.com ${arrow}</a></div></div>
    <div class="px-2"><span class="mb-4 inline-flex text-blue">${icon('pin','h-6 w-6')}</span><h2 class="text-lg font-bold">Bangalore · Head Office</h2><p class="mt-3 text-sm leading-7 text-copy"><strong class="font-semibold text-ink">YourOwnROOM Private Limited</strong><br />B–302, 2nd Floor, 195/A, 12th Main Road,<br />4th Block, Koramangala, Bangalore,<br />Karnataka, India – 560 034.</p><p class="mt-4 text-sm leading-7 text-copy"><strong class="font-semibold text-ink">PropShield Technologies Private Limited</strong><br />100% subsidiary of YourOwnROOM Private Limited.<br />Registered at the same address.</p></div>
    <div class="rounded-xl border border-slate-200 p-6"><h2 class="flex items-center gap-2 text-base font-bold">${icon('time')}Office hours</h2><dl class="mt-4 space-y-3 text-sm text-copy"><div class="flex flex-wrap justify-between gap-2"><dt>Monday–Friday</dt><dd>10:00 AM–6:00 PM</dd></div><div class="flex flex-wrap justify-between gap-2"><dt>Saturday</dt><dd>10:00 AM–1:00 PM</dd></div></dl><p class="mt-4 text-xs leading-6 text-copy">Closed on Sundays and public holidays.</p></div></aside>
  </section>`;
}
const descriptions = {
  index:'Projects, renovations, repairs and home services in Bengaluru and Pune, with professional rental management from YourOwnROOM.',
  'about-us':'Meet YourOwnROOM, a residential asset management company serving homeowners, investors and developers in Bengaluru and Pune.',
  leadership:'Meet the leadership team behind YourOwnROOM and its residential asset management and home services.',
  'projects-and-home-services':'Explore maintenance, painting, civil work, fabrication, glasswork and property renovation with YourOwnROOM.',
  'rental-management-services':'Professional tenant discovery, property operations, rent collection and rental management in Bengaluru and Pune.',
  press:'Explore YourOwnROOM press resources and company information.',
  blogs:'Home improvement and rental ownership perspectives from YourOwnROOM. Articles coming soon.',
  'privacy-policy':'Read the supplied YourOwnROOM Privacy Policy and information about personal data and website use.',
  'terms-of-use':'Read the YourOwnROOM Terms of Use for website access and property-related services.',
  'contact-us':'Contact the YourOwnROOM projects, home services and rental management teams in Bengaluru and Pune.',
};
const bodies = {
  index:home, 'about-us':aboutPage, leadership:leadershipPage,
  'projects-and-home-services':projectsPage, 'rental-management-services':rentalPage,
  press:()=>resourcePage('press'), blogs:()=>resourcePage('blogs'),
  'privacy-policy':()=>legalPage('privacy'), 'terms-of-use':()=>legalPage('terms'),
  'contact-us':contactPage,
};
for (const [file, title] of routes) {
  writeFileSync(new URL(`../${file}.html`, import.meta.url), `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(file === 'index' ? 'YourOwnROOM | Projects, Home Services & Rental Management' : title + ' | YourOwnROOM')}</title>
  <meta name="description" content="${esc(descriptions[file])}" />
  <link rel="icon" href="/images/logo.png" />
  <link rel="stylesheet" href="./src/index.css" />
  <script type="module" src="./src/site.js"></script>
</head>
<body class="overflow-x-hidden bg-white font-sans text-ink antialiased">
${header(file)}
<main id="main-content" tabindex="-1">
${bodies[file]()}
</main>
${footer()}
</body>
</html>
`);
}
console.log('Generated all 10 standalone HTML pages.');
