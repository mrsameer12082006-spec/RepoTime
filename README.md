# Repo Time Machine Agent

"I don't just read your commit history. I understand it."

A gitagent that lives inside any Git repository and analyzes how the project evolved over time. Acts as a senior software architect who can explain architectural decisions, trace bug origins, map structural evolution, and suggest targeted refactors — all grounded in actual git history.

How to Drop Into Any Repo
bash# 1. Copy the agent files into your target repo
cp -r repo-time-machine-agent/ your-project/

# 2. Go into your project
cd your-project

# 3. Install dependencies
npm install

# 4. Add your API key
cp .env.example .env
# Open .env and paste your GROQ_API_KEY

# 5. Ask it anything about your own repo
npm run ask "How has this project evolved?"
npm run ask "Which commit introduced the bug?"
npm run ask "What should be refactored?"
The agent automatically reads the git history of whichever repo it lives in — no configuration needed.

What It Does
Ask it...Skill Used"How has this project evolved?"history-explainer"Which commit introduced this bug?"bug-origin-finder"What architectural changes happened?"architecture-evolution"Which files should be refactored?"refactor-suggester

Project Structure
your-repo/                        ← any git repo
├── agent.yaml                    ← agent metadata
├── SOUL.md                       ← agent personality
├── RULES.md                      ← agent constraints
├── .env.example                  ← copy to .env and add key
├── package.json
└── src/
    ├── index.js                  ← CLI entry point
    ├── agent.js                  ← core orchestrator
    ├── soul.js                   ← system prompt
    ├── demo.js                   ← demo with mock data
    ├── skills/
    │   ├── skillRouter.js        ← keyword-based routing
    │   └── skillDefinitions.js   ← 4 skill definitions
    ├── git/
    │   ├── gitReader.js          ← reads THIS repo's git history
    │   └── mockData.js           ← mock data for testing
    └── claude/
        └── claudeClient.js       ← Groq API client

Configuration
VariableDefaultDescriptionGROQ_API_KEYrequiredGet free at console.groq.comUSE_MOCKfalseSet to true to use fake TaskFlow data instead of real repo

Run the Demo (no real repo needed)
bash# Uses built-in mock "TaskFlow" project data
USE_MOCK=true npm run demo

Get a Free Groq API Key

Go to console.groq.com
Sign in with Google or GitHub
Click API Keys → Create API Key
Paste it into your .env file

Groq's free tier gives you 14,400 requests/day — no credit card needed.

Built With

Groq (LLaMA 3.3 70B) — free AI inference
simple-git — git history reading
Node.js — runtime (v16+)
gitagent standard — agent structure
gitclaw runtime — agent execution