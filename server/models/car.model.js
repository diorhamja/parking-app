const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    make: { 
        type: String,
        required: true
    },
    model: { 
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    plate: { 
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);