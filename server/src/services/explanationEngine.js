export function generateExplanation(matched, adjacent, missing) {
  const parts = [];

  if (matched.length === 0 && adjacent.length === 0) {
    return "No matching or related skills found. This may not be a good fit.";
  }

  if (missing.length === 0) {
    parts.push("Strong match — all required skills present.");
  } else if (matched.length >= missing.length) {
    parts.push("Good match — most key skills present.");
  } else {
    parts.push("Partial match — some key skills present.");
  }

  if (matched.length > 0) {
    parts.push(`Direct matches: ${matched.join(", ")}.`);
  }

  if (adjacent.length > 0) {
    parts.push(`Related skills found for: ${adjacent.join(", ")}.`);
  }

  if (missing.length > 0) {
    const trulyMissing = missing.filter((s) => !adjacent.includes(s));
    if (trulyMissing.length > 0) {
      parts.push(`Missing skills: ${trulyMissing.join(", ")}.`);
    }
  }

  return parts.join(" ");
}