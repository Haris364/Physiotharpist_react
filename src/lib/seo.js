import { useEffect } from 'react';

const SITE_URL = 'https://altophysio.com';
const OG_IMAGE =
  'https://images.pexels.com/photos/20860617/pexels-photo-20860617.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=630';

export const buildUrl = (path) => `${SITE_URL}${path === '/' ? '' : path}`;

const DEFAULT_SEO = {
  title: 'Alto Physiotherapy & Rehabilitation | Move Better. Live Stronger.',
  description:
    'Personalised physiotherapy, rehabilitation and movement care in Lakeside. One-on-one evidence-based treatment for sports injuries, back and neck pain, post-surgery recovery and long-term mobility.',
  path: '/',
};

const clinicSchema = {
  '@context': 'https://schema.org',
  '@type': 'Physiotherapist',
  name: 'Alto Physiotherapy & Rehabilitation',
  url: SITE_URL,
  image: OG_IMAGE,
  telephone: '+1-555-018-4420',
  email: 'care@altophysio.com',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '214 Willow Creek Drive, Suite 3',
    addressLocality: 'Lakeside',
    addressRegion: 'Riverside County',
    postalCode: 'LS4 9PD',
    addressCountry: 'US',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '08:00',
      closes: '19:00',
    },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '08:00', closes: '16:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '13:00' },
  ],
  medicalSpecialty: 'Physiotherapy',
  availableService: [
    { '@type': 'MedicalProcedure', name: 'Sports Injury Rehabilitation' },
    { '@type': 'MedicalProcedure', name: 'Post-Surgery Recovery' },
    { '@type': 'MedicalProcedure', name: 'Back and Neck Pain Treatment' },
  ],
};

const breadcrumbSchema = (crumbs) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: crumb.label,
    item: buildUrl(crumb.to),
  })),
});

export function buildHeadTags({
  title,
  description,
  path,
  breadcrumbs,
  schema,
  image: shareImage,
}) {
  const url_ = buildUrl(path);
  const ogImage = shareImage ?? OG_IMAGE;

  return {
    title,
    tags: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url_ },
      { property: 'og:image', content: ogImage },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
    links: [{ rel: 'canonical', href: url_ }],
    jsonLd: [
      { id: 'schema-clinic', data: clinicSchema },
      ...(schema ? [{ id: 'schema-page', data: schema }] : []),
      ...(breadcrumbs?.length
        ? [{ id: 'schema-breadcrumb', data: breadcrumbSchema(breadcrumbs) }]
        : []),
    ],
  };
}

const collected = new Set();
export const getSeoConfig = () => [...collected].pop() ?? DEFAULT_SEO;

function applyTag(tag) {
  const selector = tag.name
    ? `meta[name="${tag.name}"]`
    : `meta[property="${tag.property}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  if (tag.name) el.setAttribute('name', tag.name);
  if (tag.property) el.setAttribute('property', tag.property);
  el.setAttribute('content', tag.content);
}

function applyLink(link) {
  let el = document.head.querySelector(`link[rel="${link.rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', link.rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', link.href);
}

function applyJsonLd({ id, data }) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  const next = JSON.stringify(data);
  if (el.textContent !== next) el.textContent = next;
}

export function useSeo(config) {
  collected.clear();
  collected.add(config);

  const { tags, links, jsonLd } = buildHeadTags(config);
  const serialized = JSON.stringify({ tags, links, jsonLd });

  useEffect(() => {
    document.title = config.title;
    const parsed = JSON.parse(serialized);
    parsed.tags.forEach(applyTag);
    parsed.links.forEach(applyLink);
    parsed.jsonLd.forEach(applyJsonLd);
  }, [config.title, serialized]);
}
