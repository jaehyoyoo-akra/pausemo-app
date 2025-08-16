const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 미들웨어
app.use(cors());
app.use(express.json());

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pausemo')
  .then(() => console.log('MongoDB 연결 성공'))
  .catch(err => console.error('MongoDB 연결 실패:', err));

// 라우트
const authRoutes = require('./routes/auth');
const feedbackRoutes = require('./routes/feedback');
const questRoutes = require('./routes/quests');
const cardRoutes = require('./routes/cards');
const apiKeyRoutes = require('./routes/apiKeys');
const aiRoutes = require('./routes/ai');

app.use('/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/keys', apiKeyRoutes);
app.use('/api/ai', aiRoutes);

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: 'Pausemo API 서버가 실행 중입니다.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});