const express = require('express');
const router = express.Router();
const AIService = require('../services/AIService');
const auth = require('../middleware/auth');

/**
 * AI API 키 상태 확인
 */
router.get('/status', auth, async (req, res) => {
  try {
    const status = AIService.getAPIKeyStatus();
    const isValid = await AIService.validateAPIKey();
    
    res.json({
      success: true,
      data: {
        ...status,
        isValid,
        message: isValid ? 'API 키가 유효합니다.' : 'API 키가 유효하지 않습니다.'
      }
    });
  } catch (error) {
    console.error('AI 상태 확인 실패:', error);
    res.status(500).json({
      success: false,
      error: 'AI 상태를 확인할 수 없습니다.'
    });
  }
});

/**
 * 기본 AI 질문
 */
router.post('/ask', auth, async (req, res) => {
  try {
    const { prompt, systemMessage } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: '질문을 입력해주세요.'
      });
    }

    const response = await AIService.askGPT4Mini(prompt, systemMessage);
    
    if (response.success) {
      res.json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (error) {
    console.error('AI 질문 실패:', error);
    res.status(500).json({
      success: false,
      error: 'AI 질문을 처리할 수 없습니다.'
    });
  }
});

/**
 * 패턴 개선 조언
 */
router.post('/pattern-improvement', auth, async (req, res) => {
  try {
    const { pattern, context } = req.body;

    if (!pattern || !context) {
      return res.status(400).json({
        success: false,
        error: '패턴과 상황을 모두 입력해주세요.'
      });
    }

    const response = await AIService.askPatternImprovement(pattern, context);
    
    if (response.success) {
      res.json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (error) {
    console.error('패턴 개선 조언 실패:', error);
    res.status(500).json({
      success: false,
      error: '패턴 개선 조언을 처리할 수 없습니다.'
    });
  }
});

/**
 * 감정 관리 조언
 */
router.post('/emotional-support', auth, async (req, res) => {
  try {
    const { emotion, situation } = req.body;

    if (!emotion || !situation) {
      return res.status(400).json({
        success: false,
        error: '감정과 상황을 모두 입력해주세요.'
      });
    }

    const response = await AIService.askEmotionalSupport(emotion, situation);
    
    if (response.success) {
      res.json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (error) {
    console.error('감정 관리 조언 실패:', error);
    res.status(500).json({
      success: false,
      error: '감정 관리 조언을 처리할 수 없습니다.'
    });
  }
});

/**
 * 일반적인 자기 성장 조언
 */
router.post('/general-advice', auth, async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        error: '질문을 입력해주세요.'
      });
    }

    const response = await AIService.askGeneralAdvice(question);
    
    if (response.success) {
      res.json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (error) {
    console.error('일반 조언 실패:', error);
    res.status(500).json({
      success: false,
      error: '일반 조언을 처리할 수 없습니다.'
    });
  }
});

/**
 * 테스트용 간단한 질문
 */
router.post('/test', auth, async (req, res) => {
  try {
    const testPrompt = '안녕하세요! 저는 매일 밤 늦게까지 SNS를 보는 습관이 있어요. 이 패턴을 개선하는 방법을 알려주세요.';
    
    const response = await AIService.askGPT4Mini(testPrompt);
    
    if (response.success) {
      res.json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (error) {
    console.error('테스트 질문 실패:', error);
    res.status(500).json({
      success: false,
      error: '테스트 질문을 처리할 수 없습니다.'
    });
  }
});

module.exports = router;
