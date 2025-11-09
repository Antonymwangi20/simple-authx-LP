import { MetadataRoute } from 'next';

const BASE_URL = 'https://simple-authx-lp.vercel.app';

// Define the static docs sections
const DOCS_SECTIONS = [
  'getting-started',
  'changelog',
  'migration',
  'contributing',
  'security',
];

/**
 * Fetch versions from your API route
 */
async function fetchVersions(): Promise<string[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/versions`);
    const data = await res.json();
    return data.versions || ['2.0.6'];
  } catch (err) {
    console.error('Failed to fetch versions for sitemap:', err);
    return ['2.0.6'];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const versions = await fetchVersions();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/docs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Add docs sections for all versions
  const docsPages: MetadataRoute.Sitemap = [];

  versions.forEach((version) => {
    DOCS_SECTIONS.forEach((section) => {
      docsPages.push({
        url: `${BASE_URL}/docs/${section}?version=${version}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  return [...staticPages, ...docsPages];
}
