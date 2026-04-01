const SKILL_DOMAINS = {
  frontend: ["React", "Vue", "Angular", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  backend: ["Node.js", "Python", "Java", "Go", "PostgreSQL", "MongoDB", "Redis", "GraphQL"],
  devops: ["Docker", "Kubernetes", "AWS", "GCP", "Terraform", "CI/CD", "Linux"],
  ml: ["Machine Learning", "TensorFlow", "PyTorch", "Python", "NLP", "Computer Vision"]
};

const MARKET_DEMAND = {
  "React": "Very High", "Node.js": "Very High", "TypeScript": "High", "Python": "Very High",
  "AWS": "Very High", "Docker": "High", "Kubernetes": "High", "GraphQL": "Medium",
  "Machine Learning": "Very High", "PostgreSQL": "High", "MongoDB": "Medium"
};

const LEARNING_DIFFICULTY = {
  "React": "Medium", "Node.js": "Medium", "TypeScript": "Medium", "Python": "Easy",
  "AWS": "Hard", "Docker": "Medium", "Kubernetes": "Hard", "GraphQL": "Medium",
  "Machine Learning": "Hard", "PostgreSQL": "Medium", "MongoDB": "Easy"
};

export function generateDetailedAnalysis(matched, adjacent, missing, candidateSkills = [], roleSkills = [], githubData = null) {
  const matchRate = roleSkills.length > 0 ? Math.round((matched.length / roleSkills.length) * 100) : 0;
  const adjacentRate = roleSkills.length > 0 ? Math.round((adjacent.length / roleSkills.length) * 100) : 0;
  const totalCoverage = matchRate + adjacentRate;
  
  const analysis = {
    executiveSummary: generateExecutiveSummary(matchRate, totalCoverage, matched.length, missing.length),
    skillBreakdown: generateSkillBreakdown(matched, adjacent, missing),
    marketPosition: generateMarketAnalysis(matched, missing),
    learningPath: generateLearningPath(missing, adjacent),
    githubInsights: githubData ? analyzeGithubProfile(githubData, matched) : null,
    competitiveEdge: identifyCompetitiveAdvantages(matched, adjacent),
    riskFactors: identifyRiskFactors(missing, matchRate),
    actionPlan: generateActionPlan(matchRate, missing, adjacent)
  };

  return analysis;
}

function generateExecutiveSummary(matchRate, totalCoverage, matchedCount, missingCount) {
  let summary = "";
  
  if (matchRate >= 80) {
    summary = `Exceptional profile alignment at ${matchRate}%. You are a strong candidate with ${matchedCount} verified skills. `;
    summary += `Your expertise positions you as a top-tier applicant for this role.`;
  } else if (matchRate >= 60) {
    summary = `Strong foundation with ${matchRate}% skill coverage. You possess ${matchedCount} core competencies `;
    summary += `with ${missingCount} areas for strategic development. Ready for mid-to-senior positions.`;
  } else if (matchRate >= 40) {
    summary = `Moderate alignment at ${matchRate}%. While you have ${matchedCount} matching skills, `;
    summary += `closing the ${missingCount} gaps will significantly improve your competitiveness.`;
  } else {
    summary = `Entry-level alignment at ${matchRate}%. This role requires substantial upskilling. `;
    summary += `Consider junior positions or intensive 6-month skill development program.`;
  }
  
  return summary;
}

function generateSkillBreakdown(matched, adjacent, missing) {
  const breakdown = {
    coreStrengths: matched.slice(0, 5).map(skill => ({
      skill,
      marketDemand: MARKET_DEMAND[skill] || "Standard",
      leverage: "Primary differentiator in applications"
    })),
    
    transferableSkills: adjacent.slice(0, 5).map(skill => ({
      skill,
      learningCurve: LEARNING_DIFFICULTY[skill] || "Medium",
      bridgeTo: findRelatedGap(skill, missing)
    })),
    
    criticalGaps: missing.filter(s => !adjacent.includes(s)).slice(0, 5).map(skill => ({
      skill,
      urgency: MARKET_DEMAND[skill] === "Very High" ? "Critical" : "Important",
      timeToAcquire: estimateLearningTime(skill),
      impact: `+${Math.round(100 / missing.length)}% match improvement`
    }))
  };
  
  return breakdown;
}

function generateMarketAnalysis(matched, missing) {
  const inDemandMatched = matched.filter(s => MARKET_DEMAND[s] === "Very High");
  const inDemandMissing = missing.filter(s => MARKET_DEMAND[s] === "Very High");
  
  return {
    marketReadiness: inDemandMatched.length >= 3 ? "High" : inDemandMatched.length >= 1 ? "Medium" : "Developing",
    trendingSkills: inDemandMatched,
    missingTrends: inDemandMissing,
    salaryImpact: calculateSalaryImpact(inDemandMatched.length, inDemandMissing.length)
  };
}

function generateLearningPath(missing, adjacent) {
  const phases = [];
  
  // Phase 1: Quick wins (adjacent skills)
  if (adjacent.length > 0) {
    phases.push({
      phase: 1,
      duration: "2-4 weeks",
      focus: "Skill Activation",
      skills: adjacent.slice(0, 3),
      outcome: "Leverage transferable expertise"
    });
  }
  
  // Phase 2: Critical gaps
  const criticalGaps = missing.filter(s => !adjacent.includes(s)).slice(0, 3);
  if (criticalGaps.length > 0) {
    phases.push({
      phase: 2,
      duration: "1-3 months",
      focus: "Core Competency Building",
      skills: criticalGaps,
      outcome: "Achieve 60%+ match rate"
    });
  }
  
  // Phase 3: Advanced skills
  const advancedSkills = missing.slice(3, 6);
  if (advancedSkills.length > 0) {
    phases.push({
      phase: 3,
      duration: "3-6 months",
      focus: "Advanced Specialization",
      skills: advancedSkills,
      outcome: "Reach 80%+ match rate"
    });
  }
  
  return phases;
}

function analyzeGithubProfile(githubData, matched) {
  const insights = {
    activityLevel: githubData.public_repos > 20 ? "Very Active" : githubData.public_repos > 10 ? "Active" : "Moderate",
    techDiversity: githubData.top_languages?.length || 0,
    portfolioStrength: calculatePortfolioStrength(githubData),
    codeEvidence: matched.filter(s => githubData.top_languages?.some(lang => 
      s.toLowerCase().includes(lang.toLowerCase())
    ))
  };
  
  return insights;
}

function identifyCompetitiveAdvantages(matched, adjacent) {
  const advantages = [];
  
  if (matched.length >= 5) {
    advantages.push(`Strong skill depth with ${matched.length} verified competencies`);
  }
  
  const highDemandSkills = matched.filter(s => MARKET_DEMAND[s] === "Very High");
  if (highDemandSkills.length >= 2) {
    advantages.push(`In-demand expertise: ${highDemandSkills.join(", ")}`);
  }
  
  if (adjacent.length >= 3) {
    advantages.push(`High learning velocity with ${adjacent.length} transferable skills`);
  }
  
  return advantages;
}

function identifyRiskFactors(missing, matchRate) {
  const risks = [];
  
  if (matchRate < 40) {
    risks.push("Significant skill gap may require extended preparation time");
  }
  
  const criticalMissing = missing.filter(s => MARKET_DEMAND[s] === "Very High");
  if (criticalMissing.length >= 3) {
    risks.push(`Missing ${criticalMissing.length} high-demand skills affects competitiveness`);
  }
  
  if (missing.length > 8) {
    risks.push("Large number of gaps may indicate role misalignment");
  }
  
  return risks;
}

function generateActionPlan(matchRate, missing, adjacent) {
  const actions = [];
  
  if (matchRate < 60) {
    actions.push({
      priority: "High",
      action: "Focus on adjacent skills first",
      timeline: "2-4 weeks",
      resources: "Online courses, practice projects"
    });
  }
  
  const quickWins = missing.filter(s => LEARNING_DIFFICULTY[s] === "Easy").slice(0, 2);
  if (quickWins.length > 0) {
    actions.push({
      priority: "Medium",
      action: `Acquire quick-win skills: ${quickWins.join(", ")}`,
      timeline: "1-2 months",
      resources: "Documentation, tutorials"
    });
  }
  
  actions.push({
    priority: "Ongoing",
    action: "Build portfolio projects demonstrating skills",
    timeline: "Continuous",
    resources: "GitHub, personal projects"
  });
  
  return actions;
}

// Helper functions
function findRelatedGap(skill, missing) {
  return missing.find(m => 
    skill.toLowerCase().includes(m.toLowerCase()) || 
    m.toLowerCase().includes(skill.toLowerCase())
  ) || missing[0];
}

function estimateLearningTime(skill) {
  const difficulty = LEARNING_DIFFICULTY[skill];
  return difficulty === "Easy" ? "2-4 weeks" : difficulty === "Hard" ? "2-4 months" : "1-2 months";
}

function calculateSalaryImpact(matchedHighDemand, missingHighDemand) {
  const base = matchedHighDemand * 5000;
  const penalty = missingHighDemand * 3000;
  return base - penalty;
}

function calculatePortfolioStrength(githubData) {
  let score = 0;
  score += Math.min(githubData.public_repos * 2, 20);
  score += (githubData.top_languages?.length || 0) * 5;
  return Math.min(score, 100);
}

// Legacy export for backward compatibility
export function generateExplanation(matched, adjacent, missing, candidateSkills = [], roleSkills = []) {
  const analysis = generateDetailedAnalysis(matched, adjacent, missing, candidateSkills, roleSkills);
  
  return `${analysis.executiveSummary}

📊 SKILL BREAKDOWN:
${analysis.skillBreakdown.coreStrengths.map(s => `✓ ${s.skill} (${s.marketDemand} demand)`).join("\n")}

🎯 LEARNING PATH:
${analysis.learningPath.map(p => `Phase ${p.phase}: ${p.focus} (${p.duration})`).join("\n")}

💡 COMPETITIVE ADVANTAGES:
${analysis.competitiveEdge.map(a => `• ${a}`).join("\n")}

⚠️  RISK FACTORS:
${analysis.riskFactors.map(r => `• ${r}`).join("\n") || "None significant"}

🚀 ACTION PLAN:
${analysis.actionPlan.map(a => `[${a.priority}] ${a.action} - ${a.timeline}`).join("\n")}

${analysis.marketPosition.salaryImpact > 0 
  ? `💰 Potential salary premium: +$${analysis.marketPosition.salaryImpact.toLocaleString()}` 
  : "💰 Address gaps to unlock salary growth"}`;
}
