const express = require('express');
const { validateRegistrationLogin } = require('../../validators/validateAuthData');
const controllers = require('../../controllers/authControllers');

const router = express.Router();


router.post("/register", validateRegistrationLogin, controllers.registerUser);

router.post("/login", validateRegistrationLogin, controllers.loginUser);

module.exports = router;