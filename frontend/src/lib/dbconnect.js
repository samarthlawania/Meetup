import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error(
    "Please define the MONGODB_URL environment variable inside .env.local"
  );
}
// Add fallback for `global.mongoose` in case it's undefined
global.mongoose = global.mongoose || { conn: null, promise: null };

let cache = global.mongoose;

async function dbConnect() {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    const object = {
      bufferCommands: false,
      severselectionTimeoutMS: 5000,
    };

    cache.promise = mongoose.connect(MONGODB_URL, object).then((mongoose) => {
      return mongoose;
    });
    try {
      cache.conn = await cache.promise;
    } catch (error) {
      cache.promise = null;
      throw error;
    }
  }
}

export default dbConnect;
