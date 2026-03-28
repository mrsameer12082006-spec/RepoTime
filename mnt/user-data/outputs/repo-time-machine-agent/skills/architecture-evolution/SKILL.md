---
name: architecture-evolution
version: 1.0.0
description: >
  Understand how the project's structural architecture changed over time.
  Detects folder restructures, major refactoring events, pattern shifts,
  dependency changes, and produces an architecture timeline.
triggers:
  - "what architectural changes happened"
  - "how has the structure changed"
  - "when did the architecture shift"
  - "how was the project organized before"
  - "what design patterns are used and when were they introduced"
tools:
  - git log
  - git diff
  - git show
---

# Skill: Architecture Evolution

## Purpose

Act as an architectural historian for the codebase. Analyze the git history to reconstruct how the project's structure, patterns, and design decisions evolved — and explain what those shifts reveal about the team's thinking at each stage.

---

## When to Use This Skill

Invoke when the user asks:
- "How has the project structure changed?"
- "When did we switch from X to Y pattern?"
- "Were there any major refactors?"
- "How was the codebase organized in the early days?"
- "What architectural decisions have been made?"

---

## Step-by-Step Instructions

### Step 1 — Snapshot the Directory Structure at Key Points

Identify 3–5 meaningful commits spaced across the project's history (early, mid, recent).

For each snapshot point:
```bash
git show <SHA>:. --name-only
# or reconstruct tree via:
git ls-tree -r --name-only <SHA>
```

Compare snapshots to detect:
- New top-level directories appearing
- Directories disappearing or being renamed
- Major file movements (e.g., `utils.js` → `src/helpers/utils.js`)
- New configuration files (e.g., `docker-compose.yml`, `tsconfig.json`, `.eslintrc`)

---

### Step 2 — Detect Structural Shift Events

Look for commits with high file-rename or file-move counts:
```bash
git log --diff-filter=R --summary --oneline
```

Also look for:
```bash
git log --diff-filter=D --summary --oneline  # mass deletions
git log --diff-filter=A --summary --oneline  # mass additions
```

A commit that moves 10+ files is an architectural event, not a feature commit.

---

### Step 3 — Identify Design Pattern Changes

Scan commit messages and diffs for signals of pattern shifts:

| Signal | Architectural Implication |
|--------|--------------------------|
| Introduction of `services/`, `repositories/`, `controllers/` dirs | Shift toward layered architecture |
| Addition of `interfaces/` or `contracts/` dirs | Move toward abstraction / dependency inversion |
| Appearance of `events/`, `handlers/`, `listeners/` | Event-driven pattern adoption |
| Files renamed from `*Manager.js` → `*Service.js` | Naming convention standardization |
| New `packages/` or `modules/` dir | Monorepo or modular architecture adoption |
| Introduction of a state management file/dir | Frontend state architecture decision |
| First `Dockerfile` or `k8s/` dir | Infrastructure-as-code maturation |

---

### Step 4 — Identify Dependency Architecture Changes

Look for commits that changed `package.json`, `requirements.txt`, `go.mod`, or equivalent:
```bash
git log --oneline -- package.json
git diff <early-SHA> <recent-SHA> -- package.json
```

Notable shifts to flag:
- Major framework swap (e.g., Express → Fastify, Flask → FastAPI)
- ORM change (e.g., raw SQL → Sequelize → Prisma)
- Test framework changes
- Removal of large dependency groups (cleanup/modernization)

---

### Step 5 — Produce the Architecture Timeline

Format:

```
## Architecture Evolution Timeline

---

### [Date range] — [Phase Name]

**Structure at this point:**
[Description of directory layout and key files]

**Key architectural characteristics:**
- [Pattern or approach in use]
- [Notable dependencies or frameworks]

**Commits marking this phase:**
- `<SHA>` — [message] — [architectural significance]

---

### [Next phase...]

---

## Major Structural Shifts

| Event | Date | Commits | Impact |
|-------|------|---------|--------|
| Introduced `services/` layer | YYYY-MM-DD | `<SHA>` | Separated business logic from routes |
| Migrated to TypeScript | YYYY-MM-DD | `<SHA>` | Typing discipline introduced |
| ... | ... | ... | ... |

---

## Architectural Assessment

**Trajectory:** [e.g., "The project moved from a monolithic structure toward a feature-module architecture"]

**Current architectural style:** [e.g., "Layered MVC with emerging service abstraction"]

**Potential concerns:**
- [e.g., "The `utils/` directory has grown without subdivision — possible God Module risk"]
- [e.g., "Two competing patterns exist in the codebase: old Controller style and new Service style"]
```

---

## Quality Checks

- [ ] Each phase is backed by specific SHA evidence
- [ ] Pattern shifts are named precisely (not just "things changed")
- [ ] Dependency changes are surfaced if significant
- [ ] Architectural assessment is honest about inconsistencies or technical debt
- [ ] Confidence is noted where commit history is ambiguous
