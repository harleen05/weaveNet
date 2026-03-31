export function createCandidate({ name = "", text = "", skills = [], githubUsername = "" }) {
  return { name, text, skills, githubUsername };
}