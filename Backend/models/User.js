const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false, // 구글 로그인의 경우 비밀번호가 없을 수 있음
  },
  googleId: {
    type: String,
    sparse: true, // null 값 허용하되 중복 방지
  },
  name: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    required: false,
  },
  loginType: {
    type: String,
    enum: ['email', 'google'],
    default: 'email',
  },
  // Pausemo 앱 관련 필드들
  userType: {
    primary: {
      type: String,
      enum: [
        '성과-증명형', '관계-의존형', '완벽-가면형', '희생-헌신형',
        '반항-차별형', '침묵-관찰형', '과시-표현형', '변동-불안형'
      ],
      required: false,
    },
    secondary: {
      type: String,
      enum: [
        '성과-증명형', '관계-의존형', '완벽-가면형', '희생-헌신형',
        '반항-차별형', '침묵-관찰형', '과시-표현형', '변동-불안형'
      ],
      required: false,
    },
  },
  fatigueLevel: {
    type: Number,
    enum: [1, 2, 3, 4], // L1 ~ L4
    default: 2,
  },
  preferredTime: {
    type: [String],
    enum: ['오전', '오후', '저녁'],
    default: ['오전', '저녁'],
  },
  stats: {
    selfControl: { type: Number, default: 50, min: 0, max: 100 },
    independence: { type: Number, default: 50, min: 0, max: 100 },
    resilience: { type: Number, default: 50, min: 0, max: 100 },
    selfEsteem: { type: Number, default: 50, min: 0, max: 100 },
    consistency: { type: Number, default: 50, min: 0, max: 100 },
    relationship: { type: Number, default: 50, min: 0, max: 100 },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);