const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  questId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quest',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['observation', 'gap', 'reinforcement'],
    required: true,
  },
  difficulty: {
    type: Number,
    enum: [1, 2, 3, 4], // D1 ~ D4
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['업무/성과', '관계/소통', '감정/스트레스', '습관/중독', '자기인식', '성장/변화'],
    required: true,
  },
  userType: {
    primary: String,
    secondary: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  efficiency: {
    responseRate: { type: Number, default: 0, min: 0, max: 1 },
    completionRate: { type: Number, default: 0, min: 0, max: 1 },
    lastUpdated: { type: Date, default: Date.now },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Card', cardSchema);
