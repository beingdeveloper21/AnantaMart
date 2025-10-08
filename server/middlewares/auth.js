import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not Authorized, Login Again' });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decode.id; // ✅ Safe: store userId here
    next();
  } catch (error) {
    console.error('JWT Error:', error.message);
    return res.status(401).json({ success: false, message: 'Invalid Token' });
  }
};

export default authUser;
