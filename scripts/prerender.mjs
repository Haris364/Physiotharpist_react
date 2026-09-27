import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const ROUTES = [
  { url: '/', out: 'index.html' },
  { url: '/about/', out: 'about/index.html' },
  { url: '/treatments/', out: 'treatments/index.html' },
  { url: '/conditions/', out: 'conditions/index.html' },
  { url: '/contact/', out: 'contact/index.html' },
  { url: '/404', out: '404.html', noindex: true },
];

const template = await readFile(join(dist, 'index.html'), 'utf8');

// Normalise the head and the mount point so SSR output is the only source of
// both. Vite may inject build tags in either place, so strip the defaults and
// guarantee a single clean <div id="root"> anchor.
const cleanTemplate = template
  .replace(/[ \t]*<!--ssr-defaults-->[\s\S]*?<!--\/ssr-defaults-->\r?\n?/, '')
  .replace(/[ \t]*<title>[\s\S]*?<\/title>\r?\n?/, '')
  .replace(/<div id="root">[\s\S]*?<\/div>/, '<div id="root"><!--ssr-body--></div>');

const vite = await createServer({
  root,
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true },
});

try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');

  for (const route of ROUTES) {
    const { app, head } = render(route.url);

    let html = cleanTemplate.replace('<!--ssr-head-->', head).replace('<!--ssr-body-->', app);

    if (route.noindex) {
      html = html.replace('</head>', '    <meta name="robots" content="noindex, follow" />\n  </head>');
    }

    const target = join(dist, route.out);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, html, 'utf8');

    const kb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1);
    console.log(`  prerendered  ${route.url.padEnd(14)} -> ${route.out}  (${kb} kB)`);
  }
} finally {
  await vite.close();
}
