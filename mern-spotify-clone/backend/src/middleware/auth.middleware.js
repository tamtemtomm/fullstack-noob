import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  // Check if userId exist in clerk
  if (!req.auth.userId) {
    res.status(401).json({ message: "Unauthorized - you must be logged in" });
    return;
  }
  next();
};

export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) {
      res.status(403).json({ message: "Unauthorized - you must be an admin" });
      return;
    }

    next();
  } catch (error) {
    console.error("Error in requireAdmin middleware : ", error);
    next(error);
  }
};
