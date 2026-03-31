export function matchSkills(candidateSkills, roleSkills) {
  const candidateSet = new Set(candidateSkills.map((s) => s.toLowerCase()));

  const matched = roleSkills.filter((s) => candidateSet.has(s.toLowerCase()));
  const missing = roleSkills.filter((s) => !candidateSet.has(s.toLowerCase()));

  return { matched, missing };
}