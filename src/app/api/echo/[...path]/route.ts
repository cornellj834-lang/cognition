import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return NextResponse.json({
    params,
    url: request.url,
    path: request.nextUrl.pathname,
    search: request.nextUrl.search,
    segments: request.nextUrl.pathname.split('/').filter(Boolean)
  });
}