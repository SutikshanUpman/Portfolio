import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const readme = readFileSync('README.md', 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML ids');

for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (url.startsWith('#')) {
    assert(ids.includes(url.slice(1)), `Missing anchor: ${url}`);
  } else if (!/^(https:|mailto:)/.test(url)) {
    assert(existsSync(url), `Missing asset: ${url}`);
  }
}

const projects = html.match(/<article[\s\S]*?<\/article>/g) ?? [];
assert.equal(projects.length, 4, 'Expected four projects');
for (const project of projects) {
  const source = project.match(/href="(https:\/\/github.com\/[^" ]+)"/);
  assert(source, 'Project needs a source link');
  assert(readme.includes(source[1]), `README missing: ${source[1]}`);
}

assert(html.includes('href="#main"'), 'Missing skip link');
console.log('Passed: local assets, unique ids, navigation anchors, four projects, and README source links.');
