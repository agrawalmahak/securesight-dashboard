// src/app/api/incidents/[id]/resolve/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const updatedIncident = await prisma.incident.update({
      where: { id: id },
      data: { resolved: true },
    });
    return NextResponse.json(updatedIncident);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to resolve incident' }, { status: 500 });
  }
}