# todo-spec Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-09-10

## Active Technologies
- **TypeScript 5.x** + **Next.js 14+ (App Router)** + **Tailwind CSS** (001-emotodo-todo-1)
- **Firebase SDK** (Firestore + Auth) + **Recharts** for analytics (001-emotodo-todo-1)
- **Vitest** (unit) + **Playwright** (E2E) + **React Testing Library** (component) (001-emotodo-todo-1)

## Project Structure
```
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
```

## Current Features
- **001-emotodo-todo-1**: Emotion-aware TODO management system
  - Firebase Firestore with real-time listeners for task updates
  - Recharts for emotion analytics dashboard visualization
  - PWA capabilities with IndexedDB for offline task creation
  - Mobile-first responsive design with Tailwind CSS

## Commands
```bash
# Development
npm run dev              # Start Next.js development server
npm run build           # Build for production
npm run start           # Start production server

# Testing
npm run test            # Run unit tests with Vitest
npm run test:e2e        # Run E2E tests with Playwright
npm run test:integration # Run integration tests

# Firebase
npm run firebase:emulate # Start Firebase emulators
npm run firebase:deploy  # Deploy to Firebase

# Libraries (TDD workflow)
npm run test:emotion-engine   # Test emotion logic library
npm run test:task-manager     # Test task management library
npm run test:analytics-core   # Test analytics library
npm run test:auth-service     # Test auth wrapper library
```

## Code Style
- **TypeScript strict mode**: All code must be type-safe
- **Next.js App Router**: Use app directory structure, server/client components
- **Tailwind utilities**: Prefer utility classes over custom CSS
- **Component composition**: Build reusable emotion and task components
- **Firebase patterns**: Use onSnapshot for real-time updates, proper cleanup

## Architecture Principles
- **Library-first**: Every feature as standalone library (emotion-engine, task-manager, etc.)
- **TDD workflow**: Tests written first, must fail before implementation
- **Real dependencies**: Use Firebase emulators, not mocks
- **PWA-ready**: Offline-first with IndexedDB + service worker
- **Mobile-first**: Responsive design with Tailwind breakpoints

## Recent Changes
- 001-emotodo-todo-1: Added emotion-aware TODO system with Next.js + Firebase + Tailwind

<!-- MANUAL ADDITIONS START -->
<!-- Add custom development notes, patterns, or team-specific guidelines here -->
<!-- These will be preserved during auto-updates -->
<!-- MANUAL ADDITIONS END -->