const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service');

// Routes
router.post('/authenticate', authenticate);

module.exports = router;

function authenticate(req, res, next) {
    authService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}
