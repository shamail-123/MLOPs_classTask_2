const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json()); // Corrected express.json()

// ✅ Connect to the correct database (MLOPs)
mongoose.connect('mongodb://localhost:27017/MLOPs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("MongoDB Connection Error:", err));

// Define the schema correctly with the right collection name (User)
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
}, { collection: "User" });  // ✅ Explicitly define collection name

const User = mongoose.model('User', UserSchema);

// Signup Route
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.json({ success: false, message: 'User already exists' });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ success: true, message: "Signup successful" });
});

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    console.log("Login attempt:", username, password); // Debugging log

    // Fetch user from database
    const user = await User.findOne({ username });

    console.log("User found in DB:", user); // Log retrieved user

    if (user && user.password === password) {
        res.json({ success: true, message: "You have logged in successfully" });
    } else {
        res.json({ success: false, message: "Invalid credentials" });
    }
});


// Start Server
app.listen(5000, () => console.log('Server running on port 5000'));
