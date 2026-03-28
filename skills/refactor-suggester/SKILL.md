---
name: refactor-suggester
description: "Suggest targeted refactoring opportunities based on file churn patterns, co-change clusters, and instability signals from git history."
allowed-tools: Bash
---

# Refactor Suggester

## Purpose
Use git churn as a proxy for code quality. Files that change constantly are telling you something — surface these hotspots and propose specific, evidence-backed refactoring actions.

## When to Use
- "What should be refactored?"
- "Which parts of the code are unstable?"
- "Where is the technical debt?"
- "Which files change the most?"

## Instructions

### Step 1 — Compute file churn
```bash
git log --format=format: --name-only | grep -v '^$' | sort | uniq -c | sort -rn | head -20
```
Collect top 20 highest-churn files.

### Step 2 — Analyze commit types per file
```bash
git log --oneline -- path/to/file | head -20
```
Categorize: feat (growing scope), fix (fragile logic), refactor (incomplete cleanup).

### Step 3 — Find co-change clusters
Files that always change together are secretly coupled:
```bash
git log --name-only --format="" | sort | uniq -c | sort -rn | head -20
```

### Step 4 — Check for revert patterns
```bash
git log --oneline --grep="revert" -i
```
Files in reverts are actively resisting change.

### Step 5 — Score each file
| Signal | Priority Points |
|--------|----------------|
| Top 10% churn | +3 |
| Majority fix commits | +3 |
| In co-change cluster | +2 |
| Subject of a revert | +2 |
| No test counterpart | +2 |

### Step 6 — Output format
```
## Refactoring Suggestions

### 🔴 High Priority
**`path/to/file`**  
Churn: N changes | Pattern: 70% fix commits  
Suggestion: [specific action — e.g., "extract auth logic into separate module"]  
Benefit: [what improves]

### 🟡 Medium Priority
[same format]

### Summary Table
| File | Churn | Signal | Priority |

### General Observations
[2–3 sentences on overall repo refactor health]
```