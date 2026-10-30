require("dotenv").config();

const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// Make sure MongoDB is connected before any API route runs
app.use("/api", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    res.status(500).json({ message: "Database connection failed" });
  }
});

// ---- API routes ----
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));

// ---- Monolith (local / own server): serve the built React app from Express ----
// On Vercel the static files are served by Vercel itself, so this is skipped there.
const distPath = path.join(__dirname, "..", "frontend", "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("*", (req, res) => res.sendFile(path.join(distPath, "index.html")));
} else {
  app.get("/", (req, res) =>
    res.send("Community Connect API is running. Build the frontend to serve the website here.")
  );
}

// Start a normal server only when run directly (npm start / npm run dev).
// On Vercel the app is imported by api/index.js and exported as a function.
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  connectDB()
    .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
    .catch((err) => {
      console.error("MongoDB connection failed:", err.message);
      process.exit(1);
    });
}

module.exports = app;
