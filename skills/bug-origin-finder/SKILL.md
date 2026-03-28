---
name: bug-origin-finder
description: "Identify the commit that most likely introduced a bug by analyzing risky changes, file churn, and suspicious diff patterns."
allowed-tools: Bash
---

# Bug Origin Finder

## Purpose
Act as a forensic investigator of git history. Trace back through commits to identify the most likely point where a bug was introduced — with reasoning and confidence scoring.

## When to Use
- "Which commit introduced this bug?"
- "When did this feature break?"
- "What changed recently that could have caused this?"
- "Find the commit that broke login"

## Instructions

### Step 1 — Narrow the commit window
If a file is known:
```bash
git log --oneline -- path/to/file
```
If a date range is known:
```bash
git log --oneline --since="YYYY-MM-DD" --until="YYYY-MM-DD"
```
If a function name is known:
```bash
git log -S "functionName" --oneline
```

### Step 2 — Score each commit for risk
| Signal | Risk Score |
|--------|-----------|
| Touches the implicated file | +3 |
| Large diff (100+ lines) | +2 |
| Message contains: fix, hotfix, temp, hack, wip | +2 |
| No test changes despite logic changes | +2 |
| Touches many unrelated files | +1 |
| Authored outside business hours | +1 |

### Step 3 — Inspect top suspects
```bash
git show <SHA> --stat
git diff <SHA>^ <SHA>
```
Look for: logic inversions, removed null checks, changed defaults, deleted error handling.

### Step 4 — Output format
```
## Bug Origin Analysis

**Most Likely Culprit**
Commit: `SHA` — date — author  
Message: "commit message"  
Confidence: High / Medium / Low

Why suspicious:
- [specific technical reason]
- [specific technical reason]

**Other Candidates**
| SHA | Date | Reason | Confidence |
|-----|------|--------|-----------|

**Recommended Next Step**
[Specific action to confirm or fix]
```