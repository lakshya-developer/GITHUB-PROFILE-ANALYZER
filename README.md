# GitHub Profile Analyzer API

A Node.js and Express.js backend service that analyzes GitHub user profiles using the GitHub Public API and stores useful insights in a MySQL database.

## Features

* Fetch GitHub profile data using username
* Analyze profile insights
* Store analyzed data in MySQL
* Retrieve all analyzed profiles
* Retrieve a single analyzed profile
* Avoid duplicate GitHub API calls by checking existing records first

## Tech Stack

* Node.js
* Express.js
* MySQL
* GitHub REST API
* JavaScript

---

## Project Structure

```text
github-profile-analyzer/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── githubController.js
│
├── services/
│   └── githubService.js
│
├── routes/
│   └── githubRoutes.js
│
├── .env.example
├── .gitignore
├── app.js
├── schema.sql
├── package.json
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd github-profile-analyzer
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=github_analyzer
```

---

## Database Setup

### Create Database

```sql
CREATE DATABASE github_analyzer;
```

### Use Database

```sql
USE github_analyzer;
```

### Create Table

Run the SQL from `schema.sql`.

```sql
CREATE TABLE github_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    bio TEXT,
    public_repos INT,
    followers INT,
    following INT,
    profile_url VARCHAR(500),
    avatar_url VARCHAR(500),
    account_age_years INT,
    followers_following_ratio DECIMAL(10,2),
    top_language VARCHAR(100),
    most_starred_repo VARCHAR(255),
    total_stars INT,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Running the Project

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Server runs on:

```text
http://localhost:5000
```

---

## API Endpoints

### Analyze GitHub Profile

Fetches profile data from GitHub, analyzes it, stores it in MySQL, and returns the result.

```http
GET /api/github/analyze/:username
```

Example:

```http
GET /api/github/analyze/octocat
```

---

### Get All Analyzed Profiles

```http
GET /api/github/profiles
```

---

### Get Single Profile

```http
GET /api/github/profiles/:username
```

Example:

```http
GET /api/github/profiles/octocat
```

---

## Stored Insights

The application stores:

* Username
* Name
* Bio
* Public Repository Count
* Followers Count
* Following Count
* Profile URL
* Avatar URL
* Account Age (Years)
* Followers/Following Ratio
* Top Programming Language
* Most Starred Repository
* Total Stars Across Repositories

---

## Sample Response

```json
{
  "success": true,
  "source": "github",
  "data": {
    "username": "octocat",
    "name": "The Octocat",
    "public_repos": 8,
    "followers": 19000,
    "following": 9,
    "top_language": "JavaScript",
    "most_starred_repo": "Hello-World",
    "total_stars": 500
  }
}
```

---

## Deployment

Live API URL:

```text
https://your-deployed-url.com
```

---

## Author

Lakshya Verma
