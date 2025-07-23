// src/app/api/incidents/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const resolved = searchParams.get('resolved') === 'true';

  try {
    const incidents = await prisma.incident.findMany({
      where: {
        resolved: resolved,
      },
      include: { // Include camera details
        camera: true,
      },
      orderBy: {
        tsStart: 'desc', // Newest first
      },
    });
    return NextResponse.json(incidents);
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to fetch incidents' }, { status: 500 });
  }
}