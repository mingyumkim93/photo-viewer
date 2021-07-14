import { VercelRequest, VercelResponse } from "@vercel/node";
import { connectToDatabase } from "../src/lib/database";

export default async function medias(req: VercelRequest, res: VercelResponse) {
  // const db = await connectToDatabase();
  // const collection = db.collection("medias");
  // const medias = await collection.find({}).toArray();
  const medias = { test: "test123" };
  res.status(200).json({ medias });
}
