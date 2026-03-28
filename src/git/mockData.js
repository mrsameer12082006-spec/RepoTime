/**
 * Realistic mock git data for a fictional "TaskFlow" project.
 * Simulates ~14 months of development with clear phases and some risky commits.
 */
 
const MOCK_LOG = `
## Commit Log (last 100)
 
a1b2c3d | 2024-03-15 | sarah.chen | fix: patch null pointer in auth middleware
b2c3d4e | 2024-03-12 | raj.patel | feat: add dashboard export to CSV
c3d4e5f | 2024-03-10 | sarah.chen | fix: login redirect loop on expired token
d4e5f6g | 2024-03-08 | mike.okafor | refactor: split userController into userService + userRoutes
e5f6g7h | 2024-03-05 | raj.patel | fix: dashboard crash when no data returned
f6g7h8i | 2024-03-01 | sarah.chen | feat: add role-based access control to API endpoints
g7h8i9j | 2024-02-22 | mike.okafor | fix: hotfix session token expiry not refreshing
h8i9j0k | 2024-02-20 | raj.patel | feat: notifications module
i9j0k1l | 2024-02-15 | sarah.chen | chore: upgrade express 4.17 -> 4.18
j0k1l2m | 2024-02-10 | mike.okafor | fix: temp workaround for broken auth check (wip)
k1l2m3n | 2024-02-05 | raj.patel | feat: real-time updates via websocket
l2m3n4o | 2024-01-28 | sarah.chen | refactor: move all db queries into repositories/ layer
m3n4o5p | 2024-01-20 | mike.okafor | feat: task assignment and priority system
n4o5p6q | 2024-01-10 | raj.patel | fix: memory leak in socket connection handler
o5p6q7r | 2024-01-05 | sarah.chen | chore: add eslint and prettier config
p6q7r8s | 2023-12-20 | mike.okafor | refactor: migrate from callbacks to async/await throughout
q7r8s9t | 2023-12-10 | raj.patel | fix: task list not paginating correctly
r8s9t0u | 2023-12-01 | sarah.chen | feat: introduce services/ directory, extract business logic
s9t0u1v | 2023-11-20 | mike.okafor | fix: multiple race conditions in concurrent task updates
t0u1v2w | 2023-11-10 | raj.patel | fix: broken date parsing in task deadline field
u1v2w3x | 2023-11-05 | sarah.chen | fix: auth token not invalidated on logout
v2w3x4y | 2023-10-25 | mike.okafor | feat: add user profile and settings pages
w3x4y5z | 2023-10-15 | raj.patel | fix: dashboard widget showing stale data
x4y5z6a | 2023-10-05 | sarah.chen | feat: task comments and activity feed
y5z6a7b | 2023-09-20 | mike.okafor | fix: SQL injection vulnerability in search query
z6a7b8c | 2023-09-10 | raj.patel | feat: file attachments on tasks
a7b8c9d | 2023-08-25 | sarah.chen | feat: project dashboard with charts
b8c9d0e | 2023-08-10 | mike.okafor | feat: team management and invitations
c9d0e1f | 2023-07-20 | raj.patel | feat: email notifications
d0e1f2g | 2023-07-01 | sarah.chen | refactor: reorganize flat src/ into routes/ models/ controllers/
e1f2g3h | 2023-06-15 | mike.okafor | feat: task CRUD complete
f2g3h4i | 2023-06-01 | raj.patel | feat: user registration and login
g3h4i5j | 2023-05-15 | sarah.chen | chore: add Dockerfile and docker-compose
h4i5j6k | 2023-05-01 | mike.okafor | feat: basic Express server with health check
i5j6k7l | 2023-04-20 | raj.patel | chore: project setup, package.json, README
j6k7l8m | 2023-04-15 | sarah.chen | initial commit
`.trim();
 
const MOCK_SHORTLOG = `
## Contributor Activity
 
  42  sarah.chen
  38  mike.okafor
  31  raj.patel
`.trim();
 
const MOCK_CHURN = `
## File Churn (most changed files)
 
28  src/auth/authMiddleware.js
24  src/controllers/userController.js
19  src/routes/taskRoutes.js
17  src/models/Task.js
14  src/services/notificationService.js
12  src/utils/dateHelpers.js
11  src/controllers/dashboardController.js
9   src/config/db.js
8   src/routes/userRoutes.js
7   src/models/User.js
6   src/services/emailService.js
5   src/utils/validators.js
4   src/middleware/rateLimiter.js
3   src/config/env.js
2   src/routes/healthRoutes.js
`.trim();
 
const MOCK_FILE_CHANGES = `
## File Renames & Moves
 
d0e1f2g refactor: reorganize flat src/ into routes/ models/ controllers/
  rename src/user.js => src/controllers/userController.js
  rename src/tasks.js => src/controllers/taskController.js
  rename src/db.js => src/config/db.js
 
r8s9t0u feat: introduce services/ directory, extract business logic
  rename src/controllers/notificationController.js => src/services/notificationService.js
  rename src/controllers/emailController.js => src/services/emailService.js
 
l2m3n4o refactor: move all db queries into repositories/ layer
  rename src/models/UserModel.js => src/repositories/userRepository.js
  rename src/models/TaskModel.js => src/repositories/taskRepository.js
`.trim();
 
/**
 * Returns appropriate mock context based on skill needs.
 */
function getMockGitContext(skill) {
  const sections = [];
 
  if (skill.needs.includes("log")) sections.push(MOCK_LOG);
  if (skill.needs.includes("shortlog")) sections.push(MOCK_SHORTLOG);
  if (skill.needs.includes("churn")) sections.push(MOCK_CHURN);
  if (skill.needs.includes("fileChanges")) sections.push(MOCK_FILE_CHANGES);
 
  return sections.join("\n\n");
}
 
module.exports = { getMockGitContext };
 