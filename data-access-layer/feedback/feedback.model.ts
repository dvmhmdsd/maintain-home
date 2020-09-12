import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  rate: {
    type: Number,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);
export default Feedback;
