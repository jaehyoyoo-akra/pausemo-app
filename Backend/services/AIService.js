const crypto = require('crypto');

class AIService {
  constructor() {
    this.OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    this.API_BASE_URL = 'https://api.openai.com/v1/chat/completions';
  }

  /**
   * OpenAI API 키 유효성 검사
   */
  async validateAPIKey() {
    try {
      if (!this.OPENAI_API_KEY) {
        throw new Error('OpenAI API 키가 설정되지 않았습니다.');
      }

      const response = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('❌ OpenAI API 키 유효성 검사 실패:', error);
      return false;
    }
  }

  /**
   * GPT-4o-mini에 질문하기
   */
  async askGPT4Mini(prompt, systemMessage = null) {
    try {
      if (!this.OPENAI_API_KEY) {
        throw new Error('OpenAI API 키가 설정되지 않았습니다.');
      }

      console.log('🤖 GPT-4o-mini API 호출 시작...');
      console.log('📝 질문:', prompt);

      const messages = [];
      
      // 시스템 메시지 설정
      if (systemMessage) {
        messages.push({
          role: 'system',
          content: systemMessage,
        });
      } else {
        // 기본 시스템 메시지
        messages.push({
          role: 'system',
          content: '당신은 Pausemo 앱의 AI 어시스턴트입니다. 사용자의 패턴 개선과 자기 성장을 돕는 친근하고 전문적인 조언을 제공합니다.',
        });
      }

      // 사용자 질문 추가
      messages.push({
        role: 'user',
        content: prompt,
      });

      const response = await fetch(this.API_BASE_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages,
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ OpenAI API 호출 실패:', errorData);
        
        throw new Error(errorData.error?.message || 'OpenAI API 호출에 실패했습니다.');
      }

      const data = await response.json();
      console.log('✅ AI 응답 성공:', data);

      const aiMessage = data.choices?.[0]?.message?.content;
      if (!aiMessage) {
        throw new Error('AI 응답 형식이 올바르지 않습니다.');
      }

      return {
        success: true,
        message: 'AI 응답을 성공적으로 받았습니다.',
        data: {
          response: aiMessage,
          model: data.model,
          usage: data.usage,
          promptTokens: data.usage?.prompt_tokens || 0,
          completionTokens: data.usage?.completion_tokens || 0,
          totalTokens: data.usage?.total_tokens || 0,
        },
      };
    } catch (error) {
      console.error('❌ AI 서비스 오류:', error);
      
      return {
        success: false,
        message: error.message || 'AI 서비스에 연결할 수 없습니다.',
        error: error.message,
      };
    }
  }

  /**
   * 패턴 개선 관련 질문
   */
  async askPatternImprovement(pattern, context) {
    const prompt = `다음과 같은 패턴을 개선하고 싶습니다:

패턴: ${pattern}
상황: ${context}

이 패턴을 개선하기 위한 구체적인 방법과 단계별 접근법을 제안해주세요. Pausemo 앱의 3초 멈춤 원칙에 맞는 실용적인 조언을 부탁드립니다.`;

    return this.askGPT4Mini(prompt);
  }

  /**
   * 감정 관리 조언
   */
  async askEmotionalSupport(emotion, situation) {
    const prompt = `현재 ${emotion}한 감정을 느끼고 있습니다.

상황: ${situation}

이 감정을 건강하게 다루고 극복하는 방법을 제안해주세요. 자기비난 없이 현실적이고 실천 가능한 조언을 부탁드립니다.`;

    return this.askGPT4Mini(prompt);
  }

  /**
   * 일반적인 자기 성장 조언
   */
  async askGeneralAdvice(question) {
    const systemMessage = `당신은 Pausemo 앱의 AI 어시스턴트입니다. 
사용자의 자기 성장과 패턴 개선을 돕는 전문가입니다.
항상 실용적이고 실천 가능한 조언을 제공하며, 
Pausemo의 핵심 가치인 "3초 멈춤"과 "패턴 개입"을 강조합니다.`;

    return this.askGPT4Mini(question, systemMessage);
  }

  /**
   * API 키 상태 확인
   */
  getAPIKeyStatus() {
    return {
      hasKey: !!this.OPENAI_API_KEY,
      keyLength: this.OPENAI_API_KEY ? this.OPENAI_API_KEY.length : 0,
      maskedKey: this.OPENAI_API_KEY ? 
        `sk-${'*'.repeat(Math.max(0, this.OPENAI_API_KEY.length - 7))}${this.OPENAI_API_KEY.slice(-4)}` : 
        'Not set',
    };
  }
}

module.exports = new AIService();
