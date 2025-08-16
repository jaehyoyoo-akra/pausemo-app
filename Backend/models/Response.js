const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
    required: true,
  },
  questId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quest',
    required: true,
  },
  answer: {
    type: String,
    enum: ['Y', 'N'],
    required: true,
  },
  responseTime: {
    type: Number, // 응답까지 걸린 시간 (초)
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  context: {
    timeOfDay: String, // 오전, 오후, 저녁
    location: String, // 집, 회사, 이동중 등
    mood: String, // 기분 상태
  },
});

module.exports = mongoose.model('Response', responseSchema);
