const mongoose = require('mongoose');

const jobSchema = require('../Schemas/post')

const Job = mongoose.model('Job', jobSchema);

const getJobPost = async (req, res) => {
    console.log("triggered")
    const { id } = req.body;
    try {
        if (id != undefined ) {
            const jobPost = await Job.find({jobId: id});
            console.log("br2o")
            if (!jobPost) {
                return res.status(404).json({ error: 'Job post not found' });
                }
            
                res.json(jobPost);

        }else {
            const jobPost = await Job.find();
            console.log("bro")
            if (!jobPost) {
                return res.status(404).json({ error: 'Job post not found' });
                }
            
                res.json(jobPost);
        }
        // console.log(jobPost)

    } catch (error) {
        console.error('Error retrieving job post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    };



module.exports = getJobPost;

