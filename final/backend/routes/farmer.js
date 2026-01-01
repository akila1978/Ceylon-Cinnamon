import { Router } from 'express';
import { pool } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { auth } from '../middleware/auth.js';

const router = Router();

router.post('/signup', async (req, res) => {
  const { name, email, password, district } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  try {
    const [exist] = await pool.query('SELECT id FROM farmers WHERE email = ?', [email]);
    if (exist.length) return res.status(409).json({ message: 'Email already registered' });
    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO farmers (name, email, password, district) VALUES (?, ?, ?, ?)',
      [name, email, hash, district || null]
    );
    const token = jwt.sign({ id: result.insertId, type: 'farmer' }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
  try {
    const [rows] = await pool.query('SELECT id, password FROM farmers WHERE email = ?', [email]);
    if (!rows.length) return res.status(401).json({ message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, rows[0].password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: rows[0].id, type: 'farmer' }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/me', auth('farmer'), async (req, res) => {
  res.json({ ok: true, role: 'farmer', id: req.user.id });
});

export default router;
