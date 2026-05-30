const express = require('express');
const pool = require('./config/connectionDB');
const githubRoutes = require('./routes/gitHubRoutes');


const app = express()

app.use(express.json());

app.use("/api/github", githubRoutes);


app.listen(3000, () => {
  console.log('Server running on port 3000');
});