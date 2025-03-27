import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import UserModel from './models/User.js';  



const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/testing')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Register Route
app.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

  
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' });
    }

    // Create a new user
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password,
      confirmPassword, 
    });

    await newUser.save();
    res.status(201).json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again.', error: error.message });
  }
});



app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      email: user.email,
      isProfileComplete: user.isProfileComplete,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
app.listen(5001, () => {
  console.log('Server is running on port 5001');
});