const pool = require("../config/connectionDB");
const fetchGithubUser = require("../services/githubService")

const getUserData = async (req, res) => {
  try {
    const { username } = req.params;

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        // GitHub recommends providing an Accept header
        Accept: "application/vnd.github.v3+json",
        // Optional: GitHub requires a User-Agent for all requests
        "User-Agent": "NodeJS-App",
      },
    });

    if (!response.ok) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const userData = await response.json();

    return res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const analyzeProfile = async (req, res) => {
  try {
    const { username } = req.params;

    // 1. Check if already exists in DB
    const [existingProfile] = await pool.query(
      "SELECT * FROM github_profiles WHERE username = ?",
      [username]
    );

    // 2. If exists, return stored data
    if (existingProfile.length > 0) {
      return res.status(200).json({
        success: true,
        source: "database",
        data: existingProfile[0],
      });
    }

    // 3. Fetch and analyze from GitHub
    const analyzedData = await fetchGithubUser(username);

    // 4. Store in MySQL
    await pool.query(
      `
      INSERT INTO github_profiles (
        username,
        name,
        bio,
        public_repos,
        followers,
        following,
        profile_url,
        avatar_url,
        account_age_years,
        followers_following_ratio,
        top_language,
        most_starred_repo,
        total_stars
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        analyzedData.username,
        analyzedData.name,
        analyzedData.bio,
        analyzedData.public_repos,
        analyzedData.followers,
        analyzedData.following,
        analyzedData.profile_url,
        analyzedData.avatar_url,
        analyzedData.account_age_years,
        analyzedData.followers_following_ratio,
        analyzedData.top_language,
        analyzedData.most_starred_repo,
        analyzedData.total_stars,
      ]
    );

    // 5. Return analyzed data
    return res.status(201).json({
      success: true,
      source: "github",
      data: analyzedData,
    });
  } catch (error) {
    console.error(error);

    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: "GitHub user not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const { count } = req.params || 10;

    const [rows] = await pool.query("SELECT * FROM github_profiles LIMIT ?", [
      parseInt(count),
    ]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getProfileByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM github_profiles WHERE username=?",
      [username],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error("Error fetching profile:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getUserData,
  getProfileByUsername,
  analyzeProfile,
  getAllProfiles,
};
