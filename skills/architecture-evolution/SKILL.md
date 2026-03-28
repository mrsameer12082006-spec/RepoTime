---
name: architecture-evolution
description: "Understand how the project's directory structure, design patterns, and dependencies changed over time."
allowed-tools: Bash
---

# Architecture Evolution

## Purpose
Act as an architectural historian. Reconstruct how the project's structure and design decisions evolved — and explain what those shifts reveal about the team's thinking at each stage.

## When to Use
- "What architectural changes happened?"
- "How was the project structured before?"
- "When did we switch to this pattern?"
- "Were there any major refactors?"

## Instructions

### Step 1 — Snapshot structure at key points
Pick 3 commits spread across history (early, mid, recent):
```bash
git ls-tree -r --name-only <SHA>
```
Compare to detect new directories, removed files, major reorganizations.

### Step 2 — Detect structural shift commits
```bash
git log --diff-filter=R --summary --oneline   # renames/moves
git log --diff-filter=D --summary --oneline   # mass deletions
git log --diff-filter=A --summary --oneline   # mass additions
```
A commit moving 10+ files is an architectural event.

### Step 3 — Identify pattern shifts
| Signal | Architectural Implication |
|--------|--------------------------|
| New `services/`, `repositories/` dirs | Layered architecture adoption |
| New `interfaces/` or `contracts/` | Dependency inversion introduced |
| New `events/`, `handlers/` | Event-driven pattern |
| New `packages/` or `modules/` | Monorepo or modular architecture |
| First `Dockerfile` | Infrastructure maturation |

### Step 4 — Output format
```
## Architecture Evolution Timeline

### [Date range] — [Phase Name]
Structure: [key directories and files]
Pattern: [architectural style in use]
Key commits: `SHA` — significance

## Major Structural Shifts
| Event | Date | Impact |

## Architectural Assessment
Current style: [description]
Concerns: [any inconsistencies or technical debt signals]
```