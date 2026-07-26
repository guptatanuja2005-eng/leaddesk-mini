const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const leadRoutes = require("./routes/leadRoutes");
const adminRoutes = require("./routes/adminRoutes");
const dns = require('dns');

dns.setServers(["1.1.1.1", "8.8.8.8"]);


const app = express();

// =======================
// Middleware
// =======================
app.use(
  cors({
    origin: "https://leaddesk-mini-rust.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

// =======================
// Routes
// =======================
app.get("/", (req, res) => {
  res.send("LeadDesk API is Running...");
});

app.use("/api/leads", leadRoutes);

app.use("/api/admin", adminRoutes);

// =======================
// MongoDB Connection
// =======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ Connection Error:", err);
  });

// =======================
// Server
// =======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});