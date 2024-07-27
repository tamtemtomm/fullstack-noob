import mongoose from "mongoose";

interface FinancialRecord {
  userId: string;
  date: Date;
  desription: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

const financialRecordShema = new mongoose.Schema<FinancialRecord>({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  desription: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  paymentMethod: { type: String, required: true },
});

const FinancialRecordModel = mongoose.model<FinancialRecord>(
  "FinancialRecord",
  financialRecordShema
);

export default FinancialRecordModel;
