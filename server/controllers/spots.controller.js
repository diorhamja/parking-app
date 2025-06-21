const Spot = require('../models/spots.model');

module.exports.getAllSpots = (request, response) => {
    Spot.find({})
        .populate('user')
        .then(spots => {
            response.json(spots);
        })
        .catch(err => {
            response.json(err);
        })
}

module.exports.getOneSpot = (request, response) => {
    Spot.findOne({ _id: request.params.id })
        .populate('user')
        .then(spot => response.json(spot))
        .catch(err => response.json(err));
}

module.exports.createSpot = (request, response) => {
    Spot.create(request.body)
        .then(spot => {
            return Spot.findById(spot._id).populate('user');
        })
        .then(populatedSpot => response.json(populatedSpot))
        .catch(err => response.status(400).json(err));
};


module.exports.updateSpot = (request, response) => {
    Spot.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
        .then(updatedSpot => response.json(updatedSpot))
        .catch(err => response.json(err));
}

module.exports.deleteSpot = (request, response) => {
    Spot.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err));
}