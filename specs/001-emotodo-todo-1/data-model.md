# Data Model: EmoTodo

**Project**: EmoTodo - Emotion-Aware TODO Management System  
**Date**: 2025-09-10

## Core Entities

### Task
Represents a user's todo item with emotional context.

**Fields**:
- `id`: string (UUID) - Unique identifier
- `description`: string - Task description text
- `userId`: string - Owner's Firebase Auth UID
- `status`: enum - 'pending' | 'completed' | 'deleted'
- `createdAt`: timestamp - Creation time
- `completedAt`: timestamp | null - Completion time (null if not completed)
- `micronote`: string | null - Optional motivation note
- `priority`: enum - 'low' | 'medium' | 'high' (derived from creation emotion)
- `estimatedDuration`: number | null - Minutes (optional user input)

**Validation Rules**:
- description: Required, max 500 characters
- micronote: Max 200 characters
- status transitions: pending → completed, pending → deleted, completed → deleted only

**Firebase Firestore Schema**:
```javascript
{
  id: "task_uuid_123",
  description: "Finish the quarterly report",
  userId: "firebase_user_uid",
  status: "pending",
  createdAt: firestore.Timestamp,
  completedAt: null,
  micronote: "This will help me get that promotion",
  priority: "high",
  estimatedDuration: 120
}
```

### Emotion
Predefined emotion types for task tagging.

**Fields**:
- `id`: string - Unique emotion identifier
- `name`: string - Human-readable name
- `emoji`: string - Unicode emoji representation
- `color`: string - Hex color code for UI
- `category`: enum - 'positive' | 'negative' | 'neutral'
- `energy`: enum - 'high' | 'medium' | 'low' (for task suggestions)
- `displayOrder`: number - Sort order in UI

**Validation Rules**:
- name: Required, unique, max 20 characters
- emoji: Required, single Unicode emoji
- color: Required, valid hex color code

**Predefined Emotions**:
```javascript
[
  { id: "excited", name: "Excited", emoji: "🎉", color: "#10b981", category: "positive", energy: "high", displayOrder: 1 },
  { id: "motivated", name: "Motivated", emoji: "💪", color: "#3b82f6", category: "positive", energy: "high", displayOrder: 2 },
  { id: "calm", name: "Calm", emoji: "😌", color: "#06b6d4", category: "positive", energy: "medium", displayOrder: 3 },
  { id: "neutral", name: "Neutral", emoji: "😐", color: "#6b7280", category: "neutral", energy: "medium", displayOrder: 4 },
  { id: "tired", name: "Tired", emoji: "😴", color: "#f59e0b", category: "negative", energy: "low", displayOrder: 5 },
  { id: "anxious", name: "Anxious", emoji: "😰", color: "#f97316", category: "negative", energy: "low", displayOrder: 6 },
  { id: "overwhelmed", name: "Overwhelmed", emoji: "😵", color: "#ef4444", category: "negative", energy: "low", displayOrder: 7 }
]
```

### EmotionEntry
Links tasks to emotions with temporal context.

**Fields**:
- `id`: string (UUID) - Unique identifier
- `taskId`: string - Reference to Task.id
- `emotionId`: string - Reference to Emotion.id
- `type`: enum - 'creation' | 'completion'
- `timestamp`: timestamp - When emotion was recorded
- `userId`: string - For security/validation

**Validation Rules**:
- taskId: Must reference existing task
- emotionId: Must reference valid emotion
- type: Required, only 'creation' or 'completion'
- One 'creation' entry per task, zero or one 'completion' entry per task

**Firebase Firestore Schema**:
```javascript
{
  id: "emotion_entry_uuid_456",
  taskId: "task_uuid_123",
  emotionId: "anxious",
  type: "creation",
  timestamp: firestore.Timestamp,
  userId: "firebase_user_uid"
}
```

### User
Individual using the system with preferences and sharing context.

**Fields**:
- `uid`: string - Firebase Auth UID (primary key)
- `email`: string - User's email from Firebase Auth
- `displayName`: string | null - User's display name
- `createdAt`: timestamp - Account creation time
- `preferences`: object - User settings
- `sharedWith`: array<string> - UIDs of users who can see this user's tasks
- `sharedFrom`: array<string> - UIDs of users whose tasks this user can see
- `lastActiveAt`: timestamp - For activity tracking

**Preferences Object**:
```javascript
{
  defaultView: "list" | "grid" | "dashboard",
  emotionReminders: boolean,
  notificationsEnabled: boolean,
  preferredEmotions: string[], // Emotion IDs for quick access
  workingHours: {
    start: "09:00",
    end: "17:00",
    timezone: "America/New_York"
  }
}
```

**Validation Rules**:
- email: Required, valid email format
- displayName: Max 50 characters
- sharedWith/sharedFrom: Max 10 users each (prevent spam)

### Dashboard (Virtual Entity)
Aggregated analytics views - computed from other entities, not stored directly.

**Analytics Computed**:
- Weekly emotion distribution (creation emotions)
- Monthly completion rates by emotion
- Emotion change patterns (creation → completion)
- Task completion velocity trends
- Suggested task priorities based on current emotion

**Sample Dashboard Data Structure**:
```javascript
{
  period: "week", // "week" | "month"
  startDate: "2025-09-03",
  endDate: "2025-09-10",
  emotionDistribution: {
    excited: { count: 5, percentage: 25 },
    anxious: { count: 8, percentage: 40 },
    tired: { count: 7, percentage: 35 }
  },
  completionRates: {
    excited: { completed: 4, total: 5, rate: 0.8 },
    anxious: { completed: 3, total: 8, rate: 0.375 },
    tired: { completed: 2, total: 7, rate: 0.286 }
  },
  emotionChanges: [
    { from: "anxious", to: "excited", count: 3 },
    { from: "tired", to: "calm", count: 2 }
  ],
  suggestions: {
    currentEmotion: "tired",
    recommendedTasks: ["task_uuid_789"], // Low-effort tasks
    reasoning: "Based on your current emotion, here are some easier tasks"
  }
}
```

## Relationships

### Task ↔ EmotionEntry
- One-to-Many: Each task has one creation emotion entry, optionally one completion emotion entry
- Foreign Key: EmotionEntry.taskId → Task.id

### User ↔ Task
- One-to-Many: Each user owns multiple tasks
- Foreign Key: Task.userId → User.uid

### Emotion ↔ EmotionEntry
- One-to-Many: Each emotion can be used in multiple emotion entries
- Foreign Key: EmotionEntry.emotionId → Emotion.id

### User ↔ User (Sharing)
- Many-to-Many: Users can share tasks with each other
- Implemented via: User.sharedWith and User.sharedFrom arrays

## State Transitions

### Task Status Flow
```
pending → completed (when user marks task done)
pending → deleted (when user deletes task)
completed → deleted (when user deletes completed task)
```

### Emotion Entry Flow
```
Task created → EmotionEntry (type: "creation") created
Task completed → EmotionEntry (type: "completion") created (optional)
```

## Security Rules (Firebase)

### Task Collection
- Users can only read/write their own tasks
- Users can read tasks from users in their `sharedFrom` list
- Users cannot modify tasks they don't own

### EmotionEntry Collection
- Users can only read/write emotion entries for their own tasks
- Cascade deletion when task is deleted

### User Collection
- Users can only read/write their own user document
- Public read access to displayName for sharing features

---

**Data Model Complete**: All entities defined with validation rules, relationships, and security considerations.