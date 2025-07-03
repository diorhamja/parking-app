const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: [true, "User reference is required"] 
    },
    make: { 
        type: String,
        required: [true, "Make is required"] 
    },
    model: { 
        type: String,
        required: [true, "Model is required"] 
    },
    color: {
        type: String,
        required: [true, "Color is required"] 
    },
    plate: { 
        type: String,
        minlength: [6, "License plate must be at least 6 characters long"],
        maxlength: [7, "Please enter a valid license plate"],
        required: [true, "License plate is required"] 
    },
    image: {
        type: String,
        required: [true, "Image generation failed"]
    }
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);