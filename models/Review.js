import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
            default: 5
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        }
    }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
