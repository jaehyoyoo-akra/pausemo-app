const express = require('express');
const router = express.Router();
const APIKey = require('../models/APIKey');
const auth = require('../middleware/auth');
const crypto = require('crypto');

// 환경 변수에서 암호화 키 가져오기
const ENCRYPTION_KEY = process.env.API_ENCRYPTION_KEY || 'pausemo_api_secret_key_2024';

/**
 * 사용자의 API 키 목록 조회
 */
router.get('/', auth, async (req, res) => {
  try {
    const apiKeys = await APIKey.find({ 
      userId: req.user.userId,
      isActive: true 
    }).select('-encryptedKey -keyHash');

    res.json({
      success: true,
      data: apiKeys.map(key => ({
        id: key._id,
        service: key.service,
        maskedKey: key.maskedKey,
        isActive: key.isActive,
        lastUsed: key.lastUsed,
        usageCount: key.usageCount,
        metadata: key.metadata,
        createdAt: key.createdAt,
      }))
    });
  } catch (error) {
    console.error('API 키 목록 조회 실패:', error);
    res.status(500).json({ 
      success: false, 
      error: 'API 키 목록을 가져오는데 실패했습니다.' 
    });
  }
});

/**
 * 새 API 키 생성
 */
router.post('/', auth, async (req, res) => {
  try {
    const { service, apiKey, metadata } = req.body;

    if (!service || !apiKey) {
      return res.status(400).json({
        success: false,
        error: '서비스와 API 키는 필수입니다.'
      });
    }

    // 기존 API 키가 있는지 확인
    const existingKey = await APIKey.findOne({
      userId: req.user.userId,
      service,
      isActive: true
    });

    if (existingKey) {
      return res.status(400).json({
        success: false,
        error: '해당 서비스의 API 키가 이미 존재합니다.'
      });
    }

    // API 키 암호화
    const cipher = crypto.createCipher('aes-256-cbc', ENCRYPTION_KEY);
    let encryptedKey = cipher.update(apiKey, 'utf8', 'hex');
    encryptedKey += cipher.final('hex');

    // API 키 해시 생성
    const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');

    // 새 API 키 저장
    const newApiKey = new APIKey({
      userId: req.user.userId,
      service,
      encryptedKey,
      keyHash,
      metadata: metadata || {},
    });

    await newApiKey.save();

    res.status(201).json({
      success: true,
      message: 'API 키가 성공적으로 저장되었습니다.',
      data: {
        id: newApiKey._id,
        service: newApiKey.service,
        maskedKey: newApiKey.maskedKey,
        metadata: newApiKey.metadata,
        createdAt: newApiKey.createdAt,
      }
    });
  } catch (error) {
    console.error('API 키 생성 실패:', error);
    res.status(500).json({
      success: false,
      error: 'API 키 생성에 실패했습니다.'
    });
  }
});

/**
 * API 키 업데이트
 */
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { apiKey, metadata, isActive } = req.body;

    const apiKeyDoc = await APIKey.findOne({
      _id: id,
      userId: req.user.userId
    });

    if (!apiKeyDoc) {
      return res.status(404).json({
        success: false,
        error: 'API 키를 찾을 수 없습니다.'
      });
    }

    // API 키가 제공된 경우 암호화하여 업데이트
    if (apiKey) {
      const cipher = crypto.createCipher('aes-256-cbc', ENCRYPTION_KEY);
      let encryptedKey = cipher.update(apiKey, 'utf8', 'hex');
      encryptedKey += cipher.final('hex');

      const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');

      apiKeyDoc.encryptedKey = encryptedKey;
      apiKeyDoc.keyHash = keyHash;
    }

    // 메타데이터 업데이트
    if (metadata) {
      apiKeyDoc.metadata = { ...apiKeyDoc.metadata, ...metadata };
    }

    // 활성 상태 업데이트
    if (typeof isActive === 'boolean') {
      apiKeyDoc.isActive = isActive;
    }

    await apiKeyDoc.save();

    res.json({
      success: true,
      message: 'API 키가 성공적으로 업데이트되었습니다.',
      data: {
        id: apiKeyDoc._id,
        service: apiKeyDoc.service,
        maskedKey: apiKeyDoc.maskedKey,
        isActive: apiKeyDoc.isActive,
        metadata: apiKeyDoc.metadata,
        updatedAt: apiKeyDoc.updatedAt,
      }
    });
  } catch (error) {
    console.error('API 키 업데이트 실패:', error);
    res.status(500).json({
      success: false,
      error: 'API 키 업데이트에 실패했습니다.'
    });
  }
});

/**
 * API 키 삭제 (소프트 삭제)
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const apiKey = await APIKey.findOneAndUpdate(
      {
        _id: id,
        userId: req.user.userId
      },
      { isActive: false },
      { new: true }
    );

    if (!apiKey) {
      return res.status(404).json({
        success: false,
        error: 'API 키를 찾을 수 없습니다.'
      });
    }

    res.json({
      success: true,
      message: 'API 키가 성공적으로 삭제되었습니다.'
    });
  } catch (error) {
    console.error('API 키 삭제 실패:', error);
    res.status(500).json({
      success: false,
      error: 'API 키 삭제에 실패했습니다.'
    });
  }
});

/**
 * API 키 검증
 */
router.post('/:id/validate', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { apiKey } = req.body;

    if (!apiKey) {
      return res.status(400).json({
        success: false,
        error: '검증할 API 키를 입력해주세요.'
      });
    }

    const apiKeyDoc = await APIKey.findOne({
      _id: id,
      userId: req.user.userId,
      isActive: true
    });

    if (!apiKeyDoc) {
      return res.status(404).json({
        success: false,
        error: 'API 키를 찾을 수 없습니다.'
      });
    }

    // API 키 검증
    const isValid = apiKeyDoc.validateKey(apiKey);

    if (isValid) {
      // 사용량 업데이트
      await apiKeyDoc.updateUsage();
    }

    res.json({
      success: true,
      data: {
        isValid,
        lastUsed: apiKeyDoc.lastUsed,
        usageCount: apiKeyDoc.usageCount,
      }
    });
  } catch (error) {
    console.error('API 키 검증 실패:', error);
    res.status(500).json({
      success: false,
      error: 'API 키 검증에 실패했습니다.'
    });
  }
});

/**
 * API 키 사용 통계
 */
router.get('/stats', auth, async (req, res) => {
  try {
    const stats = await APIKey.aggregate([
      {
        $match: {
          userId: req.user.userId,
          isActive: true
        }
      },
      {
        $group: {
          _id: '$service',
          count: { $sum: 1 },
          totalUsage: { $sum: '$usageCount' },
          lastUsed: { $max: '$lastUsed' }
        }
      }
    ]);

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('API 키 통계 조회 실패:', error);
    res.status(500).json({
      success: false,
      error: 'API 키 통계를 가져오는데 실패했습니다.'
    });
  }
});

module.exports = router;
