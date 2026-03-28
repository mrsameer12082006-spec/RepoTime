/**
 * Demo script — runs all 4 skills against mock data and prints results.
 * Run with: npm run demo
 */
require("dotenv").config();
const { askAgent } = require("./agent");
 
const DEMO_QUESTIONS = [
  "How has this project evolved over time?",
  "Which commit likely introduced the authentication bug?",
  "What architectural changes happened in this repo?",
  "Which files should be refactored based on git history?",
];
 
async function runDemo() {
  console.log(`\n🕰️  Repo Time Machine Agent — DEMO`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  console.log(`Running all 4 skills against mock "TaskFlow" repository data...\n`);
 
  for (const question of DEMO_QUESTIONS) {
    console.log(`\n${"═".repeat(60)}`);
    console.log(`❓ ${question}`);
    console.log(`${"═".repeat(60)}\n`);
 
    try {
      const answer = await askAgent(question);
      console.log(answer);
    } catch (err) {
      console.error(`❌ Error: ${err.message}`);
    }
 
    // Small pause between calls
    await new Promise((r) => setTimeout(r, 5000));
  }
 
  console.log(`\n${"━".repeat(60)}`);
  console.log(`✅ Demo complete!`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
}
 
runDemo();
 