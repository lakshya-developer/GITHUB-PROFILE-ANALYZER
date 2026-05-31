const express = require('express');
const pool = require('./config/connectionDB');
const githubRoutes = require('./routes/gitHubRoutes');


const app = express()

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API running properly!" });
});

app.use("/api/github", githubRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Express Server listening natively on port ${PORT}`);
});