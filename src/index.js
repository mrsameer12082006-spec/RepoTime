require("dotenv").config();
const path = require("path");
const { askAgent } = require("./agent");
 
const args = process.argv.slice(2);
const repoName = path.basename(process.cwd());
 
if (args[0] === "ask" && args[1]) {
  const question = args[1];
  console.log(`\n🕰️  Repo Time Machine Agent`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📁 Repo: ${repoName} (${process.cwd()})`);
  console.log(`❓ Question: ${question}\n`);
 
  askAgent(question)
    .then((answer) => {
      console.log("📖 Answer:\n");
      console.log(answer);
      console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    })
    .catch((err) => {
      console.error("❌ Error:", err.message);
      process.exit(1);
    });
} else {
  console.log(`
🕰️  Repo Time Machine Agent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📁 Analyzing repo: ${repoName}
   ${process.cwd()}
 
Usage:
  npm run ask "<your question>"
 
Examples:
  npm run ask "How has this project evolved?"
  npm run ask "Which commit likely introduced the bug?"
  npm run ask "What architectural changes happened?"
  npm run ask "Which files should be refactored?"
 
Run demo with mock data:
  npm run demo
  `);
}
 