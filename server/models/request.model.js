const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    spot: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Spot', 
        required: true 
    },
    fromUser: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true },
    toUser: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending',
    },
}, { timestamps: true });

module.exports = mongoose.model('Request', RequestSchema);