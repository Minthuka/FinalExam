import mongoose  from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,  // You can remove this if you want to enable buffering
        };

        cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
            console.log('DB connected');
            return mongoose; // Important: return mongoose here
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        console.error('MongoDB connection error:', e); // Log the error
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
