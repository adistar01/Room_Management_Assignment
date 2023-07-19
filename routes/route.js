const express = require('express');
const registerController = require('../controllers/registerController');
const isEligible = require('../middlewares/isEligible');
const loginController = require('../controllers/loginController');
const bookingController = require('../controllers/bookingController');
const deleteBooking = require('../controllers/deleteBooking');
const isLogin = require('../middlewares/isLogin');

const Router = express.Router();

Router.post('/register', registerController);

Router.post('/login', loginController);

Router.post('/booking/:id', isLogin, bookingController);

Router.delete('/booking/:id', isEligible, deleteBooking);

module.exports = Router;