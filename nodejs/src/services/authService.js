const User = require('../model/UserModel');
const OTPService = require('./otpService');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const CustomError = require('../utils/customError');
const OTP = require('../model/OTPModel');
const response = require('../utils/response');

class AuthService {
    async register(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = new User({ ...data, password: hashedPassword });
        await user.save();

        const otp = await OTPService.generateOTP(user._id);
        // Send OTP via email/SMS
        return user;
    }
    async login(email, password, fcmtoken,res) {
        // Find the user by email
        const user = await User.findOne({ email });
        
        // Check if the user exists and if the password is correct
     if (user?.isBlocked) throw new CustomError('User is blocked. Please contact support.', 403)
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new CustomError('Invalid email or password', 401);
        }
    
        // Check if the user is verified
        if (!user.isVerified) {
 const otp = await OTPService.generateOTP(user._id);
 return response(res, 200, {user: { _id: user._id, phone: user.phone ,isVerified: user.isVerified ,otp:'success sended' } } , `User Not Verified The New OTP Sended To : ${user?.phone} And Will Expired Within 5 Min`);

        }
    
        // Update the user's login status and FCM token
        user.isLogin = true;
        user.fcmtoken = fcmtoken;
    
        // Save the user with updated login status and FCM token
        await user.save({validateBeforeSave:false});
    
        // Create JWT token for the session
        const token = jwt.createToken(user);
    
        return { user, token };
    }
    

    // async login(email, password) {
    //     const user = await User.findOne({ email });
    //     if (!user || !(await bcrypt.compare(password, user.password))) {
    //         throw new CustomError('Invalid email or password', 401);
    //     }
    //     if (!user.isVerified) {
    //         throw new CustomError('User not verified', 401);
    //     }

    //     const token = jwt.createToken(user);
    //     return { user, token };
    // }

    async verifyOTP(userId, otp) {
        await OTPService.verifyOTP(userId, otp);
        const user = await User.findByIdAndUpdate(userId, { isVerified: true }, { new: true });
        return user;
    }

    async resendOTP(userId) {
        const otp = await OTPService.generateOTP(userId);
        // Resend OTP via email/SMS
        return otp;
    }

    async forgetPassword(email) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new CustomError('User not found', 404);
        }
        const otp = await OTPService.generateOTP(user._id);
        // Send OTP via email/SMS
        return otp;
    }

    async resetPassword(userId, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
        return user;
    }

    // Implement Google, Facebook, Apple login methods
}

module.exports = new AuthService();
