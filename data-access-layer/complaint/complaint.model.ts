import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
  orderNumber: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

const Complaint = mongoose.model("Complaint", ComplaintSchema);
export default Complaint;
