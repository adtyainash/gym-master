import { NextResponse } from "next/server";
import { db } from "./../../../lib/db";
import { hash } from "bcrypt";
import * as z from 'zod';

const userSchema = z
    .object({
        username: z.string().min(1, "Username must not be empty"),
        email: z.string().min(1, "Email must not be empty").email("Invalid email!"),
        name: z.string().min(1, "Name must not be empty"),
        telephone: z.string().min(1, "Telephone must not be empty"),
        password: z
            .string()
            .min(1, "Password must not be empty")
            .min(8, "Password should have more than 8 characters"),
        address: z.string().min(1, "Address must not be empty")
    })

export async function GET() {
    try {
        const users = await db.user.findMany();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error('Error fetching records', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("body");
        console.log(body);
        console.log(userSchema.parse(body));
        const { username, email, name, telephone, password, address} = userSchema.parse(body);

        const isEmailUsedbyOtherUser = await db.user.findUnique( {
            where: { email: email}
        });

        if (isEmailUsedbyOtherUser) {
            return NextResponse.json({user: null, message: "This email has been used by other user"}, {status: 409})
        }

        const isUsernameUsedbyOtherUser = await db.user.findUnique( {
            where: { username: username}
        });

        if (isUsernameUsedbyOtherUser) {
            return NextResponse.json({user: null, message: "This username has been used by other user"}, {status: 409})
        }


        const hashedPassword = await hash(password, 10);

        const newUser = await db.user.create ({
            data : {
                email,
                name,
                telephone,
                username,
                password: hashedPassword,
                address,
            }
        })

        const { password: newUserPassword, ...rest} = newUser;

        return NextResponse.json({user: newUser, message: "User created succesfully!"}, {status: 201});
    } catch(error) {
        console.error('Error creating record', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}