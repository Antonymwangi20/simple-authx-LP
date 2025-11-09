import { NextResponse } from 'next/server';
import { getLatestReleases } from '@/lib/github';

export async function GET() {
  try {
    const releases = await getLatestReleases(10);

    // Extract versions from releases
    const versions = releases.map((release: any) =>
      release.tag_name.replace(/^v/, '')
    );

    // Get the first version as the current
    const current = versions[0] || '2.0.6';

    return NextResponse.json({
      current,
      versions,
    });
  } catch (error: any) {
    console.error('Error in versions API route:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch versions',
        current: '2.0.6',
        versions: ['2.0.6'],
      },
      { status: 500 }
    );
  }
}

// Revalidate every hour
export const revalidate = 3600;
