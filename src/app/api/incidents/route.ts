import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const resolved = searchParams.get('resolved') === 'true';

  try {
    const incidents = await prisma.incident.findMany({
      where: { resolved },
      include: { camera: true },
      orderBy: { tsStart: 'desc' },
    });
    return NextResponse.json(incidents);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch incidents' }, { status: 500 });
  }
}