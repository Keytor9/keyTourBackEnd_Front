const AuthService = require('../services/authService');
const response = require('../utils/response');
const OTP = require('../model/OTPModel');
const vendorService = require('../services/vendorService');
const bcrypt = require('bcryptjs');
const User = require('../model/UserModel');

class AuthController {
    async register(req, res, next) {
        try {
            const user = await AuthService.register(req.body);
user.password=undefined

            response(res, 201, user, 'User registered successfully. Please verify your OTP . OTP Will Exepired Within 5 Min');
        } catch (err) {
            next(err);
        }
    }




async login(req, res, next) {
    try {
        const { email, password,fcmtoken } = req.body;
        const role = req.headers['role']; // Extract the role from the header

        let user, token;

        if (role === 'vendor') {
            // Vendor login
            ({ user, token } = await vendorService.loginVendor(email, password,fcmtoken));
        }else if(role === 'admin'){
            ({ user, token } = await vendorService.loginAdmin(email, password,fcmtoken));
        }
        else{
            // Regular user login
            ({ user, token } = await AuthService.login(email, password,fcmtoken,res));
            console.log(user)
        }

        // Set the cookie with the token
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production', // Only HTTPS in production
        //     sameSite: 'strict',
        //     maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        // });

        // Hide the password in the response
        user.password = undefined;

        response(res, 200, { user, token }, 'Login successful');
    } catch (err) {
        next(err);
    }
}









// AuthController.js

async logout(req, res, next) {
    try {
        // Extract user ID from the request body (or from the token if you are using it)
        const userId = req.user.id;  // Assuming the user ID is available in `req.user` from JWT middleware
console.log(req.user)
        // Find the user by ID and update their `isLogin` status to `false`
        await User.findByIdAndUpdate(userId, { isLogin: false }, { new: true });

        // Clear the cookie by setting the token to an empty value and expiration to 0
        res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only HTTPS in production
            sameSite: 'strict',
            expires: new Date(0) // Immediately expire the cookie
        });

        // Send response confirming logout
        response(res, 200, null, 'Logout successful');
    } catch (err) {
        next(err);
    }
}

// async  logout(req, res, next) {
//     try {
//         // Clear the cookie by setting the token to an empty value and expiration to 0
//         res.cookie('token', '', {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production', // Only HTTPS in production
//             sameSite: 'strict',
//             expires: new Date(0) // Immediately expire the cookie
//         });

//         // Send response confirming logout
//         response(res, 200, null, 'Logout successful');
//     } catch (err) {
//         next(err);
//     }
// }



    async verifyOTP(req, res, next) {
        try {
            const { userId, otp } = req.body;
            const user = await AuthService.verifyOTP(userId, otp);
            response(res, 200, user, 'OTP verified successfully');
        } catch (err) {
            next(err);
        }
    }

    async resendOTP(req, res, next) {
        try {
            const { userId } = req.body;
            const otp = await AuthService.resendOTP(userId);
            response(res, 200, null, 'OTP resent successfully');
        } catch (err) {
            next(err);
        }
    }

    async forgetPassword(req, res, next) {
        try {
            const { email } = req.body;
            const otp = await AuthService.forgetPassword(email);
        const user = await User.findOne({ email });

            response(res, 200, {user: { _id: user._id, phone: user.phone ,isVerified: user.isVerified ,otp:'success sended' }}, 'OTP sent for password reset');
        } catch (err) {
            next(err);
        }
    }

    async resetPassword(req, res, next) {
        try {
            const { userId, newPassword, otp } = req.body;
            await AuthService.verifyOTP(userId, otp); // Verify OTP before allowing password reset
            const user = await AuthService.resetPassword(userId, newPassword);
            response(res, 200, user, 'Password reset successfully');
        } catch (err) {
            next(err);
        }
    }

    // Implement Google, Facebook, Apple login controllers
}

module.exports = new AuthController();
