import fetch from "node-fetch";

const BASE = "https://api.github.com";

function headers() {
  const token = process.env.GITHUB_TOKEN;
  return token
    ? { Authorization: `token ${token}`, "User-Agent": "WeaveNet" }
    : { "User-Agent": "WeaveNet" };
}

export async function fetchGithubProfile(username) {
  // 1. Fetch user profile
  const userRes = await fetch(`${BASE}/users/${username}`, { headers: headers() });
  if (!userRes.ok) throw new Error(`GitHub user not found: ${username}`);
  const user = await userRes.json();

  // 2. Fetch repos
  const reposRes = await fetch(
    `${BASE}/users/${username}/repos?per_page=20&sort=updated`,
    { headers: headers() }
  );
  const repos = await reposRes.json();

  // 3. Collect all text signals
  const signals = [];

  if (user.bio) signals.push(user.bio);

  const topRepos = repos
    .filter((r) => !r.fork)
    .sort((a, b) => (b.stargazers_count - a.stargazers_count))
    .slice(0, 8);

  for (const repo of topRepos) {
    signals.push(repo.name.replace(/-/g, " "));
    if (repo.description) signals.push(repo.description);
    if (repo.language) signals.push(repo.language);

    // Fetch repo topics
    const topicsRes = await fetch(`${BASE}/repos/${username}/${repo.name}/topics`, {
      headers: { ...headers(), Accept: "application/vnd.github.mercy-preview+json" },
    });
    if (topicsRes.ok) {
      const { names } = await topicsRes.json();
      if (names?.length) signals.push(...names);
    }

    // Fetch README (top 5 repos only)
    if (topRepos.indexOf(repo) < 5) {
      try {
        const readmeRes = await fetch(
          `${BASE}/repos/${username}/${repo.name}/readme`,
          { headers: headers() }
        );
        if (readmeRes.ok) {
          const { content } = await readmeRes.json();
          const decoded = Buffer.from(content, "base64").toString("utf-8");
          // Only first 500 chars to keep it fast
          signals.push(decoded.slice(0, 500));
        }
      } catch (_) {}
    }
  }

  // 4. Language stats across all repos
  const langCount = {};
  for (const repo of repos) {
    if (repo.language) {
      langCount[repo.language] = (langCount[repo.language] || 0) + 1;
    }
  }
  const topLangs = Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([lang]) => lang);

  signals.push(...topLangs);

  return {
    username,
    name: user.name,
    bio: user.bio,
    public_repos: user.public_repos,
    top_languages: topLangs,
    text: signals.join(" "),
  };
}