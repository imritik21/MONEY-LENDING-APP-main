const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    monthlySalary: { type: Number, required: true },
    password: { type: String, required: true },
    status: { type: String, required: true },
    purchasePower: { type: Number, required: true },
    loans: [
        {
            amount: { type: Number, required: true },
            tenure: { type: Number, required: true },
            monthlyRepayment: { type: Number, required: true }
        }
    ],
    dateOfRegistration: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
