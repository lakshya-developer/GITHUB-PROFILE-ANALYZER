const express = require("express");

const router = express.Router();

const {
  getUserData,
  analyzeProfile,
  getAllProfiles,
  getProfileByUsername,
} = require("../controllers/gitHubController");

// Analyze a GitHub profile and store/update in DB
router.get("/analyze/:username", analyzeProfile);

// Get all analyzed profiles
router.get("/profiles/:count", getAllProfiles);

// Get a single analyzed profile
router.get("/profile/:username", getProfileByUsername);

// Get user data from github
router.get("/:username", getUserData);

module.exports = router;