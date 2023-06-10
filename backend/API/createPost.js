const mongoose = require('mongoose')

// job posting schema
const jobSchema = new mongoose.Schema({
    title: String,
    location: String,
    jobDescription: String,
    //image: String,
    deadline: String,
    datePosted: String,
});

const Job = mongoose.model('Job', jobSchema);

// API endpoint to handle the POST request
const createPostApi = (req, res) => {
    const { title, location, jobDescription, deadline, datePosted } = req.body;
    
    // Create a new user instance
    const newJob = new Job({
        title,
        location,
        jobDescription,
        //image,
        deadline,
        datePosted,
    });
    
    // Save the user to the database
    newJob.save()
        .then(() => {
        // User saved successfully
        res.status(201).json({ message: 'Job posting created successfully' });
        })
        .catch((error) => {
        // Error occurred while saving user
        res.status(500).json({ error: 'An error occurred while creating job posting' });
        });
    };


    module.exports = createPostApi;
