const fetchGithubUser = async (username) => {
  // Fetch user and repos in parallel
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`),
    fetch(`https://api.github.com/users/${username}/repos`)
  ]);

  if (!userRes.ok) {
    throw new Error("GitHub user not found");
  }

  const user = await userRes.json();
  const repos = await reposRes.json();

  // Account age
  const accountAgeYears =
    new Date().getFullYear() -
    new Date(user.created_at).getFullYear();

  // Followers/Following ratio
  const followersFollowingRatio =
    user.following === 0
      ? user.followers
      : Number((user.followers / user.following).toFixed(2));

  // Repo analysis
  let totalStars = 0;
  let mostStarredRepo = "N/A";
  let maxStars = -1;

  const languageCount = {};

  repos.forEach((repo) => {
    totalStars += repo.stargazers_count;

    if (repo.stargazers_count > maxStars) {
      maxStars = repo.stargazers_count;
      mostStarredRepo = repo.name;
    }

    if (repo.language) {
      languageCount[repo.language] =
        (languageCount[repo.language] || 0) + 1;
    }
  });

  // Find top language
  let topLanguage = "N/A";
  let maxLanguageCount = 0;

  for (const language in languageCount) {
    if (languageCount[language] > maxLanguageCount) {
      maxLanguageCount = languageCount[language];
      topLanguage = language;
    }
  }

  return {
    username: user.login,
    name: user.name,
    bio: user.bio,
    public_repos: user.public_repos,
    followers: user.followers,
    following: user.following,
    profile_url: user.html_url,
    avatar_url: user.avatar_url,

    account_age_years: accountAgeYears,
    followers_following_ratio: followersFollowingRatio,

    top_language: topLanguage,
    most_starred_repo: mostStarredRepo,
    total_stars: totalStars,
  };
};

module.exports = fetchGithubUser