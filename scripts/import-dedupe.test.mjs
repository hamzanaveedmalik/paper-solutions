import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const result = spawnSync(process.execPath, ['scripts/import-pcsuk.mjs', '--dry-run'], {
  cwd: root,
  encoding: 'utf8',
});

assert.equal(result.status, 0, result.stderr || result.stdout);
assert.match(result.stdout, /"productsOut": 82/);
assert.match(result.stdout, /"duplicates": 0/);

const catalogue = JSON.parse(
  fs.readFileSync(path.join(root, 'src/data/catalogue.json'), 'utf8')
);
const slugs = catalogue.products.map((p) => p.slug);
assert.equal(new Set(slugs).size, slugs.length);
assert.equal(catalogue.products.length, 82);

console.log('import dedupe checks passed');
