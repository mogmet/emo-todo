# EmoTodo - Emotion-Aware TODO Management

感情に寄り添ったTODO管理システム

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Firebase project with Firestore enabled

### Setup

1. **Install dependencies**
```bash
npm install
```

2. **CRITICAL: Seed emotion data (T001)**
```bash
# This MUST be run first before any other tasks
npm run seed:emotions
```

3. **Start development**
```bash
# Start Firebase emulator
npm run firebase:emulate

# In another terminal, start Next.js
npm run dev
```

## 📋 Task Execution

This project follows **Spec-Driven Development** with 48 tasks in `/specs/001-emotodo-todo-1/tasks.md`.

### ✅ Completed Tasks
- **T001**: ✅ Create emotion initial data in Firebase Firestore

### 📝 Task Status
- **Phase 3.1**: Setup (1/5 completed)
- **Phase 3.2**: Tests First - TDD (0/11)  
- **Phase 3.3**: Core Implementation (0/20)
- **Phase 3.4**: Integration (0/4)
- **Phase 3.5**: Polish (0/8)

### Next Tasks
Run these in order (or in parallel where marked [P]):

```bash
# T002-T005: Project setup
# T006-T016: Tests first (TDD) [P]
# T017+: Implementation (only after tests fail)
```

## 🏗️ Architecture

- **Next.js 14** with App Router
- **TypeScript** strict mode
- **Tailwind CSS** for styling
- **Firebase** Firestore + Auth
- **Recharts** for analytics
- **Vitest** + Playwright for testing

## 📊 Emotion Data

7 predefined emotions created by T001:
- **Positive/High**: excited 🎉, motivated 💪
- **Positive/Medium**: calm 😌  
- **Neutral/Medium**: neutral 😐
- **Negative/Low**: tired 😴, anxious 😰, overwhelmed 😵

## 🧪 Testing Strategy

Following **TDD** workflow:
1. Write tests first (must fail)
2. Implement to make tests pass
3. Refactor

Test types:
- **Contract tests**: API endpoint validation
- **Integration tests**: User scenario validation  
- **Unit tests**: Library function validation
- **E2E tests**: Full application flow

## 📈 Development Status

**Current**: T001 completed - emotion foundation established
**Next**: T002-T005 project initialization or T006-T016 test creation

See `/specs/001-emotodo-todo-1/tasks.md` for full task list and dependencies.