// api/membership/index.ts
import { db } from "@/lib/db";
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const memberships = await db.membership.findMany();
    return NextResponse.json(memberships);
  } catch (error) {
    console.error('Error fetching memberships:', error);
    return NextResponse.error();
  } finally {
    await db.$disconnect();
  }
}

export async function POST() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405});
}
