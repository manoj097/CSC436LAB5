const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  dateCreated: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
  dateCompleted: { type: Date, default: null },
});

// Export model
module.exports = mongoose.model("Todo", TodoSchema);
