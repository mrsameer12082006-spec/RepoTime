const skills = require("./skillDefinitions");
 
/**
 * Detects which skill to use based on keywords in the user's question.
 * Falls back to history-explainer if no match found.
 */
function detectSkill(question) {
  const q = question.toLowerCase();
 
  if (matchesAny(q, ["bug", "broke", "broken", "introduced", "regression", "error", "crash", "fault", "issue"])) {
    return skills["bug-origin-finder"];
  }
 
  if (matchesAny(q, ["architecture", "structure", "pattern", "design", "folder", "refactor", "restructur", "organiz"])) {
    // Distinguish between architecture analysis vs refactor suggestions
    if (matchesAny(q, ["suggest", "improve", "should", "unstable", "hotspot", "churn", "debt"])) {
      return skills["refactor-suggester"];
    }
    return skills["architecture-evolution"];
  }
 
  if (matchesAny(q, ["refactor", "improve", "unstable", "hotspot", "churn", "technical debt", "messy", "clean"])) {
    return skills["refactor-suggester"];
  }
 
  // Default: history explainer
  return skills["history-explainer"];
}
 
function matchesAny(text, keywords) {
  return keywords.some((kw) => text.includes(kw));
}
 
module.exports = { detectSkill };
 