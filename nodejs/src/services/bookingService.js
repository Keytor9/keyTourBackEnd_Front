const Booking = require('../model/BookingModel');
const User = require('../model/UserModel'); // Import the User model
const CustomError = require('../utils/customError');
const Notification = require('../model/NotificationModel')
const admin = require('../../firebase/firebaseAdmin');
const APIFeatures = require('../utils/apiFeatures');
const { scheduleAllEvents } = require('../cronScheduler');
const mongoose = require('mongoose'); 
const moment = require('moment');
class BookingService {
    // Create a new booking and link it to the user
    // async createBooking(data) {
    //     const booking = new Booking(data);
    //     await booking.save();

    //     // Add booking reference to the user's bookings array
    //     const user = await User.findById(booking.user);
    //     if (!user) throw new CustomError('User not found', 404);

    //     user.bookings.push(booking._id);
    //     await user.save();

    //     return booking;
    // }

    // async (bookingId, userId) {
    //     // Find the booking by ID and ensure it belongs to the correct user
    //     const bookingObjectId = new mongoose.Types.ObjectId(bookingId);
    //     const userObjectId = new mongoose.Types.ObjectId(userId);
      
    
    //     // Find the booking by ID and user
    //     const booking = await Booking.findOne({ _id:bookingId, user:userId });
      
    //     if (!booking) {
    //       throw new CustomError('Booking not found', 404);
    //     }
      
    //     // Check if the booking can be cancelled
    //     if (booking.opentopaid || new Date() >= new Date(booking.startDate)) {
    //       throw new CustomError('Booking cannot be cancelled. Either payment is open or the tour has started.', 400);
    //     }
      
    //     // Cancel the booking by setting the status to 'cancelled'
    //     booking.status = 'cancelled';
    //     await booking.save();
      
    //     return booking;
    //   }



    
    async createBooking(data) {
        const existingBooking = await Booking.findOne({
            user: data.user,
            tour: data.tour,
        });
        if (new Date() >= new Date(data.startDate)) {
            throw new CustomError(`Booking cannot be created. the start date you enter expired ${data.startDate}.`, 400);
          }
        

        // if (existingBooking) {
        //     throw new CustomError('You have already booked this tour', 400);
        // }
    
        const booking = new Booking(data);
        await booking.save();
    
        // Add booking reference to the user's bookings array
        const user = await User.findById(booking.user);
        if (!user) {
            throw new CustomError('User not found', 404);
        }
    
        user.bookings.push(booking._id);
        await user.save();
    
        // Send notification to the user if they are logged in and have an FCM token
        if (user.isLogin && user.fcmtoken) {
            const message = {
                notification: {
                    title: 'Booking Created',
                    body: `Your booking for tour has been created successfully.`
                },
                token: user.fcmtoken,
            };
    
            try {
                // Send notification via FCM
                await admin.messaging().send(message);
    
                // Save the notification to the database
                const notification = new Notification({
                    user: user._id,
                    tourid: booking.tour, // Assuming tour ID is stored in booking.tour
                    title: 'Booking Created',
                    message: `Your booking for tour has been created successfully.`
                });
                await notification.save();
            } catch (error) {
                if (error.code === 'messaging/registration-token-not-registered') {
                    console.error('FCM token is not registered:', error.message);
                    // You may want to update the user's FCM token field to null or handle it as per your logic
                    user.fcmtoken = null;
                    await user.save();
                } else {
                    console.error('Error sending FCM message:', error.message);
                }
            }
        }
        scheduleAllEvents(booking?._id, booking?.datetopiad);
        return booking;
    }
    

    








    // async createBooking(data) {


    //     const existingBooking = await Booking.findOne({
    //         user: data.user,
    //         tour: data.tour,
    //       });
    //       console.log("existingBooking")
    //       console.log(existingBooking)

    //       if (existingBooking) throw new CustomError('you are already added booking this tour', 400);
     
          








    //     const booking = new Booking(data);
    //     await booking.save();

    //     // Add booking reference to the user's bookings array
    //     const user = await User.findById(booking.user);
    //     if (!user) throw new CustomError('User not found', 404);

    //     user.bookings.push(booking._id);
    //     await user.save();

    //     // Send notification to the user if they are logged in and have an FCM token
    //     if (user.isLogin && user.fcmtoken) {
    //         const message = {
    //             notification: {
    //                 title: 'Booking Created',
    //                 body: `Your booking for tour  has been created successfully.`
    //             },
    //             token: user.fcmtoken,
    //         };

    //         // Send notification via FCM
    //         await admin.messaging().send(message);

    //         // Save the notification to the database
    //         const notification = new Notification({
    //             user: user._id,
    //             tourid: booking.tour, // Assuming tour ID is stored in booking.tour
    //             title: 'Booking Created',
    //             message: `Your booking for tour has been created successfully.`
    //         });
    //         await notification.save();
    //     }

    //     return booking;
    // }






    async getAllBookings(queryParams) {
        const filter = {};
        
        // Check if vendor._id exists and include it in the filter for pending and accepted counts
        if (queryParams.vendor && queryParams.vendor) {
            filter['vendor'] = queryParams.vendor; // Assuming vendor._id is the correct field structure in your Booking schema
        }
    
        // Count pending and accepted bookings for the vendor (if vendor exists in the query)
        const pendingCount = await Booking.countDocuments({ ...filter, status: 'pending' });
        const acceptedCount = await Booking.countDocuments({ ...filter, status: 'confirmed' });
    
        // Log pending and accepted counts
        console.log(`Pending count: ${pendingCount}, Accepted count: ${acceptedCount}`);
    
        // Use the filter in your query
        const features = new APIFeatures(Booking.find(filter).populate('user', 'name phone'), queryParams)
            .filter()
            .sort()
            .limitFields()
            .paginate();
    
        const destinations = await features.query;
    
        return {
            results: destinations.length,
            pendingCount,     // Include pending count in the response
            acceptedCount,    // Include accepted count in the response
            data: destinations
        };
    }
    









    // Process payment for a booking
    async processPayment(bookingId, paymentData) {
        const booking = await Booking.findById(bookingId);
        if (!booking) throw new CustomError('Booking not found', 404);
        if (booking.payment_status !== 'pending') throw new CustomError('Payment already processed', 400);

        // Simulate payment processing
        const isPaymentSuccessful = this.simulateVisaPayment(paymentData);

        if (isPaymentSuccessful) {
            booking.paymentStatus = 'paid';
            await booking.save();
        } else {
            throw new CustomError('Payment failed', 400);
        }

        return booking;
    }

    // Simulate payment processing (this is a mock function)
    simulateVisaPayment(paymentData) {
        // In a real scenario, you would integrate with a payment gateway here
        // For this simulation, we'll assume the payment is always successful if the card number is valid
        const { cardNumber, expiryDate, cvv } = paymentData;
        if (cardNumber && expiryDate && cvv) {
            return true;
        }
        return false;
    }

    // Cancel a booking
    async cancelBooking(bookingId) {
        const booking = await Booking.findById(bookingId);
        if (!booking) throw new CustomError('Booking not found', 404);
        if (booking.payment_status === 'canceled') throw new CustomError('Booking already canceled', 400);

        if (!booking) {
            throw new CustomError('Booking not found', 404);
          }
          const formattedDate = moment(booking.startDate).format('YYYY-MM-DD');
          // Check if the booking can be cancelled
          if (booking.opentopaid || new Date() >= new Date(booking.startDate)) {
            throw new CustomError(`Booking cannot be cancelled. Either payment is open or the tour has started ${formattedDate}.`, 400);
          }
        
          // Cancel the booking by setting the status to 'cancelled'
          booking.status = 'cancelled';
          booking.opentopaid = false;

          await booking.save({validateBeforeSave: false});
        
          return booking;
    }
    async delete(bookingId) {
        const booking = await Booking.findByIdAndDelete(bookingId);
        // if (!booking) throw new CustomError('Booking not found', 404);
        // if (booking.payment_status === 'canceled') throw new CustomError('Booking already canceled', 400);

        // booking.payment_status = 'canceled';
        // await booking.save();

        return booking;
    }
    async deleteManya() {
        const booking = await Booking.deleteMany();
        // if (!booking) throw new CustomError('Booking not found', 404);
        // if (booking.payment_status === 'canceled') throw new CustomError('Booking already canceled', 400);

        // booking.payment_status = 'canceled';
        // await booking.save();

        return booking;
    }
}

module.exports = new BookingService();
