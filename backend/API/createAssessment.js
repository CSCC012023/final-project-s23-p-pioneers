const express = require('express');
const app = express();
const { MongoClient, ObjectId } = require('mongodb');

const MONGODB_URI = 'mongodb://localhost:27017/mydatabase'; // Replace with your MongoDB connection string

async function connectToMongoDB() {
  const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true });
  return client.db();
}

app.use(express.json());

// API endpoint to store an assessment with test cases
app.post('/assessments', async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection('assessments');
    const assessment = req.body;
    const result = await collection.insertOne(assessment);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to retrieve all assessments with test cases
app.get('/assessments', async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection('assessments');
    const assessments = await collection.find().toArray();
    res.json(assessments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
