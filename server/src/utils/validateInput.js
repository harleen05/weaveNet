export function validateMatchInput({ candidate_text, role_skills }) {
  if (!candidate_text || typeof candidate_text !== "string") {
    return "candidate_text is required and must be a string";
  }
  if (!role_skills || !Array.isArray(role_skills) || role_skills.length === 0) {
    return "role_skills is required and must be a non-empty array";
  }
  return null;
}