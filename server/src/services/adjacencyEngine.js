import { getRelatedSkills } from "./skillGraph.js";

export async function findAdjacentSkills(candidateSkills, missingSkills) {
  const candidateSet = new Set(candidateSkills.map((s) => s.toLowerCase()));
  const adjacent = [];

  for (const missing of missingSkills) {
    const related = await getRelatedSkills(missing);
    for (const rel of related) {
      if (candidateSet.has(rel.toLowerCase())) {
        adjacent.push(missing);
        break;
      }
    }
  }

  return adjacent;
}