// api/classes/
import { NextResponse } from 'next/server';
import { db } from './../../../lib/db';


export async function GET() {
    try {
        const classes = await db.gymClass.findMany({
            include: {
                equipments: true,
            },
        });
        return NextResponse.json(classes);
    } catch (error) {
        console.error('Error fetching records', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}


export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { equipments, instructorId, ...classData } = data;

        const newClass = await db.gymClass.create({
            data: {
                ...classData,
                instructor: {
                    connect: { id: instructorId },
                },
                equipments: {
                    create: equipments.map(({ name, weight }) => ({ name, weight })),
                },
            },
        });

        return NextResponse.json(newClass, { status: 201 });
    } catch (error) {
        console.error('Error creating record', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}



export async function DELETE(request: Request) {
    try {
        const data = await request.json();
        const id = parseInt(data.id); // Convert the ID to an integer

        if (isNaN(id)) {
            return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
        }

        const deleteClass = await db.gymClass.delete({
            where: {
                id: id // Use the converted integer ID
            },
        });
        if (deleteClass) {
            return NextResponse.json({message: 'Record successfully deleted' }, { status: 202 }); // Supposed to be 204, but NextJS has a bug for 204 response code
        } else {
            return NextResponse.json({message: "Record not found"}, {status: 404})        
        }
    } catch (error) {
        console.error('Error deleting record', error);
        return NextResponse.json({message: 'Internal server error' }, {status: 500});
    }
}
