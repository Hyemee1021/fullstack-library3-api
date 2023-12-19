import ReviewSchema from "./ReviewSchema.js";

//Create
export const createReview = (ReviewObj) => {
  return ReviewSchema(ReviewObj).save();
};

// //read @filter must be an object
// export const getAReview = (filter) => {
//   return ReviewSchema.findOne(filter);
// };

// return many burrow as an array
export const getManyReview = (filter) => {
  return ReviewSchema.find(filter);
};

// update
export const updateReview = (filter, update) => {
  return ReviewSchema.findOneAndUpdate(filter, update);
};

//delete
export const deleteReview = (filter) => {
  return ReviewSchema.findOneAndDelete(filter);
};
