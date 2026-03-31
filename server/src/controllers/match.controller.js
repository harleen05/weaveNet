// import { extractSkillNames } from "../services/skillExtractor.js";
import { findAdjacentSkills } from "../services/adjacencyEngine.js";
import { matchSkills } from "../services/skillMatcher.js";
import { calculateScore } from "../services/scoringEngine.js";
import { generateExplanation } from "../services/explanationEngine.js";
import { fetchGithubProfile } from "../services/githubFetcher.js";
import { getSemanticSimilarity } from "../services/embeddingService.js";
import { validateMatchInput } from "../utils/validateInput.js";
import { extractSkillsFromText, extractSkillNames } from "../services/skillExtractor.js";

export const healthCheck = (req, res) => {
  res.json({ status: "ok", project: "WeaveNet", version: "2.0.0" });
};

export const extractSkills = (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "text is required" });
  const skills = extractSkillsFromText(text);
  res.json({ skills });
};

export const matchRole = async (req, res) => {
  try {
    const error = validateMatchInput(req.body);
    if (error) return res.status(400).json({ error });

    const { candidate_text, role_skills, github_username } = req.body;

    // Combine resume text + GitHub data if provided
    let fullText = candidate_text;
    let githubData = null;

    if (github_username) {
      try {
        githubData = await fetchGithubProfile(github_username);
        fullText += " " + githubData.text;
      } catch (e) {
        console.warn("GitHub fetch failed:", e.message);
      }
    }

    const candidateSkills = extractSkillNames(fullText);
    const { matched, missing } = matchSkills(candidateSkills, role_skills);
    const adjacent = await findAdjacentSkills(candidateSkills, missing);
    const score = calculateScore(matched, adjacent, role_skills);
    const explanation = generateExplanation(matched, adjacent, missing);

    // Optional semantic similarity via embeddings
    const semantic_similarity = await getSemanticSimilarity(candidateSkills, role_skills);

    res.json({
      score,
      matched,
      adjacent,
      missing: missing.filter((s) => !adjacent.includes(s)),
      direct_match_percentage: Math.round((matched.length / role_skills.length) * 100),
      adjacent_match_percentage: Math.round((adjacent.length / role_skills.length) * 100),
      semantic_similarity,
      explanation,
      candidate_skills: candidateSkills,
      ...(githubData && {
        github: {
          name: githubData.name,
          top_languages: githubData.top_languages,
          public_repos: githubData.public_repos,
        },
      }),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error", detail: err.message });
  }
};