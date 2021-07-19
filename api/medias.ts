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
  } else if (req.method === "GET") {
    const id = req.query.id;
    try {
      collection.findOne({ $and: [{ id: id }] }, (error, result) => {
        if (result) res.status(200).json({ medias: result.medias });
        else res.status(404).json({ status: "not found" });
      });
    } catch (err) {
      res.status(500).json({ status: "fail" });
    }
  }
}
