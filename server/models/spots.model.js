const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true
    },
    description: { 
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    timeActive: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Spot', SpotSchema);