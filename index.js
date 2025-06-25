const express = require("express");
const cors = require("cors");
const multer = require("multer");
const XLSX = require("xlsx");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Fake in-memory DB
const users = [];
const uploads = [];

const SECRET_KEY = "your_secret_key";

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Signup
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  res.json({ message: "User registered successfully" });
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

// Upload Excel
app.post("/upload", upload.single("file"), (req, res) => {
  const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  uploads.push({ filename: req.file.originalname, data, uploadedAt: new Date() });
  res.json({ message: "File uploaded successfully", data });
});

// Get Upload History
app.get("/history", (req, res) => {
  res.json(uploads);
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));

