---
name: history-explainer
description: "Analyze git commit history and explain how the repository evolved over time, grouping commits into logical phases with milestones."
allowed-tools: Bash
---

# History Explainer

## Purpose
Transform raw git commit history into a structured, narrative explanation of how the repository evolved — like reading a project's autobiography.

## When to Use
- "How has this project evolved?"
- "Give me a timeline of this repo"
- "Walk me through how this codebase grew"
- "What changed over time?"

## Instructions

### Step 1 — Collect commit history
Run:
```bash
git log --format="%H | %ad | %an | %s" --date=short
```
Note total commits, date range, and unique authors.

### Step 2 — Group into phases
Identify 2–5 logical phases based on:
- Gaps in commit frequency
- Shifts in commit message themes (feat → fix → refactor)
- Changes in active contributors

Label each phase descriptively:
- `Phase 1: Initial Prototype`
- `Phase 2: Feature Buildout`
- `Phase 3: Stabilization`
- `Phase 4: Architecture Overhaul`

### Step 3 — Identify milestones
Within each phase, find significant commits:
- First commit (project birth)
- New directories appearing (src/, tests/, docker/)
- Large single-commit diffs
- Version or launch commits

### Step 4 — Output format
```
## Project Evolution Timeline

**Total lifespan:** X months  
**Total commits:** N  
**Contributors:** N unique authors

### Phase 1: [Name] ([Date range])
[Summary paragraph]

Key commits:
- `SHA` — date — message ← why this matters

## Overall Trajectory
[2–3 sentence synthesis of the full arc]
```