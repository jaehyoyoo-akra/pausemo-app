const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Google OAuth 클라이언트 ID들
const GOOGLE_ANDROID_CLIENT_ID = process.env.GOOGLE_ANDROID_CLIENT_ID || '472208960312-d53rb3rujt4m166mdmilu6urf8ck9o1k.apps.googleusercontent.com';
const GOOGLE_IOS_CLIENT_ID = process.env.GOOGLE_IOS_CLIENT_ID || '472208960312-cli1qspacvdhpdmlu1pim7k39h3flhe8.apps.googleusercontent.com';
const GOOGLE_WEB_CLIENT_ID = process.env.GOOGLE_WEB_CLIENT_ID || '472208960312-865rbp1eo9vg76v2822cbecuc5pgtfml.apps.googleusercontent.com';

// Google OAuth 클라이언트 생성 (Android용)
const googleAndroidClient = new OAuth2Client(GOOGLE_ANDROID_CLIENT_ID);
// Google OAuth 클라이언트 생성 (iOS용)
const googleIOSClient = new OAuth2Client(GOOGLE_IOS_CLIENT_ID);
// Google OAuth 클라이언트 생성 (Web용)
const googleWebClient = new OAuth2Client(GOOGLE_WEB_CLIENT_ID);

// 디버깅: 클라이언트 ID 확인
console.log('🔧 설정된 클라이언트 ID들:');
console.log('Android:', GOOGLE_ANDROID_CLIENT_ID);
console.log('iOS:', GOOGLE_IOS_CLIENT_ID);
console.log('Web:', GOOGLE_WEB_CLIENT_ID);

// 회원가입
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // 이메일 중복 확인
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: '이미 존재하는 이메일입니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: '회원가입 성공!' });
  } catch (error) {
    res.status(500).json({ error: '회원가입 중 오류가 발생했습니다.' });
  }
});

// 로그인
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: '사용자를 찾을 수 없습니다.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: '비밀번호가 일치하지 않습니다.' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: '로그인 중 오류가 발생했습니다.' });
  }
});

// 구글 로그인 (Android/iOS/Web 지원)
router.post('/google', async (req, res) => {
  console.log('🔍 Google 로그인 요청 받음');
  console.log('📝 Request body:', req.body);
  
  const { idToken, platform } = req.body;
  
  if (!idToken) {
    console.error('❌ ID Token이 없습니다');
    return res.status(400).json({ error: 'ID Token이 필요합니다.' });
  }
  
  if (!platform) {
    console.error('❌ Platform 정보가 없습니다');
    return res.status(400).json({ error: 'Platform 정보가 필요합니다. (android/ios/web)' });
  }
  
  try {
    console.log(`🔑 Google ID 토큰 검증 시작... (Platform: ${platform})`);
    
    // 플랫폼별 Google 클라이언트 선택
    let googleClient, clientId;
    switch (platform.toLowerCase()) {
      case 'android':
        googleClient = googleAndroidClient;
        clientId = GOOGLE_ANDROID_CLIENT_ID;
        break;
      case 'ios':
        googleClient = googleIOSClient;
        clientId = GOOGLE_IOS_CLIENT_ID;
        break;
      case 'web':
        googleClient = googleWebClient;
        clientId = GOOGLE_WEB_CLIENT_ID;
        break;
      default:
        return res.status(400).json({ error: '지원하지 않는 플랫폼입니다. (android/ios/web)' });
    }
    
    console.log(`🔑 선택된 클라이언트 ID: ${clientId}`);
    console.log(`🔑 사용할 Google 클라이언트: ${googleClient.credentials.clientId || '설정되지 않음'}`);
    
    // Google ID 토큰 검증
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: clientId,
    });
    
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;
    
    // 기존 사용자 확인
    let user = await User.findOne({ 
      $or: [
        { email },
        { googleId }
      ]
    });
    
    if (user) {
      // 기존 사용자가 있는 경우 업데이트
      if (!user.googleId) {
        user.googleId = googleId;
        user.loginType = 'google';
        user.name = name;
        user.picture = picture;
        await user.save();
      }
    } else {
      // 새 사용자 생성
      user = new User({
        email,
        googleId,
        name,
        picture,
        loginType: 'google',
      });
      await user.save();
    }
    
    // JWT 토큰 생성
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    
    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        loginType: user.loginType,
      }
    });
    
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ error: '구글 로그인 중 오류가 발생했습니다.' });
  }
});

module.exports = router;