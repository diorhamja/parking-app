const UserController = require('../controllers/user.controller');
const requireAuth = require('../middleware/authMiddleware');

module.exports = (app) => {
    app.get('/api/users', requireAuth, UserController.getAllUsers);
    app.get('/api/users/:id', requireAuth, UserController.getOneUser);
    app.post('/api/users/login', UserController.login);
    app.post('/api/users/register', UserController.register);
    app.get('/api/users/logout', UserController.logout);
    app.get('/api/users/me', requireAuth, UserController.getCurrentUser);
    app.patch('/api/users/:id', requireAuth, UserController.updateUser);
    app.delete('/api/users/:id', requireAuth, UserController.deleteUser);
}