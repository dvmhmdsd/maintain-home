import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  name: {
    type: String
  },
});

const Device = mongoose.model("Device", DeviceSchema);
export default Device;
