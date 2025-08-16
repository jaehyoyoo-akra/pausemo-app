const express = require('express');
const router = express.Router();
const Card = require('../models/Card');
const auth = require('../middleware/auth');

// 사용자에게 맞는 카드 조회
router.get('/:questId', auth, async (req, res) => {
  try {
    const { questId } = req.params;
    const { type, difficulty } = req.query;
    
    let query = { 
      questId, 
      userId: req.user.userId, 
      isActive: true 
    };
    
    if (type) query.type = type;
    if (difficulty) query.difficulty = parseInt(difficulty);
    
    const cards = await Card.find(query).sort({ 'efficiency.responseRate': -1 });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: '카드 조회에 실패했습니다.' });
  }
});

// 카드 응답 처리
router.post('/:id/respond', auth, async (req, res) => {
  try {
    const { answer, responseTime, context } = req.body;
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({ error: '카드를 찾을 수 없습니다.' });
    }
    
    // 응답 기록
    const Response = require('../models/Response');
    const response = new Response({
      userId: req.user.userId,
      cardId: card._id,
      questId: card.questId,
      answer,
      responseTime,
      context,
    });
    await response.save();
    
    // 카드 효율성 업데이트
    const totalResponses = await Response.countDocuments({ cardId: card._id });
    const completedResponses = await Response.countDocuments({ cardId: card._id, completed: true });
    
    card.efficiency.responseRate = totalResponses > 0 ? totalResponses / totalResponses : 0;
    card.efficiency.completionRate = totalResponses > 0 ? completedResponses / totalResponses : 0;
    card.efficiency.lastUpdated = new Date();
    await card.save();
    
    res.json({ success: true, response });
  } catch (error) {
    res.status(500).json({ error: '응답 처리에 실패했습니다.' });
  }
});

// 카드 효율성 업데이트
router.patch('/:id/efficiency', auth, async (req, res) => {
  try {
    const { responseRate, completionRate } = req.body;
    const card = await Card.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { 
        'efficiency.responseRate': responseRate,
        'efficiency.completionRate': completionRate,
        'efficiency.lastUpdated': new Date(),
      },
      { new: true }
    );
    res.json(card);
  } catch (error) {
    res.status(500).json({ error: '효율성 업데이트에 실패했습니다.' });
  }
});

module.exports = router;
