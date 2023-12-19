import UserSchema from "./UserSchema.js";

//Create
export const createUser = (userObj) => {
  return UserSchema(userObj).save();
};

//read
export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};
export const getOneAdmin = (filter) => {
  return UserSchema.findOne(filter);
};

//update

//delete

// add refreshJWT
export const updateRefreshJWT = async (email, refreshJWT) => {
  return await UserSchema.findOneAndUpdate({ email }, { refreshJWT });
};

//==find all students//just getting those properties
export const getManyStudnets = () => {
  const selectedProperties = {
    fName: 1,
    lName: 1,
    phone: 1,
    email: 1,
    role: 1,
    status: 1,
    _id: 1,
    createdAt: 1,
  };
  return UserSchema.find({}, selectedProperties);
};
