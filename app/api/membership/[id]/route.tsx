// api/membership/[membershipId]/route.ts
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request, {params}: {params: {id: number}}) {

  if (!params.id) {
    return NextResponse.json({ status: 400, message: 'Bad Request' });
  }
  const parsedMembershipId = Number(params.id);

  try {
    const membershipDetails = await db.membership.findUnique({
      where: {
        membershipId: parsedMembershipId,
      },
    });

    if (membershipDetails) {
      return NextResponse.json(membershipDetails);
    } else {
      return NextResponse.json({ status: 404, message: 'Membership not found' });
    }
  } catch (error) {
    console.error('Error fetching membership details:', error);
    return NextResponse.json({ status: 500, message: 'Internal Server Error' });
  } finally {
    await db.$disconnect();
  }
}

export async function POST() {
  return NextResponse.json({ error: 'Method Not Allowed' }, {status: 405});
}
