import { NextResponse } from 'next/server';

export async function GET() {
  const dbUrl = process.env.DATABASE_URL;

  if (dbUrl) {
    return NextResponse.json({
      status: 'Success',
      message: 'DATABASE_URL was found!',
    });
  } else {
    return NextResponse.json({
      status: 'Error',
      message: 'DATABASE_URL environment variable was NOT found.',
    }, { status: 500 });
  }
}