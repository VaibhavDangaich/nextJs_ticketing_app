import Ticket from "../(models)/Ticket";
import { NextResponse } from "next/server";

export async function POST(req,res){
    try{
        const body=await req.json();
        const ticketData=body.formData;
        await Ticket.create(ticketData);

        return NextResponse.json({ message: "Ticket created successfully" }, { status: 201 });

    }
    catch(err){
        console.error("Error in POST /api:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}