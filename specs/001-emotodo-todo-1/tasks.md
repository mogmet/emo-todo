# Tasks: EmoTodo - Emotion-Aware TODO Management System

**Input**: Design documents from `/specs/001-emotodo-todo-1/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/, quickstart.md

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → COMPLETED: Tech stack extracted (Next.js, TypeScript, Tailwind, Firebase, Recharts)
2. Load optional design documents:
   → data-model.md: 4 entities extracted (Task, Emotion, EmotionEntry, User)
   → contracts/: 6 API endpoints identified
   → research.md: Technical decisions loaded
   → quickstart.md: 5 user scenarios identified
3. Generate tasks by category:
   → Setup: project init, dependencies, emotion data seeding
   → Tests: contract tests (6), integration tests (5)
   → Core: models (4), libraries (4), API endpoints (6)
   → Integration: Firebase config, real-time listeners
   → Polish: unit tests, performance, documentation
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Tests before implementation (TDD)
   → Emotion data creation before all other tasks
5. Number tasks sequentially (T001-T042)
6. Generate dependency graph and parallel execution examples
7. Validate task completeness: ✅ All requirements covered
8. Return: SUCCESS (42 tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Web app structure**: `src/app/`, `src/components/`, `src/lib/`, `tests/`
- Based on Next.js App Router architecture from plan.md

## Phase 3.1: Setup & Prerequisites
- [x] T001 **CRITICAL FIRST**: Create emotion initial data in Firebase Firestore (7 predefined emotions from data-model.md)
- [ ] T002 Initialize Next.js project with TypeScript, Tailwind CSS, and Firebase SDK dependencies
- [ ] T003 [P] Configure ESLint, Prettier, and TypeScript strict mode
- [ ] T004 [P] Setup Firebase configuration and emulator for development
- [ ] T005 [P] Create project directory structure per plan.md (src/app/, src/components/, src/lib/, tests/)

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

### Contract Tests (from contracts/openapi.yaml)
- [ ] T006 [P] Contract test GET /api/emotions in tests/contract/test_emotions_get.spec.ts
- [ ] T007 [P] Contract test POST /api/tasks in tests/contract/test_tasks_post.spec.ts
- [ ] T008 [P] Contract test GET /api/tasks in tests/contract/test_tasks_get.spec.ts
- [ ] T009 [P] Contract test PATCH /api/tasks/{taskId} in tests/contract/test_tasks_patch.spec.ts
- [ ] T010 [P] Contract test GET /api/dashboard in tests/contract/test_dashboard_get.spec.ts
- [ ] T011 [P] Contract test POST /api/sharing in tests/contract/test_sharing_post.spec.ts

### Integration Tests (from quickstart.md scenarios)
- [ ] T012 [P] Integration test "Create Task with Emotion" in tests/integration/test_task_creation.spec.ts
- [ ] T013 [P] Integration test "Filter Tasks by Emotion" in tests/integration/test_emotion_filtering.spec.ts
- [ ] T014 [P] Integration test "Complete Task with Emotion Change" in tests/integration/test_task_completion.spec.ts
- [ ] T015 [P] Integration test "View Emotion Analytics Dashboard" in tests/integration/test_dashboard_analytics.spec.ts
- [ ] T016 [P] Integration test "Task Sharing Between Users" in tests/integration/test_task_sharing.spec.ts

## Phase 3.3: Core Implementation (ONLY after tests are failing)

### TypeScript Types (from data-model.md)
- [ ] T017 [P] Create Task type definition in src/types/task.ts
- [ ] T018 [P] Create Emotion type definition in src/types/emotion.ts
- [ ] T019 [P] Create EmotionEntry type definition in src/types/emotion-entry.ts
- [ ] T020 [P] Create User type definition in src/types/user.ts

### Core Libraries (library-first architecture)
- [ ] T021 [P] Create emotion-engine library in src/lib/emotion-engine/index.ts
- [ ] T022 [P] Create task-manager library in src/lib/task-manager/index.ts
- [ ] T023 Create auth-service library in src/lib/auth-service/index.ts (depends on Firebase config)
- [ ] T024 Create analytics-core library in src/lib/analytics-core/index.ts (depends on task-manager)

### API Routes Implementation
- [ ] T025 Implement GET /api/emotions endpoint in src/app/api/emotions/route.ts
- [ ] T026 Implement POST /api/tasks endpoint in src/app/api/tasks/route.ts
- [ ] T027 Implement GET /api/tasks endpoint in src/app/api/tasks/route.ts
- [ ] T028 Implement PATCH /api/tasks/[taskId] endpoint in src/app/api/tasks/[taskId]/route.ts
- [ ] T029 Implement GET /api/dashboard endpoint in src/app/api/dashboard/route.ts
- [ ] T030 Implement POST /api/sharing endpoint in src/app/api/sharing/route.ts

### UI Components
- [ ] T031 [P] Create EmotionSelector component in src/components/emotion/emotion-selector.tsx
- [ ] T032 [P] Create TaskCard component in src/components/task/task-card.tsx
- [ ] T033 [P] Create EmotionFilter component in src/components/emotion/emotion-filter.tsx
- [ ] T034 [P] Create DashboardChart component in src/components/dashboard/dashboard-chart.tsx
- [ ] T035 Create TaskList page in src/app/tasks/page.tsx
- [ ] T036 Create Dashboard page in src/app/dashboard/page.tsx

## Phase 3.4: Integration & Real-time Features
- [ ] T037 Setup Firebase Firestore real-time listeners in task-manager library
- [ ] T038 Implement Firebase Authentication integration in auth-service
- [ ] T039 Configure Firestore security rules and data validation
- [ ] T040 Setup error handling and structured logging with winston

## Phase 3.5: Polish & Performance
- [ ] T041 [P] Unit tests for emotion-engine library in tests/unit/emotion-engine.test.ts
- [ ] T042 [P] Unit tests for task-manager library in tests/unit/task-manager.test.ts
- [ ] T043 [P] Unit tests for analytics-core library in tests/unit/analytics-core.test.ts
- [ ] T044 [P] Performance optimization for dashboard rendering (<1s requirement)
- [ ] T045 [P] Mobile responsiveness validation with Tailwind CSS
- [ ] T046 [P] Update CLAUDE.md with final implementation details
- [ ] T047 Execute quickstart.md validation scenarios
- [ ] T048 Performance testing for real-time updates (<100ms requirement)

## Dependencies
```
Critical Path:
T001 (emotion data) → T023 (auth-service) → T021,T022 (emotion-engine, task-manager) → T024 (analytics-core)
                   → T025-T030 (API routes) → T035,T036 (pages) → T037-T040 (integration)

Test Dependencies:
T006-T016 (all tests) MUST complete before T017-T040 (implementation)
T017-T020 (types) before T021-T024 (libraries)
T021-T024 (libraries) before T025-T030 (API routes)
T031-T034 (components) before T035-T036 (pages)
```

## Parallel Execution Examples

### Phase 3.2: Launch all contract tests together
```bash
# These can run in parallel (different files, independent)
Task: "Contract test GET /api/emotions in tests/contract/test_emotions_get.spec.ts"
Task: "Contract test POST /api/tasks in tests/contract/test_tasks_post.spec.ts"
Task: "Contract test GET /api/tasks in tests/contract/test_tasks_get.spec.ts"
Task: "Contract test PATCH /api/tasks/{taskId} in tests/contract/test_tasks_patch.spec.ts"
Task: "Contract test GET /api/dashboard in tests/contract/test_dashboard_get.spec.ts"
Task: "Contract test POST /api/sharing in tests/contract/test_sharing_post.spec.ts"
```

### Phase 3.2: Launch all integration tests together
```bash
# After contract tests, these can run in parallel
Task: "Integration test Create Task with Emotion in tests/integration/test_task_creation.spec.ts"
Task: "Integration test Filter Tasks by Emotion in tests/integration/test_emotion_filtering.spec.ts"
Task: "Integration test Complete Task with Emotion Change in tests/integration/test_task_completion.spec.ts"
Task: "Integration test View Emotion Analytics Dashboard in tests/integration/test_dashboard_analytics.spec.ts"
Task: "Integration test Task Sharing Between Users in tests/integration/test_task_sharing.spec.ts"
```

### Phase 3.3: Launch type definitions together
```bash
# After tests fail, create types in parallel
Task: "Create Task type definition in src/types/task.ts"
Task: "Create Emotion type definition in src/types/emotion.ts"
Task: "Create EmotionEntry type definition in src/types/emotion-entry.ts"
Task: "Create User type definition in src/types/user.ts"
```

### Phase 3.3: Launch UI components together (after libraries)
```bash
# Independent components can be built in parallel
Task: "Create EmotionSelector component in src/components/emotion/emotion-selector.tsx"
Task: "Create TaskCard component in src/components/task/task-card.tsx"
Task: "Create EmotionFilter component in src/components/emotion/emotion-filter.tsx"
Task: "Create DashboardChart component in src/components/dashboard/dashboard-chart.tsx"
```

## Validation Checklist
*GATE: All items must be ✅ before execution*

- [x] All contracts have corresponding tests (T006-T011)
- [x] All entities have type definition tasks (T017-T020)
- [x] All tests come before implementation (T006-T016 before T017+)
- [x] Parallel tasks truly independent (different files)
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task
- [x] Critical emotion data creation comes first (T001)
- [x] Library-first architecture maintained (T021-T024)
- [x] TDD workflow enforced (tests fail before implementation)

## Notes
- **T001 is BLOCKING**: No other tasks can proceed until emotion data exists in Firestore
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing (RED phase of TDD)
- Commit after each task for proper git history
- Use Firebase emulator for all development and testing
- Follow TypeScript strict mode and ESLint rules
- Each library must export CLI commands for debugging

## Task Generation Rules Applied
✅ From Contracts: 6 endpoints → 6 contract tests + 6 implementations
✅ From Data Model: 4 entities → 4 type definitions + 4 library integrations  
✅ From User Stories: 5 scenarios → 5 integration tests
✅ From Architecture: Library-first approach with 4 core libraries
✅ Ordering: Setup → Tests → Types → Libraries → APIs → UI → Integration → Polish
✅ Dependencies: Emotion data blocks everything, tests block implementation