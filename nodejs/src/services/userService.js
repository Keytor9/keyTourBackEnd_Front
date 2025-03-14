const User = require('../model/UserModel');
const bcrypt = require('bcryptjs');
const CustomError = require('../utils/customError');
const APIFeatures = require('../utils/apiFeatures');

const Tour = require('../model/ToursModel');
const Destination = require('../model/DestinationModel');

class UserService {




    async toggleDestinationWishlist(userId, destinationId) {
        const user = await User.findById(userId);
        if (!user) throw new CustomError('User not found', 404);

        const isAlreadyInWishlist = user.destinationwishlist.some(item => item._id.toString() === destinationId);
        console.log(isAlreadyInWishlist);
        if (isAlreadyInWishlist) {
            // Remove from wishlist
            user.destinationwishlist = user.destinationwishlist.filter(
                item => item._id.toString() !== destinationId
            );
        } else {
            // Add to wishlist
            user.destinationwishlist.push({ _id: destinationId });
        }
        
        await user.save();
        
        // if (isAlreadyInWishlist) {
        //     // Remove from wishlist
        //     user.destinationwishlist = user.destinationwishlist.filter(
        //         id => id.toString() !== destinationId
        //     );
        // } else {
        //     // Add to wishlist
        //     user.destinationwishlist.push(destinationId);
        // }
        // await user.save();
        console.log(user.destinationwishlist.length)
        return user;
    }

    // Toggle wishlist status for tour
    async toggleTourWishlist(userId, tourId) {
        const user = await User.findById(userId);
        if (!user) throw new CustomError('User not found', 404);

        // const isAlreadyInWishlist = user.tourwishlist.includes(tourId);
        // console.log(isAlreadyInWishlist)

        // if (isAlreadyInWishlist) {
        //     // Remove from wishlist
        //     user.tourwishlist = user.tourwishlist.filter(
        //         id => id.toString() !== tourId
        //     );
        // } else {
        //     // Add to wishlist
        //     user.tourwishlist.push(tourId);
        // }

        // await user.save();


        const isAlreadyInWishlist = user.tourwishlist.some(item => item._id.toString() === tourId.toString());
   console.log(isAlreadyInWishlist)
   console.log(user.tourwishlist)


        if (isAlreadyInWishlist) {
            // Remove from wishlist
            user.tourwishlist = user.tourwishlist.filter(
                item => item._id.toString() !== tourId
            );
        } else {
            // Add to wishlist
            user.tourwishlist.push({ _id: tourId });
        }
        
        await user.save();
        return user;
    }
















    // Update user profile with image and other details
    async updateUserProfile(userId, data, imagePath) {
        const user = await User.findById(userId);

        if (!user) throw new CustomError('User not found', 404);

        if (imagePath) {
            user.image = imagePath; // Update image path
        }

        if (data.name) user.name = data.name;
        if (data.phone) user.phone = data.phone;
        if (data.address) user.address = data.address;

        await user.save({validateBeforeSave:false});
        return user;
    }

    // Change user password
    async changeUserPassword(userId, oldPassword, newPassword) {
        const user = await User.findById(userId);
        if (!user) throw new CustomError('User not found', 404);

        // Check if old password is correct
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) throw new CustomError('Incorrect old password', 400);

        // Hash the new password and save it
        user.password = await bcrypt.hash(newPassword, 12);
        await user.save();

        return user;
    }

    async getUserById(userId) {
        const user = await User.findById(userId);
        if (!user) throw new CustomError('User not found', 404);
        return user;
    }










    async getAllUsers(queryParams) {
        
        const filter = {};
        const pendingCount = await User.countDocuments({ isVerified: false });
        const acceptedCount = await User.countDocuments({ isVerified: true });
     
        
        const counts = await User.find().countDocuments();
    
        const features = new APIFeatures(User.find(filter), queryParams)
            .filter()
            .sort()
            .limitFields()
            .paginate();
    
        const tours = await features.query;
        return {
            results: tours.length,
            counts: counts,
            pendingCount: pendingCount,
            acceptedCount: acceptedCount,
            // rejectedCount: rejectedCount,
            data: tours
        };
    }
    






}

module.exports = new UserService();
