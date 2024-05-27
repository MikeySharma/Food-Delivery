import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside the .env.local');
}

let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }
    
    if (!cached.promise) {
        const opts : any = {
            bufferCommands: false,
        };

        try {
            cached.promise = mongoose.connect(uri as string, opts);
            const connection = await cached.promise;
            cached.conn = connection;
            return connection;
        } catch (error) {
            console.error('MongoDB connection error:', error);
            throw new Error('Failed to connect to MongoDB');
        }
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
