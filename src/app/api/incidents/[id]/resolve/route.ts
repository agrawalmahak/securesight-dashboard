import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  try {
    const updatedIncident = await prisma.incident.update({
      where: { id },
      data: { resolved: true },
    });
    return NextResponse.json(updatedIncident);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to resolve incident' }, { status: 500 });
  }
}