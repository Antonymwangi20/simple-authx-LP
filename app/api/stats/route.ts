import { NextResponse } from 'next/server';
import { getRepoStats } from '@/lib/github';

export async function GET() {
  try {
    const stats = await getRepoStats();
    return NextResponse.json(stats);
  } catch (error: any) {
    console.error('Error in stats API route:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch stats',
        stars: 0,
        forks: 0,
        watchers: 0,
        openIssues: 0
      },
      { status: 500 }
    );
  }
}

// Revalidate every hour
export const revalidate = 3600;