import Review from "../models/Review.js";
import { isAdmin } from "./userController.js";

// Create a review
export async function addReview(req, res) {
	if (req.user == null) {
		res.status(401).json({
			message: "Unauthorized",
		});
		return;
	}

	try {
		const { text, rating } = req.body;

		if (!text) {
			return res.status(400).json({
				message: "Review text is required",
			});
		}

		const newReview = new Review({
			email: req.user.email,
			firstName: req.user.firstName,
			lastName: req.user.lastName,
			text: text,
			rating: rating || 5,
		});

		await newReview.save();

		res.json({
			message: "Review added successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: "Error adding review",
			error: error.message,
		});
	}
}

// Get all reviews
export async function getReviews(req, res) {
	try {
		const reviews = await Review.find().sort({ date: -1 });
		res.json(reviews);
	} catch (error) {
		res.status(500).json({
			message: "Error fetching reviews",
			error: error.message,
		});
	}
}

// Delete a review
export async function deleteReview(req, res) {
	if (req.user == null) {
		res.status(401).json({
			message: "Unauthorized",
		});
		return;
	}

	try {
		const id = req.params.id;
		const review = await Review.findById(id);

		if (review == null) {
			res.status(404).json({
				message: "Review not found",
			});
			return;
		}

		// Only the owner of the review can delete it
		if (review.email === req.user.email) {
			await Review.deleteOne({ _id: id });
			res.json({
				message: "Review deleted successfully",
			});
		} else {
			res.status(403).json({
				message: "Forbidden: You are not allowed to delete this review",
			});
		}
	} catch (error) {
		res.status(500).json({
			message: "Error deleting review",
			error: error.message,
		});
	}
}
