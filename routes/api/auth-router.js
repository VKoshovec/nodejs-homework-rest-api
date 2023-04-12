const express = require('express');
const { validateRegistration } = require('../../validators/validateAuthData');
const controllers = require('../../controllers/authControllers');

const router = express.Router();


router.post("/register", validateRegistration, controllers.registerUser);

module.exports = router;