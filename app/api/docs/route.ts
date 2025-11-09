import { NextResponse } from 'next/server';
import { fetchDocumentation } from '@/lib/github';

export async function GET() {
  try {
    const docs = await fetchDocumentation();
    return NextResponse.json(docs);
  } catch (error: any) {
    console.error('Error in docs API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documentation', message: error.message },
      { status: 500 }
    );
  }
}

// Revalidate every 5 minutes
export const revalidate = 300;