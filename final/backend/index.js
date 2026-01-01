import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected!");
});

// --- SIGNUP ---
app.post("/api/auth/signup", (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) return res.status(400).send("All fields required");

  const hashedPassword = bcrypt.hashSync(password, 8);

  db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, role || "user"],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ message: "User registered successfully!" });
    }
  );
});

// --- LOGIN ---
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send("All fields required");

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send("User not found");

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) return res.status(401).send("Invalid password");

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  });
});

// --- MULTER SETUP for PRODUCT IMAGE ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// --- PRODUCT UPLOAD (FARMER) ---
app.post("/api/products", upload.single("image"), (req, res) => {
  const { name, price, farmer_id } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !price || !farmer_id) return res.status(400).send("All fields required");

  db.query(
    "INSERT INTO products (name, price, image, farmer_id) VALUES (?, ?, ?, ?)",
    [name, price, image, farmer_id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ message: "Product uploaded successfully!" });
    }
  );
});

// --- GET PRODUCTS ---
app.get("/api/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// --- Start Server ---
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
