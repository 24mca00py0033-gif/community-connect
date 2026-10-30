const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const User = require("../models/User");
const auth = require("../middleware/auth");
const { uploadBuffer } = require("../config/cloudinary");

const router = express.Router();

// keep the uploaded image in memory, then send it to Cloudinary
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4 * 1024 * 1024 }, // 4 MB (Vercel allows ~4.5 MB per request)
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

// escape user text so it is safe inside a RegExp
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const like = (value) => new RegExp(escapeRegex(value.trim()), "i");

// All routes below need a valid JWT
router.use(auth);

// GET /api/users/featured  -> 10 profiles for the home page
router.get("/featured", async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 }).limit(10);
  res.json({ users });
});

// GET /api/users/search?name=&lastName=&profession=&locality=&company=
router.get("/search", async (req, res) => {
  const { name, lastName, profession, locality, company } = req.query;
  const query = {};

  if (name && name.trim()) query.name = like(name);
  if (lastName && lastName.trim()) query.lastName = like(lastName);
  if (profession && profession.trim()) query.profession = like(profession);
  if (locality && locality.trim()) query.locality = like(locality);
  if (company && company.trim()) query.company = like(company);

  const users = await User.find(query).sort({ name: 1 }).limit(100);
  res.json({ users });
});

// GET /api/users/filters -> distinct values for the members page dropdowns
router.get("/filters", async (req, res) => {
  const clean = (arr) => arr.filter(Boolean).sort((a, b) => a.localeCompare(b));
  const [companies, localities, professions] = await Promise.all([
    User.distinct("company"),
    User.distinct("locality"),
    User.distinct("profession"),
  ]);
  res.json({
    companies: clean(companies),
    localities: clean(localities),
    professions: clean(professions),
  });
});

// GET /api/users?company=&locality=&profession=&sort=newest|name
router.get("/", async (req, res) => {
  const { company, locality, profession, sort } = req.query;
  const query = {};

  if (company) query.company = company;
  if (locality) query.locality = locality;
  if (profession) query.profession = profession;

  const sortBy = sort === "name" ? { name: 1 } : { createdAt: -1 };
  const users = await User.find(query).sort(sortBy);
  res.json({ users });
});

// GET /api/users/:id -> one member's full profile
router.get("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ message: "Member not found" });
  }
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "Member not found" });
  res.json({ user });
});

// PUT /api/users/me  (multipart form: fields + optional "profilePic" file)
router.put("/me", (req, res) => {
  upload.single("profilePic")(req, res, async (uploadErr) => {
    if (uploadErr) return res.status(400).json({ message: uploadErr.message });

    try {
      const { name, lastName, profession, company, locality, mobile } = req.body;

      if (name !== undefined && !name.trim()) {
        return res.status(400).json({ message: "Name cannot be empty" });
      }

      const update = {};
      if (name !== undefined) update.name = name.trim();
      if (lastName !== undefined) update.lastName = lastName.trim();
      if (profession !== undefined) update.profession = profession.trim();
      if (company !== undefined) update.company = company.trim();
      if (locality !== undefined) update.locality = locality.trim();
      if (mobile !== undefined) update.mobile = mobile.trim();

      if (req.file) {
        update.profilePic = await uploadBuffer(req.file.buffer);
      }

      const user = await User.findByIdAndUpdate(req.userId, update, { new: true });
      res.json({ user });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Could not update profile. Check your Cloudinary keys in backend/.env",
      });
    }
  });
});

module.exports = router;
