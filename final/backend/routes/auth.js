import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function auth(requiredType = null) {
  return (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      if (requiredType && decoded.type !== requiredType) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.user = decoded;
      next();
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}
