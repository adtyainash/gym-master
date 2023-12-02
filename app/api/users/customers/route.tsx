import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as z from 'zod';

const userSchema = z
    .object({
        username: z.string().min(1, "Username must not be empty").max(15),
        email: z.string().min(1, "Email must not be empty").email("Invalid email!"),
        name: z.string().min(1, "Name must not be empty"),
        telephone: z.string().min(1, "Telephone must not be empty"),
        password: z
            .string()
            .min(1, "Password must not be empty")
            .min(8, "Password should have more than 8 characters"),
    })

export async function GET() {
    try {
        const users = await db.user.findMany({
            where: {
                role: "Customer"
            }
        });
        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching records', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}