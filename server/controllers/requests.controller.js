const Request = require('../models/request.model');
const Spot = require('../models/spots.model');

module.exports.getAllRequests = (request, response) => {
    Request.find({})
        .populate('spot')
        .populate('fromUser')
        .populate('toUser')
        .then(requests => {
            response.json(requests);
        })
        .catch(err => {
            response.json(err);
        })
}

module.exports.getAllRequestsBySpotId = (request, response) => {
    const spotId = request.params.spotId;

    Request.find({ spot: spotId })
        .populate('spot')
        .populate('fromUser')
        .populate('toUser')
        .then(requests => {
            response.json(requests);
        })
        .catch(err => {
            response.json(err);
        })
}

module.exports.getOneRequest = (request, response) => {
    Request.findOne({ _id: request.params.id })
        .populate('spot')
        .populate('fromUser')
        .populate('toUser')
        .then(req => response.json(req))
        .catch(err => response.json(err))
}

module.exports.acceptRequest = async (req, res) => {
    const { requestId } = req.params;

    try {
        const acceptedRequest = await Request.findById(requestId);
        if (!acceptedRequest) return res.status(404).json({ message: 'Request not found' });
    
        const spotId = acceptedRequest.spot;
    
        acceptedRequest.status = 'accepted';
        await acceptedRequest.save();
    
        await Request.updateMany(
            { spot: spotId, _id: { $ne: requestId } },
            { $set: { status: 'declined' } }
        );
    
        await Spot.findByIdAndUpdate(spotId, { active: false });
    
        res.json({ message: 'Request accepted, others declined, spot marked inactive' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

module.exports.createRequest = (request, response) => {
    Request.create(request.body)
        .then(req => response.json(req))
        .catch(err => response.json(err))
}

module.exports.updateRequest = (request, response) => {
    Request.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
        .then(updatedRequest => response.json(updatedRequest))
        .catch(err => response.json(err))
}

module.exports.deleteRequest = (request, response) => {
    Request.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}