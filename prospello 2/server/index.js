   // server/index.js
   require('dotenv').config();
   const express = require('express');
   const mongoose = require('mongoose');
   const cors = require('cors'); // Import the cors package
   const employeeRoutes = require('./routes/employeeRoutes');
   const authRoutes = require('./routes/authRoutes');

   const app = express();
   const PORT = 3000;

   app.use(cors({
       origin: 'http://localhost:5173', // Allow only this origin
       methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
       credentials: true // Allow credentials if needed
   }));
   app.use(express.json());

   // Log the MongoDB URI to check if it's defined
   console.log('MongoDB URI:', 'mongodb+srv://Ramsha:Systemerror@hrms.zp7jatd.mongodb.net');

   // Connect to MongoDB
   mongoose.connect('mongodb+srv://Ramsha:Systemerror@hrms.zp7jatd.mongodb.net')
     .then(() => console.log('MongoDB connected'))
     .catch(err => console.error('MongoDB connection error:', err));

   app.use('/api/employees', employeeRoutes);
   app.use('/api/auth', authRoutes);

   app.listen(PORT, () => {
     console.log(`Server is running on http://localhost:${PORT}`);
   });