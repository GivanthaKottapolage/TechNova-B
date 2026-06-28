import express from "express";
import { addReview, deleteReview, getReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", addReview);
reviewRouter.get("/", getReviews);
reviewRouter.delete("/:id", deleteReview);

export default reviewRouter;
