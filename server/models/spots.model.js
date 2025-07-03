const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, "User must be defined"]
    },
    description: { 
        type: String,
        required: [true, "Description is required"]
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: [true, "Location is required"]
        }
    },
    timeActive: {
        type: Number,
        required: [true, "Must set a time"]
    },
    expiresAt: {
        type: Date
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

SpotSchema.pre('save', function(next) {
    if (this.isNew && this.timeActive) {
        this.expiresAt = new Date(Date.now() + this.timeActive * 60000);
    }
    next();
});

SpotSchema.statics.expireInactiveSpots = async function () {
    const now = new Date();
    return this.updateMany(
        { active: true, expiresAt: { $lte: now } },
        { $set: { active: false } }
    );
};

module.exports = mongoose.model('Spot', SpotSchema);
