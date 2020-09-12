import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    name: {
      required: [true, "الإسم مطلوب"],
      type: String,
    },
    email: {
      required: [true, "البريد الإلكتروني مطلوب"],
      type: String,
    },
    phone: {
      required: [true, "رقم الهاتف مطلوب"],
      type: String,
    },
    location: {
      required: [true, "المكان مطلوب"],
      type: String,
    },
    gps: {
      longitude: String,
      latitude: String,
    },
    orderNumber: String,
    device: {
      type: Schema.Types.ObjectId,
      ref: "Device",
    },
    model: {
      required: true,
      type: String,
    },
    paymentType: {
      required: true,
      type: String
    },
    damage: {
      required: true,
      type: String,
    },
    time: {
      required: true,
      type: String,
    },
    status: {
      type: String,
      default: "قيد العمل"
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
