const express = require('express');
const {pool, testConnection} = require('./config/connectionDB');
const githubRoutes = require('./routes/gitHubRoutes');


const app = express()

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

app.use("/api/github", githubRoutes);

async function startServer() {
  console.log("🔄 Initializing system sequences...");

  // 1. Verify Database is ready
  const isDbConnected = await testConnection();
  
  if (!isDbConnected) {
    console.error("🛑 Server startup aborted due to missing or failed DB connection setup.");
    // In production, exiting allows the container orchestrator (Railway) to retry cleanly
    process.exit(1); 
  }

  console.log('Connection successful.')

  // 2. Only start listening once DB is confirmed online
  app.listen(3000, () => {
    console.log(`🚀 Server safely running on port ${PORT}`);
  });
}
startServer();