// api/users/[userId]/route.ts
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request, {params}: {params: {userId: string}}) {

  if (!params.userId) {
    return NextResponse.json({ status: 400, message: 'Bad Request' });
  }

  const parsedUserId = Number(params.userId);

  try {
    const userDetails = await db.user.findUnique({
      where: {
        id: parsedUserId,
      },
    });

    if (userDetails) {
      return NextResponse.json(userDetails, {status: 200});
    } else {
      return NextResponse.json({message: 'User not found' }, { status: 404});
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    return NextResponse.json( {message: 'Internal Server Error' }, { status: 500},);
  } finally {
    await db.$disconnect();
  }
}

export const PATCH = async (request: Request, { params }: { params: { userId: number } }) => {
  const body = await request.json();
  console.log(body);

  if (!params.userId) {
    return NextResponse.json({ message: 'Bad Request' }, { status: 400 });
  }

  try {
    const updateData: any = {};

    if ('gymClassId' in body) {
      updateData.gymClassId = body.gymClassId;
    }

    if ('membershipStatus' in body) {
      updateData.membershipStatus = body.membershipStatus;
    }

    if ('membershipDuration' in body) {
      updateData.membershipDuration = {
        increment: body.membershipDuration
      };
    }

    // If no relevant fields are present, return a bad request response
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ message: 'No valid fields to update' }, { status: 400 });
    }

    const updatedUser = await db.user.update({
      where: {
        id: Number(params.userId),
      },
      data: updateData,
    });

    return NextResponse.json({ 
      message: `User's details updated successfully.`,
      user: updatedUser
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating user details:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};

export const DELETE = async (request: Request, {params}: {params: {userId: number}}) =>{
  if (!params.userId) {
    return NextResponse.json({ message: 'Bad Request' }, { status: 400 });
  }
  
  const userData = await db.user.findUnique({
    where: {
      id: Number(params.userId),
    },
  });

  if (!userData) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const user = await db.user.delete({
      where:{
          id: Number(params.userId)
      }
  });
  return NextResponse.json({ message: `User deleted!` }, { status: 200 });
}

