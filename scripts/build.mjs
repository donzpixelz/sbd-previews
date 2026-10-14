import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const astro = resolve(root, 'node_modules/astro/astro.js');

function build(app) {
  execFileSync(process.execPath, [astro, 'build', '--root', resolve(root, app)], {
    stdio: 'inherit',
    cwd: root,
  });
}

build('lakeshore-littles');
build('rr-seamless-gutters');
build('krall-residential-electric');

const out = resolve(root, 'dist');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

cpSync(resolve(root, 'lakeshore-littles/dist/lakeshore-littles'), resolve(out, 'lakeshore-littles'), { recursive: true });
cpSync(resolve(root, 'rr-seamless-gutters/dist/rr-seamless-gutters'), resolve(out, 'rr-seamless-gutters'), { recursive: true });
cpSync(resolve(root, 'krall-residential-electric/dist/krall-residential-electric'), resolve(out, 'krall-residential-electric'), { recursive: true });

writeFileSync(resolve(out, '_headers'), '/*\n  X-Robots-Tag: noindex, nofollow, noarchive\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Content-Type-Options: nosniff\n');
writeFileSync(resolve(out, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
