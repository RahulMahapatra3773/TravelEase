const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema({
  feedback: { type: String, required: true },
}, { timestamps: true });
const FeedbackModel = mongoose.model('Feedback', feedbackSchema);
module.exports = FeedbackModel;
