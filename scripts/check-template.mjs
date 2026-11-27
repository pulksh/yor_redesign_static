import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const pages = [
  'index', 'about-us', 'leadership', 'rental-management-services',
  'projects-and-home-services', 'press', 'blogs', 'privacy-policy',
  'terms-of-use', 'contact-us',
];
const titles = new Set();
const documents = new Map(pages.map(page => [page + '.html', readFileSync(page + '.html', 'utf8')]));
for (const [file, html] of documents) {
  assert.match(html, /<!doctype html>/i, `${file}: doctype`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${file}: one H1`);
  assert.match(html, /<main id="main-content"/, `${file}: landmark`);
  assert.match(html, /<meta name="description"/, `${file}: description`);
  assert.doesNotMatch(html, /src\/main\.tsx|react-dom|createRoot|Buy \/ Sell/, `${file}: no React or marketplace`);
  const title = html.match(/<title>(.*?)<\/title>/)[1];
  assert(!titles.has(title), `${file}: unique title`);
  titles.add(title);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${file}: unique ids`);
  for (const [, href] of html.matchAll(/\bhref="([^"]+)"/g)) {
    if (/^(https?:|mailto:)/.test(href)) continue;
    const [target, fragment] = href.replace(/&amp;/g, '&').split('#');
    const filename = target.split('?')[0];
    if (filename.endsWith('.html')) assert(documents.has(filename), `${file}: broken page link ${href}`);
    if (fragment) {
      const doc = filename ? documents.get(filename) : html;
      assert(doc?.includes(`id="${fragment}"`), `${file}: broken anchor ${href}`);
    }
  }
  for (const [, src] of html.matchAll(/(?:src|href)="(\/images\/[^"]+)"/g)) {
    assert(existsSync('public' + src), `${file}: missing asset ${src}`);
  }
  assert(existsSync('dist/' + file), `${file}: missing build output`);
  const built = readFileSync('dist/' + file, 'utf8');
  assert.doesNotMatch(built, /react-dom|createRoot|src\/main/, `${file}: React in build`);
}
const legal = JSON.parse(readFileSync('content/legal.json', 'utf8'));
const escape = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
for (const [key, file] of [['privacy', 'privacy-policy.html'], ['terms', 'terms-of-use.html']]) {
  for (const paragraph of legal[key]) {
    assert(documents.get(file).includes(escape(paragraph)), `${file}: missing source paragraph`);
  }
}
console.log('Passed: 10 complete HTML pages, unique metadata, local links/anchors/assets, full legal copy and static build output.');
