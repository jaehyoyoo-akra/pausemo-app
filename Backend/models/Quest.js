const mongoose = require('mongoose');

const questSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    enum: ['업무/성과', '관계/소통', '감정/스트레스', '습관/중독', '자기인식', '성장/변화'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    enum: ['active', 'completed', 'locked'],
    default: 'active',
  },
  progress: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  daysActive: {
    type: Number,
    default: 0,
  },
  todayResponse: {
    type: Boolean,
    default: false,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  lastResponseDate: {
    type: Date,
    default: Date.now,
  },
  consecutiveDays: {
    type: Number,
    default: 0,
  },
  totalResponses: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Quest', questSchema);
