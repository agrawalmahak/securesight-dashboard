import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define a type for the route's context
interface RouteContext {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const { id } = params;
  try {
    const updatedIncident = await prisma.incident.update({
      where: { id: id },
      data: { resolved: true },
    });
    return NextResponse.json(updatedIncident);
  } catch (_error) { // We add an underscore to 'error' to fix the warning
    return NextResponse.json({ error: 'Failed to resolve incident' }, { status: 500 });
  }
}