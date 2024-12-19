const express = require('express');
const BookingController = require('../controllers/bookingController');
const auth = require('../middlewares/authMiddleware');


const router = express.Router();

router.post('/cancel-booking', BookingController.cancelBookingController);
router
    .route('/').get(auth('vendor',"admin"),BookingController.getallbooking)
    .post(BookingController.createBooking).delete(BookingController.deletemanyBooking);

router
    .route('/:id/pay')
    .post(BookingController.processPayment);

router
    .route('/:id/cancel')
    .post(BookingController.cancelBooking);
    router
    .route('/:id').get(BookingController.getBookingById).delete(BookingController.deleteBooking)
 
module.exports = router;
