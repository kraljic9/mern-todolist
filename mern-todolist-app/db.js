import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Error acured while processing MONGO_URI')
}

global.mongoose = global.mongoose || {conn: null, promise: null}
const cached = global.mongoose;

async function connectDB() {
    try{
        if (cached.conn) {
            return cached.conn
        } 

        if (!cached.promise) {
           cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
            console.log("=> MongoDB Connected Successfully!")
            return mongoose
           })
        }

        cached.conn = await cached.promise;
        return cached.conn
    } catch(err) {
        cached.promise = null;
        cached.conn = null;
        console.error("MongoDB Connection Failed:", err);
    }
}

export default connectDB