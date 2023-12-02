import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "@/lib/db";
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
    if (req.method === 'POST') {
        try {
          const body = await req.json();
          const {userId, membershipId} = body;
          const userIdInt = parseInt(userId, 10)
          const membershipIdInt = parseInt(membershipId, 10)
          if (isNaN(userIdInt) ||isNaN(membershipIdInt)) {
            throw new Error("Invalid userId");
        }

          // Create a new purchase in the database
          const newPurchase = await db.purchase.create({
            data: {
              userId,
              membershipId,
            },
          });
    
          // Send a response with the newly created purchase
          // res.status(201).json({ success: true, data: newPurchase });
          return NextResponse.json({success: true, data: newPurchase, message: "Purchase succeeded!"});
        } catch (error) {
            console.error('Error handling POST request:', error);
          // res.status(500).json({ success: false, error: 'Internal Server Error' });
            return NextResponse.json({message: "Something went wrong"}, {status: 500})
        }
      } else {
        // res.status(405).json({ success: false, error: 'Method Not Allowed' });
          return NextResponse.json({message: "Method not allowed"}, {status: 405})
      }
    }
