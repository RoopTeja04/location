const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin", "sub-admin"] },
    createdAt: { type: Date, default: Date.now },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: Number }

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);