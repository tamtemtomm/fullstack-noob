import express, { Express } from "express";
import mongoose from "mongoose";
import FinancialRecordRouter from "./routes/financial-record";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());

const mongoURL: string =
  "mongodb+srv://tamtemtom235:Qb5Z8YzUYQd5Y1Oq@cluster0.xxhq2vu.mongodb.net/";

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Failed to Connect to MongoDB!");
  });

app.use("/financial-records", FinancialRecordRouter);

app.listen(port, () => {
  console.log(`Server Running on Port : ${port}`);
});
