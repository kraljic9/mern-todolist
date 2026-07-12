import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('Error acured while processing MONGO_URI')
}

global.mongoose = global.mongoose || {conn: null, promise: null}
const cached = global.mongoose;

async function connectDB() {
        if (cached.conn) {
            return cached.conn
        } 

        if (!cached.promise) {
           cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
            console.log("=> MongoDB Connected Successfully!")
            return mongoose
           })
        }

    cached.conn = await cached.promise 
    return cached.conn
}

export default connectDB