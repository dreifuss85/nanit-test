import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: '.env.test' });

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/testdb";

beforeAll(async () => {
  await mongoose.connect(mongoUri, {
    authSource: "admin",
    user: "admin",
    pass: "admin",
  });
});

beforeEach(async () => {
  // Clear all collections before each test
  const db = mongoose.connection.db;
  if (db) {
    const collections = await db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});
