const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json()); // Corrected express.json()

const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB and create database if it doesn't exist
const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/MLOPs');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`MongoDB Connection Error: ${err.message}`);
        process.exit(1); // Exit process if connection fails
    }
};

connectDB();

// ✅ Define the schema with explicit collection name
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
}, { collection: "User" });

const User = mongoose.model('User', UserSchema);

// ✅ Signup Route
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }

        const newUser = new User({ username, password });
        await newUser.save();
        res.json({ success: true, message: "Signup successful" });
    } catch (err) {
        console.error(`Signup Error: ${err.message}`);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// ✅ Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log("Login attempt:", username, password); // Debugging log

        // Fetch user from database
        const user = await User.findOne({ username });

        console.log("User found in DB:", user); // Log retrieved user

        if (user && user.password === password) {
            res.json({ success: true, message: "You have logged in successfully" });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (err) {
        console.error(`Login Error: ${err.message}`);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// ✅ Start Server on an Available Port
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
