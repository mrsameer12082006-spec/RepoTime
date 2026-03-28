const { getMockGitContext } = require("./mockData");
 
const USE_MOCK = process.env.USE_MOCK === "true";
 
/**
 * Always reads from the current working directory (the repo the agent lives in).
 * This is the key change — the agent reads ITS OWN repo's history.
 */
async function getGitContext(skill) {
  if (USE_MOCK) {
    console.log(`   (using mock git data — set USE_MOCK=false in .env to analyze this repo)`);
    return getMockGitContext(skill);
  }
 
  try {
    const simpleGit = require("simple-git");
 
    // Always use cwd — the repo the agent is living inside
    const git = simpleGit(process.cwd());
 
    // Verify it's actually a git repo
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
      throw new Error("Not a git repository. Make sure the agent files are placed inside a git repo.");
    }
 
    console.log(`   (reading live git history from: ${process.cwd()})`);
    return await readRealGit(git, skill);
 
  } catch (err) {
    console.warn(`⚠️  Could not read git repo: ${err.message}`);
    console.warn(`   Falling back to mock data. Set USE_MOCK=true in .env to silence this.`);
    return getMockGitContext(skill);
  }
}
 
async function readRealGit(git, skill) {
  const sections = [];
 
  if (skill.needs.includes("log")) {
    const log = await git.raw([
      "log", "--format=%H | %ad | %an | %s", "--date=short", "-100"
    ]);
    sections.push(`## Commit Log (last 100)\n${log.trim()}`);
  }
 
  if (skill.needs.includes("shortlog")) {
    const shortlog = await git.raw(["shortlog", "-sn", "--all"]);
    sections.push(`## Contributor Activity\n${shortlog.trim()}`);
  }
 
  if (skill.needs.includes("churn")) {
    const churn = await git.raw(["log", "--format=format:", "--name-only"]);
    const lines = churn.split("\n").filter(Boolean);
    const counts = {};
    lines.forEach((f) => { counts[f] = (counts[f] || 0) + 1; });
    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([f, n]) => `${n}  ${f}`)
      .join("\n");
    sections.push(`## File Churn (most changed files)\n${sorted}`);
  }
 
  if (skill.needs.includes("fileChanges")) {
    const renames = await git.raw([
      "log", "--diff-filter=R", "--summary", "--oneline", "-50"
    ]);
    sections.push(`## File Renames & Moves\n${renames.trim()}`);
  }
 
  return sections.join("\n\n");
}
 
module.exports = { getGitContext };