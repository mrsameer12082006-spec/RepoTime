const { getGitContext } = require("./git/gitReader");
const { callClaude } = require("./claude/claudeClient");
const { detectSkill } = require("./skills/skillRouter");
const { loadSoul } = require("./soul");
 
/**
 * Main entry point for the agent.
 * Takes a plain-language question, gathers git context, and returns an analysis.
 */
async function askAgent(question) {
  // 1. Detect which skill to use based on the question
  const skill = detectSkill(question);
  console.log(`🔧 Using skill: ${skill.name}`);
 
  // 2. Gather git history context using the skill's data needs
  console.log(`📂 Reading git history...`);
  const gitContext = await getGitContext(skill);
 
  // 3. Load the agent's SOUL (persona) for the system prompt
  const soul = loadSoul();
 
  // 4. Build the prompt and call Claude
  console.log(`🤖 Analyzing with Claude...\n`);
  const prompt = buildPrompt(question, skill, gitContext);
  const answer = await callClaude(soul, prompt);
 
  return answer;
}
 
function buildPrompt(question, skill, gitContext) {
  return `
You are performing the "${skill.name}" analysis.
 
## Skill Purpose
${skill.description}
 
## User Question
${question}
 
## Git Repository Data
${gitContext}
 
## Instructions
${skill.instructions}
 
Now answer the user's question based strictly on the git data above.
Be specific. Cite commit SHAs and dates where relevant.
State your confidence level where appropriate.
  `.trim();
}
 
module.exports = { askAgent };
 