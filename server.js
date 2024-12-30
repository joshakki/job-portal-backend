const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process if unable to connect
    });

// Define Job schema and model
const jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    companyId: String,
    location: String,
    workMode: String,
    skillsRequired: [String],
    salaryRange: {
        min: Number,
        max: Number
    }
});

const Job = mongoose.model('Job', jobSchema);

// API routes

// Create a new job
app.post('/jobs', async (req, res) => {
    try {
        console.log('request received' + req.body)
        const job = new Job(req.body);
        await job.save();
        res.status(201).send(job);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Job creation failed',
            error: error.message
        });
    }
});

// Get all jobs
app.get('/jobs', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.send(jobs);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching jobs', error });
    }
});

// Get a job by ID
app.get('/jobs/:id', async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters
    try {
        const job = await Job.findById(id); // Use Mongoose's findById method
        if (!job) {
            return res.status(404).send({ message: 'Job not found' }); // Handle case where job is not found
        }
        res.send(job); // Return the found job
    } catch (error) {
        res.status(500).send({ message: 'Error fetching job', error }); // Handle errors
    }
});

// Start the HTTP server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Define Application schema and model
const applicationSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    currentJob: String,
    jobDescription: String,
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' } // Reference to the Job
});

const Application = mongoose.model('Application', applicationSchema);

// API route to submit an application
app.post('/applications', async (req, res) => {
    try {
        const application = new Application(req.body);
        await application.save();
        res.status(201).send(application);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Application submission failed',
            error: error.message
        });
    }   
});

// Get all applications
app.get('/applications', async (req, res) => {
    try {
        const applications = await Application.find().populate('jobId'); // Populate job details if needed
        res.send(applications);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching applications', error });
    }
});

// Get an application by ID
app.get('/applications/:id', async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters
    try {
        const application = await Application.findById(id).populate('jobId'); // Populate job details if needed
        if (!application) {
            return res.status(404).send({ message: 'Application not found' }); // Handle case where application is not found
        }
        res.send(application); // Return the found application
    } catch (error) {
        res.status(500).send({ message: 'Error fetching application', error }); // Handle errors
    }
});
