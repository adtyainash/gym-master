import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const searchQuery = url.searchParams.get('q');

        let queryOptions = {};
        if (searchQuery) {
            queryOptions = {
                where: {
                    OR: [
                        { username: { contains: searchQuery, mode: 'insensitive' }, role : "Customer" },
                        // Add other fields if needed for the search
                    ],
                },
            };
        }

        const users = await db.user.findMany({
            ...queryOptions,
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching records', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}