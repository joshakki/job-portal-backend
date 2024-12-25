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
  .catch(err => console.log(err));

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
  try{
  const job = new Job(req.body);
  await job.save();
  res.status(201).send(job);
  }
  catch(error){
    res.status(500).json({
      status: 'error',
      message: 'Job creation failed',
      error: error.message
    });
  }
});

// Get all jobs
app.get('/jobs', async (req, res) => {
  const jobs = await Job.find();
  res.send(jobs);
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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

