import { VercelRequest, VercelResponse } from "@vercel/node";
import { connectToDatabase } from "../src/lib/database";

export default async function medias(req: VercelRequest, res: VercelResponse) {
  const db = await connectToDatabase();
  const collection = db.collection("medias");

  if (req.method === "POST") {
    const { album } = req.body;
    try {
      await collection.insertOne(album);
      res.status(200).json({ status: "ok" });
    } catch (err) {
      res.status(500).json({ status: "fail" });
    }
  }
}
