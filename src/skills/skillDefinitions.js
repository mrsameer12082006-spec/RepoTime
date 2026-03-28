/**
 * Skill definitions for the Repo Time Machine Agent.
 * Each skill defines its name, description, what git data it needs, and analysis instructions.
 */
 
const skills = {
  "history-explainer": {
    name: "history-explainer",
    description: "Explain how the repository evolved over time by grouping commits into logical phases and identifying major milestones.",
    needs: ["log", "shortlog"],
    instructions: `
- Group commits into 2-5 logical phases based on activity patterns and themes
- Name each phase descriptively (e.g., "Initial Prototype", "Feature Buildout", "Stabilization")
- Identify key milestone commits in each phase
- Write a short paragraph summarizing each phase
- End with an "Overall Trajectory" section of 2-3 sentences
- Format output with clear headers and bullet points
    `.trim(),
  },
 
  "bug-origin-finder": {
    name: "bug-origin-finder",
    description: "Identify which commit most likely introduced a bug by analyzing risky changes, file churn, and suspicious patterns.",
    needs: ["log", "recentDiff"],
    instructions: `
- Score commits for risk using signals: large diffs, fix-heavy messages, vague messages, no test changes
- Identify the top 1-3 most suspicious commits
- For each suspect: explain WHY it is suspicious with specific technical observations
- State confidence level: High / Medium / Low
- Suggest a next step (e.g., what to examine or revert)
- Format: lead with "Most Likely Culprit", then "Other Candidates" table
    `.trim(),
  },
 
  "architecture-evolution": {
    name: "architecture-evolution",
    description: "Understand how the project structure and design patterns changed over time.",
    needs: ["log", "fileChanges"],
    instructions: `
- Identify major structural changes: new directories, mass file moves, renamed modules
- Detect design pattern shifts (e.g., flat → layered, monolith → modular)
- Note significant dependency or config file additions
- Produce an architecture timeline with phases
- End with an "Architectural Assessment" noting current style and any concerns
    `.trim(),
  },
 
  "refactor-suggester": {
    name: "refactor-suggester",
    description: "Suggest refactoring opportunities based on file churn patterns, co-change clusters, and instability signals.",
    needs: ["log", "churn"],
    instructions: `
- Identify the top high-churn files and explain why churn is a concern
- Classify each hotspot: 🔴 High / 🟡 Medium priority
- For each hotspot: give a SPECIFIC refactoring suggestion (not just "clean it up")
- Note any files that co-change frequently (hidden coupling)
- End with a "General Observations" paragraph about overall repo health
    `.trim(),
  },
};
 
module.exports = skills;