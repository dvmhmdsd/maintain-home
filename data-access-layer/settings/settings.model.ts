import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
  videoUrl: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
});

const Settings = mongoose.model("Settings", SettingsSchema);
export default Settings;
