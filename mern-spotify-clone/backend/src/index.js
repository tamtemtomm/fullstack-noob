import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";

import { connectDB } from "./lib/db.js";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";

const PORT = process.env.PORT;
const __dirname = path.resolve();
const app = express();

app.use(express.json()); // to parse req.body
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(clerkMiddleware()); // this will add auth to req obj => req.user
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 mb max file size
    },
  })
);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// // error handling
app.use((err, req, res, next) => {
  return res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

// for testing purposes
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`The server is listening to ${PORT}`);
  connectDB();
});
