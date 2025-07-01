import { MongoClient } from "mongodb";

const uri = "mongodb+srv://0xntins:ldV48oU30HuBr2ds@cluster0.qz2yktu.mongodb.net/landingpage";
const dbName = "landingpage";

if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

if (!dbName) {
    throw new Error("Please define the MONGODB_DB_NAME environment variable inside .env.local");
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
} 