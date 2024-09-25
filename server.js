const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/money-lending', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(express.static('public'));

// API routes
app.use('/api', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


