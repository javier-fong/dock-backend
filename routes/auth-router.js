const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth-controller');

router.post('/googlelogin', AuthController.googleLogin);

module.exports = router;