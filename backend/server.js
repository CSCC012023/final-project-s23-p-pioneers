const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();
const signUpRequest = require('./API/signUp.js')

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

// API endpoint to handle the POST request
app.post('/signup', signUpRequest);
