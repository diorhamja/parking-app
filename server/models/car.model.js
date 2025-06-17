const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    make: { 
        type: String
    },
    model: { 
        type: String
    },
    licensePlate: { 
        type: String
    },
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);