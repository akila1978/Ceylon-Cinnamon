const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const connection = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.post("/api/user/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });
  const hashedPassword = bcrypt.hashSync(password, 10);
  connection.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") return res.status(400).json({ message: "Email already exists" });
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "User registered successfully!" });
    }
  );
});

app.post("/api/user/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Missing fields" });
  connection.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(400).json({ message: "User not found" });
    const user = results[0];
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) return res.status(400).json({ message: "Incorrect password" });
    res.json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email, role: "user" }
    });
  });
});

app.post("/api/farmer/signup", (req, res) => {
  const { name, email, password, district } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });
  const hashedPassword = bcrypt.hashSync(password, 10);
  connection.query(
    "INSERT INTO farmers (name, email, password, district) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, district || null],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") return res.status(400).json({ message: "Email already exists" });
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Farmer registered successfully!" });
    }
  );
});

app.post("/api/farmer/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Missing fields" });
  connection.query("SELECT * FROM farmers WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(400).json({ message: "Farmer not found" });
    const farmer = results[0];
    const passwordMatch = bcrypt.compareSync(password, farmer.password);
    if (!passwordMatch) return res.status(400).json({ message: "Incorrect password" });
    res.json({
      message: "Login successful",
      farmer: { id: farmer.id, name: farmer.name, email: farmer.email, district: farmer.district, role: "farmer" }
    });
  });
});

app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Missing fields" });
  connection.query("SELECT * FROM admins WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(400).json({ message: "Admin not found" });
    const admin = results[0];
    const passwordMatch = bcrypt.compareSync(password, admin.password);
    if (!passwordMatch) return res.status(400).json({ message: "Incorrect password" });
    res.json({
      message: "Login successful",
      admin: { id: admin.id, name: admin.name, email: admin.email, role: "admin" }
    });
  });
});

app.get("/api/users", (req, res) => {
  connection.query("SELECT id, name, email FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get("/api/farmers", (req, res) => {
  connection.query("SELECT id, name, email, district FROM farmers", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.listen(3001, () => {
  console.log("✅ Server running on https://5a24bee9-460b-41f6-948a-ab78a2b8cead-00-3a3qn4n7m9ueq.sisko.replit.dev/");
});
