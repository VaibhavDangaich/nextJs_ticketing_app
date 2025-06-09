import Ticket from "@/app/(models)/Ticket";
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";


export async function GET(req, { params }) {
    try {
        const { id } = params;
        await connectDB();
        const foundTicket = await Ticket.findOne({ _id: id });
        if (!foundTicket) {
            return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
        }
        return NextResponse.json({ foundTicket }, { status: 200 });
    }
    catch (err) {
        console.error("Error in GET /api/Tickets/:id:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        await connectDB();
        await Ticket.findByIdAndDelete(id);
        return NextResponse.json({ message: "Ticket deleted successfully" }, { status: 200 });

    } 
    catch (err) {
        console.error("Error in DELETE /api/Tickets/:id:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}