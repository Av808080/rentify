import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.DB_URL) throw new Error("URI not recognised");

const client = new MongoClient(process.env.DB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();
    console.log("DATABASE CONNECTED >>>");
    return client.db();
  } catch {
    console.log("DATABASE CONNECTION FAILED");
  }
}

export async function getCollection(collectionName: string) {
  try {
    const db = await connectDB();
    if (!db) return null;
    return db.collection(collectionName);
  } catch {
    console.log("DB CONNNECTION FAILED!!!");
  }
}
