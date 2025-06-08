// (models)/Ticket.js
import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    priority: {
        type: Number,
    },
    progress: {
        type: Number,
    },
    status: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    active: {
        type: Boolean,
        default: true,
    }
});

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);
export default Ticket;