const express = require('express');
const viewsController = require('../contorllers/viewsController');
const authController = require('../contorllers/authController');
const bookController = require('../contorllers/bookController');
const router = express.Router();
// router.use(viewsController.alerts);
router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewsController.getSignupForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get(
  '/my-tours',
  // bookController.createBookingCheckout,
  authController.protect,
  viewsController.getMyTours
);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);
module.exports = router;
