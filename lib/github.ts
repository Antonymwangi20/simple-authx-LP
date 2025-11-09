/**
 * GitHub API service for dynamic documentation
 * Automatically fetches and caches docs from the simple-authx repository
 */

interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  download_url: string;
  type: string;
  content?: string;
  encoding?: string;
}

interface PackageJson {
  version: string;
  description: string;
  keywords: string[];
  author: any;
  license: string;
  dependencies?: Record<string, string>;
}

interface DocsContent {
  readme: string;
  changelog: string;
  migration: string;
  contributing: string;
  security: string;
  packageInfo: PackageJson;
  examples: { name: string; content: string; path: string }[];
  lastUpdated: string;
}

interface RepoStats {
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  language: string;
  updatedAt: string;
}

const GITHUB_API = 'https://api.github.com';
const REPO_OWNER = 'Antonymwangi20';
const REPO_NAME = 'simple-authx';
const PACKAGE_PATH = 'simple-authx';

// Cache duration: 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;

// In-memory cache with type safety
let docsCache: { data: DocsContent | null; timestamp: number } = {
  data: null,
  timestamp: 0,
};

let statsCache: { data: RepoStats | null; timestamp: number } = {
  data: null,
  timestamp: 0,
};

/**
 * Decode base64 content from GitHub API
 */
function decodeContent(content: string): string {
  if (typeof window !== 'undefined') {
    return atob(content);
  }
  return Buffer.from(content, 'base64').toString('utf-8');
}

/**
 * Get GitHub API headers
 */
function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'simple-authx-lp',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

/**
 * Fetch a file from GitHub with retry logic
 */
async function fetchGitHubFile(path: string, retries: number = 3): Promise<string> {
  const url = `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: getHeaders(),
        next: { revalidate: 300 }, // Revalidate every 5 minutes
      });

      if (!response.ok) {
        if (response.status === 404) {
          console.warn(`[GitHub] File not found: ${path}`);
          return '';
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: GitHubFile = await response.json();

      if (!data.content) {
        console.warn(`[GitHub] No content in file: ${path}`);
        return '';
      }

      return decodeContent(data.content);
    } catch (error) {
      console.error(`[GitHub] Attempt ${attempt + 1}/${retries} failed for ${path}:`, error);
      if (attempt === retries - 1) {
        throw error;
      }
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }

  return '';
}

/**
 * Fetch directory listing from GitHub
 */
async function fetchGitHubDirectory(path: string): Promise<GitHubFile[]> {
  const url = `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;

  try {
    const response = await fetch(url, {
      headers: getHeaders(),
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`[GitHub] Directory not found: ${path}`);
        return [];
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(`[GitHub] Error fetching directory ${path}:`, error);
    return [];
  }
}

/**
 * Get package.json metadata
 */
async function getPackageInfo(): Promise<PackageJson> {
  try {
    const content = await fetchGitHubFile(`${PACKAGE_PATH}/package.json`);
    if (!content) {
      return getDefaultPackageInfo();
    }
    return JSON.parse(content);
  } catch (error) {
    console.error('[GitHub] Error parsing package.json:', error);
    return getDefaultPackageInfo();
  }
}

function getDefaultPackageInfo(): PackageJson {
  return {
    version: '2.0.6',
    description: 'A minimal Express authentication helper',
    keywords: ['auth', 'jwt', 'express'],
    author: 'Antony Mwangi',
    license: 'MIT',
  };
}

/**
 * Fetch README.md
 */
async function getReadme(): Promise<string> {
  try {
    return await fetchGitHubFile(`${PACKAGE_PATH}/README.md`);
  } catch (error) {
    console.error('[GitHub] Error fetching README:', error);
    return '# Documentation temporarily unavailable\n\nPlease visit our [GitHub repository](https://github.com/Antonymwangi20/simple-authx) for the latest documentation.';
  }
}

/**
 * Fetch CHANGELOG.md
 */
async function getChangelog(): Promise<string> {
  try {
    return await fetchGitHubFile(`${PACKAGE_PATH}/CHANGELOG.md`);
  } catch (error) {
    console.error('[GitHub] Error fetching CHANGELOG:', error);
    return '# Changelog\n\nSee [GitHub releases](https://github.com/Antonymwangi20/simple-authx/releases) for version history.';
  }
}

/**
 * Fetch MIGRATION.md
 */
async function getMigration(): Promise<string> {
  try {
    return await fetchGitHubFile(`${PACKAGE_PATH}/MIGRATION.md`);
  } catch (error) {
    return '# Migration Guide\n\nMigration guide not yet available.';
  }
}

/**
 * Fetch CONTRIBUTING.md
 */
async function getContributing(): Promise<string> {
  try {
    return await fetchGitHubFile(`${PACKAGE_PATH}/CONTRIBUTING.md`);
  } catch (error) {
    return '# Contributing\n\nContributions are welcome! Please open an issue or PR on [GitHub](https://github.com/Antonymwangi20/simple-authx).';
  }
}

/**
 * Fetch SECURITY.md
 */
async function getSecurity(): Promise<string> {
  try {
    return await fetchGitHubFile('SECURITY.md');
  } catch (error) {
    return '# Security Policy\n\nPlease report security issues to antony254mm@gmail.com';
  }
}

/**
 * Fetch example files
 */
async function getExamples(): Promise<{ name: string; content: string; path: string }[]> {
  try {
    const files = await fetchGitHubDirectory(`${PACKAGE_PATH}/examples`);
    const jsFiles = files.filter(file =>
      file.type === 'file' && (file.name.endsWith('.js') || file.name.endsWith('.ts'))
    );

    const examples = await Promise.all(
      jsFiles.slice(0, 5).map(async (file) => {
        try {
          const content = await fetchGitHubFile(file.path);
          return {
            name: file.name,
            content,
            path: file.path,
          };
        } catch (error) {
          console.error(`[GitHub] Error fetching example ${file.name}:`, error);
          return null;
        }
      })
    );

    return examples.filter(Boolean) as { name: string; content: string; path: string }[];
  } catch (error) {
    console.error('[GitHub] Error fetching examples:', error);
    return [];
  }
}

/**
 * Main function to fetch all documentation
 */
export async function fetchDocumentation(): Promise<DocsContent> {
  // Check cache
  const now = Date.now();
  if (docsCache.data && now - docsCache.timestamp < CACHE_DURATION) {
    console.log('[Docs] Returning cached documentation');
    return docsCache.data;
  }

  console.log('[Docs] Fetching fresh documentation from GitHub...');

  try {
    // Fetch all docs in parallel
    const [
      packageInfo,
      readme,
      changelog,
      migration,
      contributing,
      security,
      examples,
    ] = await Promise.allSettled([
      getPackageInfo(),
      getReadme(),
      getChangelog(),
      getMigration(),
      getContributing(),
      getSecurity(),
      getExamples(),
    ]);

    const docs: DocsContent = {
      packageInfo: packageInfo.status === 'fulfilled' ? packageInfo.value : getDefaultPackageInfo(),
      readme: readme.status === 'fulfilled' ? readme.value : '',
      changelog: changelog.status === 'fulfilled' ? changelog.value : '',
      migration: migration.status === 'fulfilled' ? migration.value : '',
      contributing: contributing.status === 'fulfilled' ? contributing.value : '',
      security: security.status === 'fulfilled' ? security.value : '',
      examples: examples.status === 'fulfilled' ? examples.value : [],
      lastUpdated: new Date().toISOString(),
    };

    // Update cache
    docsCache = {
      data: docs,
      timestamp: now,
    };

    console.log('[Docs] Documentation fetched and cached successfully');
    return docs;
  } catch (error) {
    console.error('[Docs] Critical error fetching documentation:', error);

    // Return cached data if available
    if (docsCache.data) {
      console.log('[Docs] Returning stale cache due to error');
      return docsCache.data;
    }

    // Return minimal docs
    return {
      packageInfo: getDefaultPackageInfo(),
      readme: '# Simple AuthX\n\nDocumentation temporarily unavailable.',
      changelog: '',
      migration: '',
      contributing: '',
      security: '',
      examples: [],
      lastUpdated: new Date().toISOString(),
    };
  }
}

/**
 * Get current package version
 */
export async function getPackageVersion(): Promise<string> {
  try {
    const packageInfo = await getPackageInfo();
    return packageInfo.version;
  } catch (error) {
    console.error('[GitHub] Error fetching package version:', error);
    return '2.0.6';
  }
}

/**
 * Get latest releases from GitHub
 */
export async function getLatestReleases(limit: number = 10) {
  const url = `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/releases?per_page=${limit}`;

  try {
    const response = await fetch(url, {
      headers: getHeaders(),
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('[GitHub] Error fetching releases:', error);
    return [];
  }
}

/**
 * Get repository statistics
 */
export async function getRepoStats(): Promise<RepoStats> {
  // Check cache
  const now = Date.now();
  if (statsCache.data && now - statsCache.timestamp < CACHE_DURATION) {
    return statsCache.data;
  }

  const url = `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}`;

  try {
    const response = await fetch(url, {
      headers: getHeaders(),
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    const stats: RepoStats = {
      stars: data.stargazers_count,
      forks: data.forks_count,
      watchers: data.subscribers_count,
      openIssues: data.open_issues_count,
      language: data.language,
      updatedAt: data.updated_at,
    };

    // Update cache
    statsCache = {
      data: stats,
      timestamp: now,
    };

    return stats;
  } catch (error) {
    console.error('[GitHub] Error fetching repo stats:', error);

    // Return cached or default
    if (statsCache.data) {
      return statsCache.data;
    }

    return {
      stars: 0,
      forks: 0,
      watchers: 0,
      openIssues: 0,
      language: 'TypeScript',
      updatedAt: new Date().toISOString(),
    };
  }
}

/**
 * Clear all caches (useful for webhook triggers)
 */
export function clearCache() {
  docsCache = { data: null, timestamp: 0 };
  statsCache = { data: null, timestamp: 0 };
  console.log('[GitHub] Cache cleared');
}