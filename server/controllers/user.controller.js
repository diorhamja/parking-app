const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3 * 24 * 60 * 60 })
}

module.exports.getAllUsers = (request, response) => {
    User.find({})
        .then(users => {
            response.json(users);
        })
        .catch(err => {
            response.json(err);
        })
}

module.exports.getOneUser = (request, response) => {
    User.findOne({ _id: request.params.id })
        .then(user => response.json(user))
        .catch(err => response.json(err))
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

        const token = createToken(user._id);

        res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });

        const userToSend = user.toObject();
        delete userToSend.password;

        res.json({ user: userToSend, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

module.exports.register = async (req, res) => {
    const { firstName, lastName, email, password, location } = req.body;

    if (!firstName || !lastName || !email || !password || !location) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'This email already exists' });
        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            location
        });

        const token = createToken(user._id);

        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000
        });

        const userToSend = user.toObject();
        delete userToSend.password;

        res.status(201).json({ user: userToSend, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports.logout = (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Logged out successfully' });
};

module.exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.updateUser = (request, response) => {
    User.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
        .then(updatedUser => response.json(updatedUser))
        .catch(err => response.status(400).json(err))
}

module.exports.deleteUser = (request, response) => {
    User.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.status(400).json(err))
}