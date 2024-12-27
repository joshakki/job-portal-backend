const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));
//
//     // Define Job schema and model
//     const jobSchema = new mongoose.Schema({
//       title: String,
//         description: String,
//           companyId: String,
//             location: String,
//               workMode: String,
//                 skillsRequired: [String],
//                   salaryRange: {
//                       min: Number,
//                           max: Number
//                             }
//                             });
//
//                             const Job = mongoose.model('Job', jobSchema);
//
//                             // API routes
//
//                             // Create a new job
//                             app.post('/jobs', async (req, res) => {
//                               try {
//                                   const job = new Job(req.body);
//                                       await job.save();
//                                           res.status(201).send(job);
//                                             } catch (error) {
//                                                 res.status(500).json({
//                                                       status: 'error',
//                                                             message: 'Job creation failed',
//                                                                   error: error.message
//                                                                       });
//                                                                         }
//                                                                         });
//
//                                                                         // Get all jobs
//                                                                         app.get('/jobs', async (req, res) => {
//                                                                           const jobs = await Job.find();
//                                                                             res.send(jobs);
//                                                                             });
//
//                                                                             // Get a job by ID
//                                                                             app.get('/jobs/:id', async (req, res) => {
//                                                                               const { id } = req.params; // Extract the ID from the request parameters
//                                                                                 try {
//                                                                                     const job = await Job.findById(id); // Use Mongoose's findById method
//                                                                                         if (!job) {
//                                                                                               return res.status(404).send({ message: 'Job not found' }); // Handle case where job is not found
//                                                                                                   }
//                                                                                                       res.send(job); // Return the found job
//                                                                                                         } catch (error) {
//                                                                                                             res.status(500).send({ message: 'Error fetching job', error }); // Handle errors
//                                                                                                               }
//                                                                                                               });
//
//                                                                                                               // SSL certificate files (Replace with your actual file paths)
//                                                                                                               const privateKey = fs.readFileSync('/path/to/privkey.pem', 'utf8');
//                                                                                                               const certificate = fs.readFileSync('/path/to/cert.pem', 'utf8');
//                                                                                                               const ca = fs.readFileSync('/path/to/chain.pem', 'utf8');
//
//                                                                                                               // SSL credentials
//                                                                                                               const credentials = { key: privateKey, cert: certificate, ca: ca };
//
//                                                                                                               // Start the HTTPS server
//                                                                                                               const PORT = process.env.PORT || 3000;
//                                                                                                               https.createServer(credentials, app).listen(PORT, () => {
//                                                                                                                 console.log(`HTTPS Server running on port ${PORT}`);
//                                                                                                                 });
//
