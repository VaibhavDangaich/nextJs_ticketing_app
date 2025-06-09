// pages/api/Tickets/index.js
import Ticket from "../../(models)/Ticket";
import { NextResponse } from "next/server";
import connectDB from "../../lib/mongoose";

export async function POST(req) {
    await connectDB();
    try {
        console.log("POST /api/Tickets called"); // More specific log
        const body = await req.json();
        const ticketData = body.formData;
        console.log("Received ticketData (backend):", ticketData); // <-- Provide this full log output!

        // Ensure priority and progress are numbers. Redundant if frontend always sends numbers, but safe.
        ticketData.priority = Number(ticketData.priority);
        ticketData.progress = Number(ticketData.progress);

        // Perform Mongoose creation
        await Ticket.create(ticketData);

        return NextResponse.json({ message: "Ticket created successfully" }, { status: 201 });

    } catch (err) {
        console.error("Error in POST /api/Tickets:", err);

        // Enhanced error logging for Mongoose validation errors
        if (err.name === 'ValidationError') {
            const errors = Object.keys(err.errors).map(key => ({
                path: err.errors[key].path,
                message: err.errors[key].message,
                kind: err.errors[key].kind
            }));
            console.error("Mongoose Validation Errors:", JSON.stringify(errors, null, 2));
            return NextResponse.json(
                { error: "Validation Error", details: errors },
                { status: 400 } // Use 400 for bad request/validation errors
            );
        }

        // Generic internal server error for other issues
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() { 
    await connectDB();
    try {
        console.log("GET /api/Tickets called");
        const tickets = await Ticket.find();
        return NextResponse.json(tickets, { status: 200 });
    } catch (err) {
        console.error("Error in GET /api/Tickets:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


