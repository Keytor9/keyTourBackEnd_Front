const OTP = require('../model/OTPModel');
const crypto = require('crypto');
const User = require('../model/UserModel')
class OTPService {
    async generateOTP(userId) {
        // const otp = crypto.randomInt(100000, 999999).toString();
        const user = await User.findById(userId);
        // if (user.isVerified) {
        //     console.log(user)
        //     // If the user is already verified, return a message indicating no OTP is needed
        //     throw new Error('this user already verified');

        // }
    
        const otp = "123456"
        const expiresAt = new Date(Date.now() + parseInt(process.env.OTP_EXPIRY) * 60000);

        await OTP.create({ userId, otp, expiresAt });

        return otp; // Send this OTP via SMS, Email, etc.
    }

    async verifyOTP(userId, otp) {
        const validOTP = await OTP.findOne({ userId, otp, expiresAt: { $gte: new Date() } });
        if (!validOTP) {
            throw new Error('Invalid or expired OTP');
        }
        await OTP.deleteOne({ _id: validOTP._id }); // OTP used, so remove it
        return true;
    }
}

module.exports = new OTPService();
