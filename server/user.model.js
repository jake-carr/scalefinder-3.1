const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserPreferences = new Schema({
  selectedNoteIndex: { type: Number, required: false },
  selectedScaleIndex: { type: Number, required: false },
  numberOfStrings: { type: Number, required: false },
  numberOfFrets: { type: Number, required: false },
  highlightRoots: { type: Boolean, required: false },
  showUnusedNotes: { type: Boolean, required: false },
  degrees: { type: Boolean, required: false },
  sargamNotation: { type: Boolean, required: false },
  sharps: { type: Boolean, required: false },
});

const User = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    preferences: { type: UserPreferences, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", User);
