import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const uri =
      "mongodb+srv://omarmoquete:nXTUiS9.CXLN6pD@cluster0.gibvo2f.mongodb.net/meetups?retryWrites=true&w=majority";

    const client = await MongoClient.connect(uri);

    const db = client.db();

    const meetupCollection = db.collection("meetups");

    const result = await meetupCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Operation successful" });
  }
}

export default handler;
