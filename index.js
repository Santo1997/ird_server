const express = require("express");
const {MongoClient, ServerApiVersion, ObjectId} = require("mongodb");
require("dotenv").config();
var cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qpcvbrd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const books = client.db("idr").collection("books");
    const chapter = client.db("idr").collection("chapter");
    const hadith = client.db("idr").collection("hadith");
    const section = client.db("idr").collection("section");

    app.get("/getBooks", async (req, res) => {
      const result = await books.find().toArray();
      res.send(result);
    });
    app.get("/getChapter", async (req, res) => {
      const result = await chapter.find().toArray();
      res.send(result);
    });
    app.get("/getHadith", async (req, res) => {
      const result = await hadith.find().toArray();
      res.send(result);
    });
    app.get("/getSection", async (req, res) => {
      const result = await section.find().toArray();
      res.send(result);
    });

    await client.db("admin").command({ping: 1});
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
