const auth = require('../models/authModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Function to register a new user
const registerUser = async (req, res) => {
    const { username, password } = req.body

    try {
        // Check if user already exists
        const existingUser = await auth.findUserByUsername(username)
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create new user
        const newUser = await auth.createUser({ username, password: hashedPassword })
        res.status(201).json({ message: 'User registered successfully', user: newUser })
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error })
    }
}

// Function to log in a user
const loginUser = async (req, res) => {
    const { username, password } = req.body

    try {
        // Find user by username
        const user = await auth.findUserByUsername(username)
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' })
        res.status(200).json({ message: 'Login successful', token })
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error })
    }
}

// Function to log out a user
const logoutUser = (req, res) => {
    // Invalidate the token on the client-side or handle session clearing
    res.status(200).json({ message: 'Logout successful' })
}

// Exporting the functions
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
}