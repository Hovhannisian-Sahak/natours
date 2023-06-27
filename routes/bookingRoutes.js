const express = require('express');
const bookController = require('../contorllers/bookController');
const authController = require('../contorllers/authController');
const router = express.Router();
router.use(authController.protect);
router.get('/checkout-session/:tourID', bookController.getCheckoutSession);
router.use(authController.restrictTo('admin', 'lead-guide'));
router
  .route('/')
  .get(bookController.getAllBookings)
  .post(bookController.createBooking);
router
  .route('/:id')
  .get(bookController.getBooking)
  .patch(bookController.updateBooking)
  .delete(bookController.deleteBooking);
module.exports = router;
