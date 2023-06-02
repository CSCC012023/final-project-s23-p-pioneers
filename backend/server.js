const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json()); // Add this line to parse JSON payloads



const uri = "mongodb+srv://cobuild:Password1234@cobuildcluster.n2ze2yv.mongodb.net/?retryWrites=true&w=majority";

async function connect () {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB Vikram")
    } catch (error) {
        console.log(error)
    }
}


connect();
app.listen(8000, () => {
    console.log("Server started on port 8000")
})

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
  });
  
  // Create the user model
const User = mongoose.model('User', userSchema);

// API endpoint to handle the POST request
app.post('/signup', (req, res) => {
const { username, email, password } = req.body;

// Create a new user instance
const newUser = new User({
    username,
    email,
    password,
});

// Save the user to the database
newUser.save()
    .then(() => {
    // User saved successfully
    res.status(201).json({ message: 'User created successfully' });
    })
    .catch((error) => {
    // Error occurred while saving user
    res.status(500).json({ error: 'An error occurred while saving the user' });
    });
});
