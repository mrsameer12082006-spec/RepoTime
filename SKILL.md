---
name: history-explainer
version: 1.0.0
description: >
  Explain how a repository evolved over time by reading git commit history,
  grouping commits into logical phases, identifying major milestones, and
  producing a human-readable project evolution timeline.
triggers:
  - "how has this project evolved"
  - "explain the history of this repo"
  - "what changed over time"
  - "give me a timeline of this project"
  - "walk me through how this codebase grew"
tools:
  - git log
  - git shortlog
  - git diff
---

# Skill: History Explainer

## Purpose

Transform raw git commit history into a structured, narrative explanation of how the repository evolved. The agent behaves as a senior architect reading a project's autobiography.

---

## When to Use This Skill

Invoke when the user asks about:
- Overall project evolution
- Timeline of major changes
- How features were added over time
- When the project started, grew, or pivoted
- Contributor activity over time

---

## Step-by-Step Instructions

### Step 1 — Collect the Full Commit History

Run:
```bash
git log --oneline --format="%H | %ad | %an | %s" --date=short
```

Collect all commits. Note:
- Total number of commits
- Date range (first commit → latest commit)
- Number of unique authors

---

### Step 2 — Identify Activity Phases

Group commits into **chronological phases** based on:
- Gaps in commit frequency (quiet periods often mark phase boundaries)
- Changes in commit message themes (e.g., lots of "feat:" → then lots of "fix:" → then lots of "refactor:")
- Changes in active contributors

Label phases descriptively. Examples:
- `Phase 1: Initial Prototype (Jan–Mar 2023)`
- `Phase 2: Feature Buildout (Apr–Aug 2023)`
- `Phase 3: Stabilization & Bugfixes (Sep–Nov 2023)`
- `Phase 4: Architecture Overhaul (Dec 2023–present)`

---

### Step 3 — Identify Major Milestones

Within each phase, find commits that represent significant events:
- First commit (project birth)
- Addition of key directories or files (e.g., `src/`, `tests/`, `docker/`)
- Large single-commit diffs (may indicate big feature drops or imports)
- Commits with milestone-sounding messages ("v1.0", "launch", "migration complete")

---

### Step 4 — Summarize Each Phase

For each phase, write a short paragraph covering:
- What the team was focused on
- What major capabilities were added
- What the codebase looked like structurally
- Any notable patterns (lots of fixes, rapid feature growth, refactoring energy)

---

### Step 5 — Produce the Timeline Output

Format:

```
## Project Evolution Timeline

**Total lifespan:** X months
**Total commits:** N
**Contributors:** N unique authors

---

### Phase 1: [Name] ([Date range])
[Summary paragraph]

Key commits:
- [SHA short] — [date] — [message] ← [why this matters]
- [SHA short] — [date] — [message] ← [why this matters]

---

### Phase 2: [Name] ([Date range])
...

---

## Overall Trajectory
[2–3 sentence synthesis: Where did the project start, where is it now, what is the dominant direction?]
```

---

## Quality Checks

Before outputting, verify:
- [ ] Every phase is grounded in actual commits (with SHAs)
- [ ] No phase is labeled without reasoning
- [ ] The "Overall Trajectory" section synthesizes the full arc, not just the latest phase
- [ ] Confidence is noted if commit messages are sparse or ambiguous
