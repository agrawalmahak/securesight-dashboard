// src/app/api/incidents/counts/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const unresolved = await prisma.incident.count({
      where: { resolved: false },
    });
    const resolved = await prisma.incident.count({
      where: { resolved: true },
    });

    return NextResponse.json({ unresolved, resolved });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch incident counts' }, { status: 500 });
  }
}