export function calculateScore(matched, adjacent, roleSkills) {
  const total = roleSkills.length;
  if (total === 0) return 0;

  const directPoints = matched.length * 1.0;
  const adjacentPoints = adjacent.length * 0.5;

  const raw = ((directPoints + adjacentPoints) / total) * 100;
  return Math.min(100, Math.round(raw));
}