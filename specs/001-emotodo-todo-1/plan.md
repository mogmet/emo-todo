# Implementation Plan: EmoTodo - Emotion-Aware TODO Management System

**Branch**: `001-emotodo-todo-1` | **Date**: 2025-09-10 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-emotodo-todo-1/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → COMPLETED: Feature spec loaded and analyzed
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → IN PROGRESS: Setting up Next.js, TypeScript, Tailwind CSS context
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Evaluate Constitution Check section below
   → PENDING: Will check after Technical Context complete
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
4. Execute Phase 0 → research.md
   → PENDING: Research phase
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
5. Execute Phase 1 → contracts, data-model.md, quickstart.md, CLAUDE.md
6. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
7. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
8. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
EmoTodo is an emotion-aware TODO management system that allows users to tag tasks with emotions, track emotional changes through task completion, and visualize patterns through a dashboard. The system will be built as a Next.js web application with TypeScript and Tailwind CSS, using Firebase Authentication for user management and featuring real-time emotional analytics.

## Technical Context
**Language/Version**: TypeScript 5.x with Next.js 14+ (App Router)  
**Primary Dependencies**: Next.js, React 18+, Tailwind CSS, Firebase SDK, Recharts for analytics  
**Storage**: Firebase Firestore (with built-in offline caching), Firebase Auth for authentication  
**Testing**: Vitest for unit tests, Playwright for E2E tests, React Testing Library for component tests  
**Target Platform**: Web browsers (Chrome 90+, Firefox 88+, Safari 14+)
**Project Type**: web - determines source structure (frontend + backend API routes)  
**Performance Goals**: <2s initial load, <500ms emotion filter response, <1s dashboard render  
**Constraints**: Real-time updates <100ms, mobile-responsive design  
**Scale/Scope**: 1000+ concurrent users, 10k+ tasks per user, responsive design for mobile/desktop

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Simplicity**:
- Projects: 1 (Next.js web app with API routes)
- Using framework directly? Yes (Next.js App Router, no wrapper abstractions)
- Single data model? Yes (unified Firestore schema, no DTOs)
- Avoiding patterns? Yes (direct Firebase SDK usage, no repository pattern initially)

**Architecture**:
- EVERY feature as library? Yes (emotion-engine, task-manager, analytics-core, auth-service)
- Libraries listed: 
  - emotion-engine: emotion tagging, filtering, suggestion logic
  - task-manager: CRUD operations, state management
  - analytics-core: dashboard data aggregation, pattern analysis
  - auth-service: Firebase auth wrapper with user context
- CLI per library: Each library exports test/debug CLI commands via package.json scripts
- Library docs: llms.txt format planned for each library

**Testing (NON-NEGOTIABLE)**:
- RED-GREEN-Refactor cycle enforced? Yes (tests written first, must fail)
- Git commits show tests before implementation? Yes (TDD workflow)
- Order: Contract→Integration→E2E→Unit strictly followed? Yes
- Real dependencies used? Yes (Firebase emulator for tests, not mocks)
- Integration tests for: Firebase auth flows, real-time data sync, cross-library communication
- FORBIDDEN: Implementation before test, skipping RED phase

**Observability**:
- Structured logging included? Yes (winston with JSON format)
- Frontend logs → backend? Yes (centralized logging via API routes)
- Error context sufficient? Yes (error boundaries, user context, action tracking)

**Versioning**:
- Version number assigned? 1.0.0 (initial release)
- BUILD increments on every change? Yes (automated via CI)
- Breaking changes handled? Yes (database migration strategy, backward compatibility)

## Project Structure

### Documentation (this feature)
```
specs/001-emotodo-todo-1/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
# Option 2: Web application (Next.js with API routes)
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes (backend)
│   ├── dashboard/      # Dashboard pages
│   ├── tasks/          # Task management pages
│   └── auth/           # Authentication pages
├── components/         # Reusable UI components
│   ├── ui/             # Base UI components
│   ├── emotion/        # Emotion-specific components
│   ├── task/           # Task-specific components
│   └── dashboard/      # Dashboard components
├── lib/                # Core libraries
│   ├── emotion-engine/ # Emotion logic library
│   ├── task-manager/   # Task management library
│   ├── analytics-core/ # Analytics library
│   └── auth-service/   # Auth wrapper library
├── hooks/              # React hooks
├── types/              # TypeScript type definitions
└── utils/              # Utility functions

tests/
├── contract/           # API contract tests
├── integration/        # Cross-library integration tests
├── e2e/               # End-to-end tests with Playwright
└── unit/              # Unit tests per library

public/
├── icons/             # Emotion icons/emojis
└── images/            # Static assets
```

**Structure Decision**: Option 2 (Web application) - Next.js with App Router provides both frontend and backend API routes in a single project, suitable for the full-stack requirements.

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - Research Next.js 14 App Router best practices for real-time apps
   - Firebase Firestore real-time subscription patterns
   - Emotion visualization libraries (Chart.js vs Recharts)
   - Offline-first task creation strategies
   - Mobile-responsive dashboard layouts

2. **Generate and dispatch research agents**:
   ```
   For Firebase real-time subscriptions:
     Task: "Research Firebase Firestore real-time listeners for task updates"
   For emotion visualization:
     Task: "Compare Chart.js vs Recharts for emotion analytics dashboard"
   For offline capabilities:
     Task: "Research PWA + IndexedDB for offline task creation"
   For mobile responsiveness:
     Task: "Find Tailwind CSS patterns for responsive dashboard layouts"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all technical decisions documented

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Task: id, description, createdAt, completedAt, status, userId, micronote
   - Emotion: id, name, emoji, color, category (positive/negative/neutral)
   - EmotionEntry: taskId, emotionId, type (creation/completion), timestamp
   - User: id, email, displayName, preferences, sharedWith[]
   - Dashboard: aggregated analytics views per user

2. **Generate API contracts** from functional requirements:
   - POST /api/tasks - Create task with emotion
   - GET /api/tasks - List tasks with filters (emotion, status)
   - PATCH /api/tasks/:id - Update task/complete with emotion
   - GET /api/emotions - List available emotions
   - GET /api/dashboard - Get analytics data
   - POST /api/sharing - Share tasks with other users
   - Output OpenAPI schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - User creates task with emotion → integration test
   - User filters tasks by emotion → integration test
   - User completes task and records emotion → integration test
   - User views dashboard analytics → integration test

5. **Update CLAUDE.md incrementally**:
   - Add Next.js, TypeScript, Tailwind CSS context
   - Add Firebase, emotion tagging concepts
   - Preserve any existing manual additions
   - Keep under 150 lines for token efficiency

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, CLAUDE.md

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- **CRITICAL FIRST TASK**: Create emotion initial data (7 predefined emotions) 
- Each API endpoint → contract test task [P]
- Each entity (Task, Emotion, etc.) → model creation task [P] 
- Each user story → integration test task
- Each library → unit test + implementation tasks
- UI components for emotion selection, task filtering, dashboard

**Ordering Strategy**:
- **Phase 0**: Emotion initial data creation (blocking all other tasks)
- TDD order: Tests before implementation 
- Dependency order: Emotion data → Models → Services → API routes → UI components
- Core libraries first: emotion-engine, task-manager, auth-service, analytics-core
- Mark [P] for parallel execution (independent components)

**Estimated Output**: 35-40 numbered, ordered tasks in tasks.md

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | Constitution requirements met | N/A |

## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*