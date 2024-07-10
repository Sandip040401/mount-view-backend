// src/index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import roomRoutes from './routes/roomRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/rooms', roomRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
