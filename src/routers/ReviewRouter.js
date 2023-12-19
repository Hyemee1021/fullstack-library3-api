import express from "express";
import {
  createBurrow,
  getManyBurrow,
  updateBurrow,
} from "../models/burrow/BurrowModel.js";
import {
  newBurrowValidation,
  newReviewValidation,
} from "../middlewares/joiValidation.js";

import { updateBookById } from "../models/book/BookModel.js";
import { adminAuth, userAuth } from "../middlewares/authMiddleware.js";
import { createReview, getManyReview } from "../models/review/ReviewModel.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    // const { role, _id } = req.userInfo;
    // if admin makes request, return all the burrow history, if logedin user make requests then return their burrow only based on the userId in burrow table

    const reviews = await getManyReview();

    res.json({
      status: "success",
      message: "Here is the list of burrow history",
      reviews,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", userAuth, newReviewValidation, async (req, res, next) => {
  try {
    const userId = req.userInfo._id;
    const result = await createReview({ ...req.body, userId });

    if (result?._id) {
      //udate the id to burrowschema -  reviewGiven

      //in burrow table we are looking for it by birow id and update reviewgiven
      await updateBurrow(
        {
          _id: req.body.burrowHistoryId,
        },
        {
          reviewGiven: result._id,
        }
      );

      return res.json({
        status: "success",
        message: "You have successfully reviewed the book.",
      });
    }
    res.json({
      status: "error",
      message: "Unable to submit your review, please try again.",
    });
  } catch (error) {
    next(error);
  }
});

//from userAuth I get userInfo
router.patch("/:_id", adminAuth, async (req, res, next) => {
  try {
    const { _id } = req.params; //from url
    const { status } = req.body;

    console.log(_id, req.body);
    //either active or inactive

    if (["active", "inactive"].includes(status)) {
      const result = await updateReview({ _id }, { status });

      if (result?._id) {
        return res.json({
          status: "success",
          message: "status of review has been updated",
        });
      }
    }
    res.json({
      status: "error",
      message: "unsuccessfully, you returned it",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:_id", adminAuth, async (req, res, next) => {
  try {
    const { _id } = req.params; //from url

    const result = await deleteReview({ _id });

    if (result?._id) {
      return res.json({
        status: "success",
        message: "status of review has been updated",
      });
    }
    res.json({
      status: "error",
      message: "unsuccessfully, you returned it",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
