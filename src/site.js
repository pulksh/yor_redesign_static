// Progressive enhancement only. All page content and navigation are static HTML.
const dropdowns = [...document.querySelectorAll('details[data-menu]')];
for (const item of dropdowns) {
  const summary = item.querySelector('summary');
  item.addEventListener('toggle', () => {
    summary?.setAttribute('aria-expanded', String(item.open));
    if (item.open && !item.hasAttribute('data-mobile')) {
      dropdowns.forEach(other => {
        if (other !== item && !other.contains(item) && !item.contains(other)) other.open = false;
      });
    }
  });
}
document.addEventListener('click', event => {
  dropdowns.forEach(item => { if (!item.contains(event.target)) item.open = false; });
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  const openMenu = dropdowns.filter(item => item.open).pop();
  if (openMenu) {
    openMenu.open = false;
    openMenu.querySelector('summary')?.focus();
  }
});
document.querySelectorAll('img').forEach(image => {
  const fallback = () => {
    const replacement = document.createElement('span');
    replacement.className = image.className + ' inline-flex items-center justify-center bg-slate-100 p-6 text-center text-sm text-slate-700';
    replacement.setAttribute('role', 'img');
    replacement.setAttribute('aria-label', image.alt);
    replacement.innerHTML = '<svg class="h-12 w-12 shrink-0" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m3 11 9-8 9 8M5 10v11h14V10M9 21v-8h6v8"/></svg><span class="ml-3">YourOwnROOM · ' + (image.dataset.logo ? 'Homes, cared for.' : 'Home inspiration') + '</span>';
    image.replaceWith(replacement);
  };
  image.addEventListener('error', fallback, { once: true });
  if (image.complete && image.naturalWidth === 0) fallback();
});

const form = document.querySelector('#enquiry-form');
if (form) {
  // Disabled in HTML so a no-JavaScript visit cannot accidentally GET personal data.
  form.querySelector('button[type="submit"]').disabled = false;
  const service = form.elements.namedItem('service');
  const category = form.elements.namedItem('category');
  const params = new URLSearchParams(location.search);
  const categories = {
    projects: [
      ['general', 'Not sure yet — help me choose'],
      ['maintenance', 'Maintenance & repairs'],
      ['painting', 'Painting & deep cleaning'],
      ['civil', 'Civil work & interiors'],
      ['fabrication', 'Fabrication & glasswork'],
      ['renovation', 'Property renovation'],
    ],
    rental: [
      ['general', 'End-to-end rental management'],
      ['tenant', 'Tenant discovery & onboarding'],
      ['property', 'Property inspections & upkeep'],
      ['payments', 'Rent collection & renewals'],
    ],
  };
  const status = document.querySelector('#form-status');
  const emailLink = document.querySelector('#email-enquiry');
  const showStatus = message => {
    status.textContent = message;
    status.hidden = false;
  };
  function fillCategories(preferred = 'general') {
    category.replaceChildren(...categories[service.value].map(([value, label]) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label;
      return option;
    }));
    if (categories[service.value].some(([value]) => value === preferred)) category.value = preferred;
    updateEmail();
  }
  function updateEmail() {
    const values = Object.fromEntries(new FormData(form));
    const address = service.value === 'rental' ? 'crm@yourownroom.com' : 'pmo@yourownroom.com';
    const subject = 'Website enquiry: ' + (service.value === 'rental' ? 'Rental Management' : 'Projects & Home Services');
    const body = `Name: ${values.name || ''}\nEmail: ${values.email || ''}\nPhone: ${values.phone || ''}\nCity: ${values.city || ''}\nService: ${category.selectedOptions[0]?.textContent || ''}\n\n${values.message || ''}`;
    emailLink.href = `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  if (Object.hasOwnProperty.call(categories, params.get('service'))) service.value = params.get('service');
  fillCategories(params.get('category') || 'general');
  service.addEventListener('change', () => fillCategories());
  form.addEventListener('input', updateEmail);
  form.addEventListener('change', updateEmail);
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    if (!String(data.name).trim() || !String(data.message).trim()) {
      showStatus('Please enter your name and a short message, not just spaces.');
      return;
    }
    try {
      let existing = [];
      try {
        const stored = JSON.parse(localStorage.getItem('yor-template-enquiries') || '[]');
        if (Array.isArray(stored)) existing = stored;
      } catch { /* A damaged draft is replaced by the new valid draft. */ }
      localStorage.setItem('yor-template-enquiries', JSON.stringify([...existing, { ...data, createdAt: new Date().toISOString() }]));
      showStatus('Saved in this browser only — not sent to YourOwnROOM. Use “Open in email app” below to contact the team. Your mail app must complete delivery.');
      updateEmail();
    } catch {
      showStatus('This browser cannot save your enquiry. Nothing was sent. Use “Open in email app” or email the team directly.');
    }
  });
  document.querySelector('#clear-enquiries').addEventListener('click', () => {
    try {
      localStorage.removeItem('yor-template-enquiries');
      // Remove drafts saved by the superseded React prototype as well.
      localStorage.removeItem('yor-enquiries');
      form.reset();
      fillCategories();
      showStatus('Local enquiry drafts cleared. The form has been reset.');
    } catch { showStatus('Browser storage is unavailable. You can clear site data using your browser settings.'); }
  });
}
