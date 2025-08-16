const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');

const router = express.Router();

// ✨추가: 피드백 스키마 및 모델
const FeedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Feedback = mongoose.model('Feedback', FeedbackSchema);

// ✨추가: 피드백 전송 API (인증 필요)
router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const newFeedback = new Feedback({
      user: req.user.userId,
      title,
      content,
    });
    await newFeedback.save();
    res.status(201).json({ message: '피드백이 성공적으로 접수되었습니다.' });
  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({ error: '피드백 전송 실패.' });
  }
});

module.exports = router;