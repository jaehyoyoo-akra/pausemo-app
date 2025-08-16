const express = require('express');
const router = express.Router();
const Quest = require('../models/Quest');
const auth = require('../middleware/auth');

// 사용자의 활성 퀘스트 조회
router.get('/', auth, async (req, res) => {
  try {
    const quests = await Quest.find({ userId: req.user.userId, state: 'active' });
    res.json(quests);
  } catch (error) {
    res.status(500).json({ error: '퀘스트 조회에 실패했습니다.' });
  }
});

// 새 퀘스트 생성
router.post('/', auth, async (req, res) => {
  try {
    const { category, name } = req.body;
    const quest = new Quest({
      userId: req.user.userId,
      category,
      name,
    });
    await quest.save();
    res.status(201).json(quest);
  } catch (error) {
    res.status(500).json({ error: '퀘스트 생성에 실패했습니다.' });
  }
});

// 퀘스트 진행률 업데이트
router.patch('/:id/progress', auth, async (req, res) => {
  try {
    const { progress, todayResponse } = req.body;
    const quest = await Quest.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { 
        progress,
        todayResponse,
        daysActive: quest.daysActive + 1,
        lastResponseDate: new Date(),
        consecutiveDays: todayResponse ? quest.consecutiveDays + 1 : 0,
        totalResponses: quest.totalResponses + 1,
      },
      { new: true }
    );
    res.json(quest);
  } catch (error) {
    res.status(500).json({ error: '진행률 업데이트에 실패했습니다.' });
  }
});

// 퀘스트 완료
router.patch('/:id/complete', auth, async (req, res) => {
  try {
    const quest = await Quest.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { state: 'completed' },
      { new: true }
    );
    res.json(quest);
  } catch (error) {
    res.status(500).json({ error: '퀘스트 완료 처리에 실패했습니다.' });
  }
});

module.exports = router;
