---
name: bug-origin-finder
version: 1.0.0
description: >
  Identify the commit that most likely introduced a bug by analyzing recent
  changes, file churn patterns, suspicious diffs, and risky modifications
  to critical files. Outputs a ranked list of suspect commits with confidence levels.
triggers:
  - "which commit introduced this bug"
  - "when did this break"
  - "find the bug origin"
  - "what commit caused this regression"
  - "which change broke the login"
tools:
  - git log
  - git diff
  - git blame
  - git bisect
  - git show
---

# Skill: Bug Origin Finder

## Purpose

Act as a forensic investigator of the git history. Given a reported bug or broken behavior, trace back through commit history to identify the most likely point of introduction — with reasoning and confidence scoring.

---

## When to Use This Skill

Invoke when the user asks:
- "Which commit introduced [bug]?"
- "When did [feature] stop working?"
- "What changed recently that could have broken [thing]?"
- "Is there a suspicious commit near [date]?"

---

## Step-by-Step Instructions

### Step 1 — Understand the Bug Context

Ask (or infer from context):
- What is the broken behavior?
- Which file(s) or module(s) are involved?
- When was the bug first noticed?
- What was the last known-good state?

---

### Step 2 — Narrow the Commit Window

If a date range is known:
```bash
git log --oneline --since="YYYY-MM-DD" --until="YYYY-MM-DD"
```

If a file is known to be involved:
```bash
git log --oneline -- path/to/file.js
```

If a specific string or function is implicated:
```bash
git log -S "functionName" --oneline
```

---

### Step 3 — Score Each Candidate Commit for Risk

For each commit in the window, evaluate:

| Signal | Risk Score |
|--------|-----------|
| Touches the implicated file | +3 |
| Large diff (>100 lines changed) | +2 |
| Commit message mentions "quick fix", "hotfix", "temp", "hack", "wip" | +2 |
| Authored late at night or on a weekend | +1 |
| No associated test changes despite logic changes | +2 |
| Touches multiple unrelated files | +1 |
| Reverts a previous commit | +1 |
| Single author with no code review signals | +1 |

Sum scores. Higher = more suspicious.

---

### Step 4 — Inspect Top Suspects

For the top 2–3 scoring commits, run:
```bash
git show <SHA> --stat
git diff <SHA>^ <SHA>
```

Look for:
- Logic inversions (e.g., `>` changed to `>=`, `===` to `==`)
- Deleted guard clauses or null checks
- Changed default values
- Removed error handling
- Refactored functions where behavior subtly changed

---

### Step 5 — Apply git blame on the Broken Lines

If the exact broken line is known:
```bash
git blame -L <start>,<end> path/to/file
```

This surfaces exactly when that specific line was last changed and by whom.

---

### Step 6 — Output the Findings

Format:

```
## Bug Origin Analysis

**Reported behavior:** [Description]
**Files investigated:** [list]
**Commit window examined:** [date range or SHA range]

---

### Most Likely Culprit

**Commit:** `<SHA>` — [date] — [author]
**Message:** "[commit message]"
**Confidence:** High / Medium / Low

**Why this commit is suspicious:**
- [Specific reason 1]
- [Specific reason 2]

**Key change:**
[Brief description of the diff that likely caused the bug]

---

### Other Candidates

| SHA | Date | Reason | Confidence |
|-----|------|--------|-----------|
| `<SHA>` | YYYY-MM-DD | [reason] | Medium |
| `<SHA>` | YYYY-MM-DD | [reason] | Low |

---

### Recommended Next Step

[Suggest git bisect strategy, specific lines to revert, or tests to add]
```

---

## Quality Checks

- [ ] The primary suspect commit is cited with a real SHA
- [ ] Confidence level reflects actual evidence quality
- [ ] The "why suspicious" list contains specific technical observations, not generic guesses
- [ ] Recommended next step is actionable
- [ ] Never accuse a commit of causing a bug without at least 2 supporting signals
