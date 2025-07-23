import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  try {
    const updatedIncident = await prisma.incident.update({
      where: { id: id },
      data: { resolved: true },
    });
    return NextResponse.json(updatedIncident);
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to resolve incident' }, { status: 500 });
  }
}