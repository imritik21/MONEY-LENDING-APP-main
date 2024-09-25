const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');          //this will help me to generate token

// I am doing api call for signup    (api/signup)  ...it will send user information to the database
router.post('/signup', async (req, res) => {

    // Now this line helps for Extracting user details from the request body   (called destructuring)
    const { phoneNumber, email, name, dob, monthlySalary, password } = req.body;

    // Calculate age from the date of birth  on the basis of year...
    const age = new Date().getFullYear() - new Date(dob).getFullYear();

    // Check if the user is at least 20 years old
    if (age < 20) {
        return res.status(400).json({ message: 'User should be above 20 years of age.' });
    }

    // Check if the monthly salary is at least 25,000
    if (monthlySalary < 25000) {
        return res.status(400).json({ message: 'Monthly salary should be 25k or more.' });
    }

    // here i have used bcrypt to make it in hashed format, for security purpose.
    const hashedPassword = await bcrypt.hash(password, 10);

    // as i got the data of user,  i will now create a new user to store data in mongodb
    const user = new User({
        phoneNumber,
        email,
        name,
        dob,
        monthlySalary,
        password: hashedPassword,
        status: 'Approved', // Automatically approve upon signup
        purchasePower: monthlySalary * 2,
    });

    // Save the user to the database
    await user.save();

    // Respond with a success message and user details
    res.status(201).json({ message: 'User registered successfully.', user });
});

// now i do api call for login,  api/login..
router.post('/login', async (req, res) => {

    // Extract email and password from request body   (since i will do verification on the basis of this two.)
    const { email, password } = req.body;

    // I have wrote the code to get whole user details on the basis of email...
    const user = await User.findOne({ email });

    // If user not found, return error message
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Compare provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate a JWT token for the authenticated user, this will create a token for particular user that will valid for 1 hour, and on the basis of this 
    //i will fetch user information
    const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });

    // Respond with the token
    res.status(200).json({ token });
});

// Now i have call api for fetching user details,,,  /api/user
router.get('/user', async (req, res) => {

    // 1st extract token from the Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');

    // Verify the token and decode user ID
    const decoded = jwt.verify(token, 'secretkey');
    const user = await User.findById(decoded.userId);

    // If user not found, return error message
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    // Respond with user data
    res.status(200).json({
        purchasePower: user.purchasePower,
        phoneNumber: user.phoneNumber,
        email: user.email,
        dateOfRegistration: user.dateOfRegistration,
        dob: user.dob,
        monthlySalary: user.monthlySalary,
        loans: user.loans
    });
});

// Borrow Money API
router.post('/borrow', async (req, res) => {
    // Extract token from the Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');

    // Verify the token and decode user ID
    const decoded = jwt.verify(token, 'secretkey');
    const user = await User.findById(decoded.userId);

    // If user not found, return error message
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    // Extract amount and tenure from request body
    const { amount, tenure } = req.body;

    // Define interest rate
    const interestRate = 0.08;

    // Calculate total repayment amount including interest
    const totalAmount = amount * (1 + interestRate);
    const monthlyRepayment = totalAmount / tenure;

    // Check if the amount is within the user's purchase power
    if (amount > user.purchasePower) {
        return res.status(400).json({ message: 'Insufficient purchase power.' });
    }

    // Update the user's purchase power and add the loan details
    user.purchasePower -= amount;
    user.loans.push({ amount, tenure, monthlyRepayment });

    // Save the updated user to the database
    await user.save();

    // Calculate total monthly repayment across all loans
    const totalMonthlyRepayment = user.loans.reduce((sum, loan) => sum + loan.monthlyRepayment, 0);

    // Respond with the updated purchase power and total monthly repayment
    res.status(200).json({
        purchasePower: user.purchasePower,
        monthlyRepayment: totalMonthlyRepayment,
    });
});

module.exports = router;