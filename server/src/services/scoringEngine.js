const SKILL_WEIGHTS = {
  // High-demand skills
  "React": 1.5, "Node.js": 1.5, "TypeScript": 1.4, "Python": 1.5,
  "AWS": 1.6, "Docker": 1.4, "Kubernetes": 1.6, "GraphQL": 1.3,
  "Machine Learning": 1.6, "TensorFlow": 1.5, "PyTorch": 1.5,
  "PostgreSQL": 1.3, "MongoDB": 1.3, "Redis": 1.3,
  "Git": 1.2, "CI/CD": 1.4, "Linux": 1.2,
  "Next.js": 1.4, "Vue": 1.3, "Angular": 1.3,
  "FastAPI": 1.3, "Django": 1.3, "Flask": 1.2,
  "Terraform": 1.4, "Ansible": 1.3,
  "NLP": 1.5, "Computer Vision": 1.5,
};

export function calculateScore(matched, adjacent, roleSkills) {
  const total = roleSkills.length;
  if (total === 0) return 0;

  // Calculate weighted points
  let directPoints = 0;
  matched.forEach(skill => {
    const weight = SKILL_WEIGHTS[skill] || 1.0;
    directPoints += weight;
  });

  let adjacentPoints = 0;
  adjacent.forEach(skill => {
    const weight = SKILL_WEIGHTS[skill] || 1.0;
    adjacentPoints += weight * 0.6; // Adjacent skills worth 60% of direct match
  });

  // Calculate base score
  const totalWeight = roleSkills.reduce((sum, skill) => sum + (SKILL_WEIGHTS[skill] || 1.0), 0);
  const earnedWeight = directPoints + adjacentPoints;
  
  // Scale to 100
  const rawScore = (earnedWeight / totalWeight) * 100;
  
  // Apply diminishing returns for very high scores (makes 90+ meaningful)
  let finalScore = Math.min(98, Math.round(rawScore));
  
  // Ensure minimum score for effort
  if (matched.length > 0 && finalScore < 20) {
    finalScore = 20; // Minimum for having at least one match
  }

  return finalScore;
}

export function generateDetailedBreakdown(matched, adjacent, missing, roleSkills) {
  const breakdown = {
    directMatches: matched.map(skill => ({
      skill,
      weight: SKILL_WEIGHTS[skill] || 1.0,
      points: (SKILL_WEIGHTS[skill] || 1.0) * 1.0
    })),
    adjacentMatches: adjacent.map(skill => ({
      skill,
      weight: SKILL_WEIGHTS[skill] || 1.0,
      points: (SKILL_WEIGHTS[skill] || 1.0) * 0.6
    })),
    gaps: missing.filter(s => !adjacent.includes(s)).map(skill => ({
      skill,
      weight: SKILL_WEIGHTS[skill] || 1.0,
      priority: (SKILL_WEIGHTS[skill] || 1.0) > 1.4 ? "critical" : "standard"
    }))
  };

  return breakdown;
}