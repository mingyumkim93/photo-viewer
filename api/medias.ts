import { VercelRequest, VercelResponse } from "@vercel/node";
import { connectToDatabase } from "../src/lib/database";

export default async function medias(req: VercelRequest, res: VercelResponse) {
  const db = await connectToDatabase();
  console.log("db:", db);
  const collection = db.collection("medias");
  console.log("collection:", collection);
  const medias = await collection.find({}).toArray();
  console.log("medias:", medias);
  res.status(200).json({ medias });
}
