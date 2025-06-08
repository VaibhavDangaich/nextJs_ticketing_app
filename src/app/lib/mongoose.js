// lib/mongoose.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Global is used here to maintain a cached connection across hot-reloads in development.
// This prevents Mongoose from creating new connections on every file change.
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Disables Mongoose's buffering of commands.
        };

        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts)
            .then((mongoose) => {
                console.log("MongoDB Connected Successfully!");
                return mongoose;
            })
            .catch((err) => {
                console.error("MongoDB Connection Error:", err);
                throw err; // Re-throw to propagate error
            });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;