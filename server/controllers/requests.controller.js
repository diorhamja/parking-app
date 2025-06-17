const Request = require('../models/request.model');

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

module.exports.getOneRequest = (request, response) => {
    Request.findOne({ _id: request.params.id })
        .populate('spot')
        .populate('fromUser')
        .populate('toUser')
        .then(req => response.json(req))
        .catch(err => response.json(err))
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