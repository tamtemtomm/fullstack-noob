import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    // get all the params
    const { id, firstName, lastName, imageUrl } = req.body;

    // check if user already exists
    const user = await User.findOne({ clerkId: id });

    // make an user
    if (!user) {
      //signup
      await User.create({
        clerkId: id,
        fullName: `${firstName}, ${lastName}`,
        imageUrl,
      });
    }

    // return the responds
    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error in auth callback : ", error);
    next(error)
  }
};
