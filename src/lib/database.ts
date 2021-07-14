import MongoDb from "mongodb";

const mongoClient = MongoDb.MongoClient;
let cachedDb: MongoDb.Db | null = null;

export const connectToDatabase = async () => {
  if (cachedDb) {
    console.log("Use existing connection");
    return Promise.resolve(cachedDb);
  } else {
    console.log(process.env.MONGODB_URI, "!!!!!!!!!!");
    const client = await mongoClient.connect(process.env.MONGODB_URI as string, {
      native_parser: true,
      useUnifiedTopology: true
    });
    const db = client.db(process.env.DATABASE_NAME as string);
    console.log("New database connection");
    cachedDb = db;
    return cachedDb;
  }
};
