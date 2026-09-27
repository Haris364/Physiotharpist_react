import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { buildHeadTags, getSeoConfig } from './lib/seo';

export function render(url = '/') {
  const app = renderToString(
    <MemoryRouter initialEntries={[url]}>
      <App />
    </MemoryRouter>,
  );

  const { title, tags, links, jsonLd } = buildHeadTags(getSeoConfig());

  const head = [
    title ? `    <title>${escapeHtml(title)}</title>` : '',
    ...links.map((l) => `    <link rel="${l.rel}" href="${escapeHtml(l.href)}" />`),
    ...tags.map(
      (t) =>
        `    <meta ${t.name ? `name="${escapeHtml(t.name)}"` : `property="${escapeHtml(t.property)}"`} content="${escapeHtml(t.content)}" />`,
    ),
    ...jsonLd.map(
      (j) =>
        `    <script type="application/ld+json" id="${j.id}">${jsonLdString(j.data)}</script>`,
    ),
  ]
    .filter(Boolean)
    .join('\n');

  return { app, head };
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function jsonLdString(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export default render;
