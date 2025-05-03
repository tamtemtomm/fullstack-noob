import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    // get current user id
    const currentUserId = req.auth.userId;

    // get all of the users except my own
    const users = await User.find({
      clerkId: {
        $ne: currentUserId,
      },
    });

    // return the users
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in user/getAllUsers controller : ", error);
    next(error);
  }
};
