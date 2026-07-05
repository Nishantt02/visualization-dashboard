
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDb = async () => {
    // Use provided MONGODB_URI or fall back to a local MongoDB for development
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blackcoffer';

    if (!process.env.MONGODB_URI) {
        console.warn('MONGODB_URI not set — falling back to', uri);
    }

    try {
        const connection = await mongoose.connect(uri, {
            // recommended options are handled by mongoose defaults in v6+
        });
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (err) {
        console.error('mongodb connection error:', err.message);
        throw err;
    }
};

export default connectDb;