const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key'; // auth.js와 동일해야 합니다.

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ error: '인증 토큰이 없습니다. 접근이 거부되었습니다.' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: '유효하지 않은 토큰입니다.' });
  }
};