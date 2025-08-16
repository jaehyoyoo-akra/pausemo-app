const mongoose = require('mongoose');
const crypto = require('crypto');

const apiKeySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  service: {
    type: String,
    enum: ['openai', 'google', 'other'],
    required: true,
    default: 'openai',
  },
  encryptedKey: {
    type: String,
    required: true,
  },
  keyHash: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastUsed: {
    type: Date,
    default: Date.now,
  },
  usageCount: {
    type: Number,
    default: 0,
  },
  metadata: {
    keyName: String,
    description: String,
    permissions: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// API 키 암호화
apiKeySchema.methods.encryptKey = function(apiKey, encryptionKey) {
  try {
    const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
    let encrypted = cipher.update(apiKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  } catch (error) {
    throw new Error('API 키 암호화 실패: ' + error.message);
  }
};

// API 키 복호화
apiKeySchema.methods.decryptKey = function(encryptedKey, encryptionKey) {
  try {
    const decipher = crypto.createDecipher('aes-256-cbc', encryptionKey);
    let decrypted = decipher.update(encryptedKey, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    throw new Error('API 키 복호화 실패: ' + error.message);
  }
};

// API 키 해시 생성 (검증용)
apiKeySchema.methods.generateKeyHash = function(apiKey) {
  return crypto.createHash('sha256').update(apiKey).digest('hex');
};

// API 키 검증
apiKeySchema.methods.validateKey = function(apiKey) {
  const hash = this.generateKeyHash(apiKey);
  return hash === this.keyHash;
};

// 사용량 업데이트
apiKeySchema.methods.updateUsage = function() {
  this.lastUsed = new Date();
  this.usageCount += 1;
  return this.save();
};

// 가상 필드: 마스킹된 API 키
apiKeySchema.virtual('maskedKey').get(function() {
  if (this.encryptedKey) {
    return 'sk-' + '*'.repeat(20) + this.encryptedKey.slice(-4);
  }
  return null;
});

// 미들웨어: 업데이트 시간 자동 설정
apiKeySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// 인덱스 설정
apiKeySchema.index({ userId: 1, service: 1 });
apiKeySchema.index({ keyHash: 1 });
apiKeySchema.index({ isActive: 1 });

module.exports = mongoose.model('APIKey', apiKeySchema);
