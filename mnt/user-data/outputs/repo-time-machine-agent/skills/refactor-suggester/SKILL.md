---
name: refactor-suggester
version: 1.0.0
description: >
  Suggest targeted refactoring opportunities based on git churn patterns,
  file instability metrics, repeated change clusters, and hotspot analysis.
  Each suggestion is grounded in git evidence, not static code analysis.
triggers:
  - "what should be refactored"
  - "which parts of the code are unstable"
  - "where is the technical debt"
  - "what are the hotspots in this repo"
  - "which files change the most"
tools:
  - git log
  - git shortlog
  - git diff
---

# Skill: Refactor Suggester

## Purpose

Use git churn data as a proxy for code quality. Files that change constantly are telling you something: they are either doing too much, are poorly understood, or are stuck in a perpetual fix cycle. Surface these areas and propose specific, evidence-backed refactoring actions.

---

## When to Use This Skill

Invoke when the user asks:
- "What should we refactor?"
- "Which modules are most problematic?"
- "Where is the technical debt in this repo?"
- "What files change the most?"
- "Which parts of the codebase feel unstable?"

---

## Core Concept: Churn as Signal

**Churn** = how frequently a file has been modified over a time period.

High churn does not always mean bad code — but combined with other signals, it reliably surfaces problematic areas.

A file that:
- Changes in almost every PR → likely has too many responsibilities
- Changes alongside many other unrelated files → is a hidden dependency hub
- Has been the target of many "fix" commits → has fragile logic
- Was involved in multiple reverts → is actively resisted by the codebase

---

## Step-by-Step Instructions

### Step 1 — Compute File Churn

```bash
git log --format=format: --name-only | grep -v '^$' | sort | uniq -c | sort -rn | head -30
```

This produces: `[count] [filepath]` sorted from most-changed to least.

Collect the top 20 highest-churn files.

---

### Step 2 — Enrich with Commit Context

For each high-churn file, gather:

```bash
git log --oneline -- path/to/file | head -20
```

Analyze commit messages to categorize changes:
- `feat:` → feature expansion (file is growing in scope)
- `fix:` → repeated bug fixes (logic is fragile)
- `refactor:` → already being worked on but not finished
- `chore:` / `style:` → cleanup noise, less concerning
- No prefix / unclear → poor commit hygiene, higher risk

---

### Step 3 — Identify Co-Change Clusters

Files that always change together are structurally coupled even if they don't import each other:

```bash
git log --name-only --format="" | paste - - | sort | uniq -c | sort -rn | head -20
```

Clusters of co-changing files that *should* be independent are a strong signal of hidden coupling and refactoring need.

---

### Step 4 — Detect Revert Patterns

```bash
git log --oneline --grep="revert" -i
```

Files repeatedly mentioned in revert commits are resisting change — a sign of fragile logic or missing tests.

---

### Step 5 — Score Each Candidate for Refactoring Priority

| Signal | Priority Points |
|--------|----------------|
| Top 10% churn | +3 |
| Majority of commits are `fix:` type | +3 |
| Appears in co-change cluster with 3+ unrelated files | +2 |
| Subject of at least 1 revert | +2 |
| Commit messages are vague or missing | +1 |
| File size > 500 lines (if inferable from diff stats) | +1 |
| No test file counterpart exists | +2 |

Sum scores → sort by priority.

---

### Step 6 — Propose Specific Refactoring Actions

For each high-priority file, go beyond "this needs refactoring" and propose a direction:

| Churn Pattern | Suggested Action |
|---------------|-----------------|
| File handles many different concerns | Extract into 2–3 smaller modules by responsibility |
| File co-changes with many others | Define a clear interface/contract; reduce implicit coupling |
| Repeated fix commits on same logic | Add unit tests; consider rewriting the fragile function |
| File grew from 50 → 500 lines over time | Structural split along feature or data boundaries |
| Revert-heavy file | Freeze changes temporarily; document behavior; test before next touch |

---

### Step 7 — Produce the Output

Format:

```
## Refactoring Suggestions

**Analysis period:** [date range]
**Files analyzed:** [N]
**Hotspots identified:** [N]

---

### 🔴 High Priority

#### `path/to/file.js`
**Churn:** [N] changes in last [timeframe]
**Pattern:** [e.g., "73% of changes are fix commits"]
**Evidence:** Commits `<SHA>`, `<SHA>`, `<SHA>`

**Suggestion:** [Specific, actionable refactoring direction]
**Expected benefit:** [What improves if this is done]

---

#### `path/to/another.js`
...

---

### 🟡 Medium Priority

[Similar format, 2–4 files]

---

### Summary

| File | Churn | Primary Signal | Priority |
|------|-------|----------------|----------|
| `file.js` | 47 changes | 70% fix commits | 🔴 High |
| `other.js` | 31 changes | co-change cluster | 🟡 Medium |
| ... | ... | ... | ... |

---

### General Observations

[2–3 sentences summarizing the overall refactoring health of the repo:
e.g., "The data layer is stable but the API routing layer shows signs of organic growth without clear boundaries."]
```

---

## Quality Checks

- [ ] Every suggestion cites actual file paths and commit counts
- [ ] Priority levels reflect real signal strength, not gut feel
- [ ] Suggested actions are specific (not "clean up" — but "extract X into its own module")
- [ ] General Observations connects individual findings to repo-wide health
- [ ] No file is flagged for refactoring based only on churn without at least one additional signal
