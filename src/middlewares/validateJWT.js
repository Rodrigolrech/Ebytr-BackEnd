require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.secret || 'minhasenhasecreta';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const payload = jwt.verify(token, secret);
    const { data: { _id, username, role } } = payload;
    req.creator = { _id, username };
    req.role = role;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateJWT;
