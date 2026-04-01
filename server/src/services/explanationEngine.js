export function generateExplanation(matched, adjacent, missing, candidateSkills = [], roleSkills = []) {
  const parts = [];
  const insights = [];

  // Calculate match percentage
  const matchRate = roleSkills.length > 0 ? Math.round((matched.length / roleSkills.length) * 100) : 0;
  const adjacentRate = roleSkills.length > 0 ? Math.round((adjacent.length / roleSkills.length) * 100) : 0;
  const totalCoverage = matchRate + adjacentRate;

  // Profile Strength Assessment
  if (matchRate >= 80) {
    parts.push(`Excellent profile alignment! You match ${matchRate}% of the required skills, demonstrating strong expertise for this role.`);
  } else if (matchRate >= 60) {
    parts.push(`Strong profile match at ${matchRate}%. You possess most core competencies with solid foundation for this position.`);
  } else if (matchRate >= 40) {
    parts.push(`Moderate alignment at ${matchRate}%. You have foundational skills with room for strategic skill development.`);
  } else {
    parts.push(`Current alignment is ${matchRate}%. This role represents a significant growth opportunity requiring focused upskilling.`);
  }

  // Skill Portfolio Analysis
  if (matched.length > 0) {
    const topSkills = matched.slice(0, 3).join(", ");
    insights.push(`Your verified strengths in ${topSkills} directly align with critical role requirements.`);
  }

  if (adjacent.length > 0) {
    insights.push(`Transferable expertise detected in ${adjacent.slice(0, 3).join(", ")} — these skills accelerate your learning curve for missing competencies.`);
  }

  // Gap Analysis
  if (missing.length > 0) {
    const criticalGaps = missing.filter(s => !adjacent.includes(s));
    if (criticalGaps.length > 0) {
      insights.push(`Priority development areas: ${criticalGaps.slice(0, 3).join(", ")}. Focus here will significantly boost your match score.`);
    }
  }

  // Learning Path Recommendation
  if (adjacent.length > 0 && missing.length > 0) {
    insights.push(`Leverage your adjacent skills to bridge gaps efficiently — estimated 2-3 months to reach full competency.`);
  } else if (missing.length > 5) {
    insights.push(`Comprehensive upskilling recommended. Consider structured learning programs or mentorship to accelerate growth.`);
  }

  // Combine insights
  if (insights.length > 0) {
    parts.push("\n\nKey Insights:");
    insights.forEach((insight, i) => {
      parts.push(`${i + 1}. ${insight}`);
    });
  }

  // Career Context
  if (totalCoverage >= 70) {
    parts.push(`\nRecommendation: You're well-positioned for this role. Highlight your ${matched.slice(0, 2).join(" and ")} expertise in applications.`);
  } else if (totalCoverage >= 50) {
    parts.push(`\nRecommendation: With dedicated skill building in ${missing.slice(0, 2).join(" and ")}, you could reach competitive candidacy within 3-6 months.`);
  } else {
    parts.push(`\nRecommendation: Consider roles with slightly different skill requirements, or commit to an intensive upskilling program.`);
  }

  return parts.join("\n");
}