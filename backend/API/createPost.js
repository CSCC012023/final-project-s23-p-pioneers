const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const short = require('short-uuid');



const jobSchema = require('../Schemas/post')


const Job = mongoose.model('Job', jobSchema);


// API endpoint to handle the POST request
const createPostApi = (req, res) => {
    const { title, location, jobDescription, companyName, deadline, datePosted, skills } = req.body;
    const jobId = short.generate();

    const deadlineIsoDate = new Date(deadline).toISOString();
    // const deadlineIsoDate = deadline;

    console.log(req.body)
    const newJob = new Job({
        jobId,
        title,
        location,
        jobDescription,
        companyName,
        deadline: deadlineIsoDate, // Assign deadlineIsoDate to the deadline field
        datePosted,
        skills
    });
    
    // Save the job to the database
    newJob.save()
        .then(() => {
        // Job saved successfully
        res.status(201).json({ message: 'Job posting created successfully' });
        })
        .catch((error) => {
        // Error occurred while saving the job
        res.status(500).json({ error: 'An error occurred while creating job posting' });
        });
    };


    module.exports = createPostApi;