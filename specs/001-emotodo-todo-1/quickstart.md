# EmoTodo Quickstart Guide

**Project**: EmoTodo - Emotion-Aware TODO Management System  
**Target**: Development team and stakeholders  
**Purpose**: Validate core user scenarios and API functionality

## Prerequisites

- Node.js 18+ installed
- Firebase project configured with Firestore enabled
- Next.js development environment
- **CRITICAL**: Emotion initial data seeded (7 predefined emotions)
- Test user accounts created
- Firebase emulator running for development

## User Scenario Validation

### Scenario 1: Create Task with Emotion
**Goal**: Verify core task creation with emotion tagging

**Data Prerequisites**:
- ✅ 7 predefined emotions exist in Firestore emotions collection
- ✅ Test user `test@emotodo.com` exists in Firebase Auth
- ✅ Firebase emulator running with empty tasks collection

1. **Open EmoTodo application**
   ```
   npm run dev
   Navigate to: http://localhost:3000
   ```

2. **Authenticate user**
   - Click "Sign In" button
   - Use test account: `test@emotodo.com` / `testpass123`
   - Verify redirect to main dashboard

3. **Create task with emotion**
   - Click "New Task" button
   - Enter description: "Prepare presentation for client meeting"
   - Select emotion: "Anxious" 😰 (verify emotion appears in dropdown)
   - Add micro-note: "This will help me get the promotion"
   - Click "Create Task"

4. **Verify task creation**
   - ✅ Task appears in task list with anxious emotion indicator
   - ✅ Emotion color (orange) and emoji (😰) display correctly
   - ✅ Micro-note is accessible via hover/click
   - ✅ Task status shows "pending"

**API Validation**:
```bash
# Verify task was created
curl -X GET "http://localhost:3000/api/tasks" \
  -H "Authorization: Bearer {firebase_token}"

# Expected response includes new task with emotionId: "anxious"
```

### Scenario 2: Filter Tasks by Emotion
**Goal**: Verify emotion-based task filtering

**Data Prerequisites**:
- ✅ At least 6 tasks created with different emotions:
  - 3 tasks with "excited" emotion
  - 2 tasks with "anxious" emotion (including task from Scenario 1)
  - 1 task with "tired" emotion
- ✅ All tasks belong to authenticated user `test@emotodo.com`

1. **Verify initial state**
   - Navigate to main task list
   - Confirm all 6 tasks are visible

2. **Apply emotion filter**
   - Click emotion filter dropdown
   - Select "Anxious" emotion
   - Verify only anxious tasks display (2 tasks)

3. **Test multiple emotion filter**
   - Select both "Anxious" and "Excited" emotions
   - Verify 5 tasks display (3 excited + 2 anxious)

4. **Clear filters**
   - Click "Clear Filters" button
   - Verify all 6 tasks display

**API Validation**:
```bash
# Test emotion filtering
curl -X GET "http://localhost:3000/api/tasks?emotionId=anxious" \
  -H "Authorization: Bearer {firebase_token}"
```

### Scenario 3: Complete Task with Emotion Change
**Goal**: Verify task completion and emotion tracking

**Data Prerequisites**:
- ✅ Task from Scenario 1 exists and has status "pending"
- ✅ Task has creation emotion entry with "anxious" emotion
- ✅ User authenticated as `test@emotodo.com`

1. **Select pending task**
   - Choose task created in Scenario 1 ("Prepare presentation for client meeting")
   - Click task to open details

2. **Complete task**
   - Click "Mark Complete" button
   - Select completion emotion: "Excited" 🎉
   - Click "Complete Task"

3. **Verify completion**
   - ✅ Task status changes to "completed"
   - ✅ Completion timestamp recorded
   - ✅ Both creation and completion emotions visible
   - ✅ Emotion change indicator shows: Anxious → Excited

**API Validation**:
```bash
# Verify task completion and emotion entry
curl -X PATCH "http://localhost:3000/api/tasks/{taskId}" \
  -H "Authorization: Bearer {firebase_token}" \
  -H "Content-Type: application/json" \
  -d '{"status": "completed", "completionEmotionId": "excited"}'
```

### Scenario 4: View Emotion Analytics Dashboard
**Goal**: Verify dashboard data aggregation and visualization

**Data Prerequisites**:
- ✅ At least 5 completed tasks with emotion changes
- ✅ Tasks created within current week timeframe
- ✅ Mix of positive/negative emotion transitions
- ✅ At least one completed task from Scenario 3

1. **Navigate to dashboard**
   - Click "Dashboard" in navigation
   - Select time period: "This Week"

2. **Verify emotion distribution chart**
   - ✅ Pie chart shows emotion breakdown
   - ✅ Percentages add up to 100%
   - ✅ Colors match emotion definitions

3. **Verify completion rates**
   - ✅ Bar chart shows completion rate per emotion
   - ✅ "Excited" tasks show higher completion rate
   - ✅ Numbers match actual task data

4. **Verify emotion change patterns**
   - ✅ Flow diagram shows creation → completion emotion changes
   - ✅ Anxious → Excited change from Scenario 3 appears

**API Validation**:
```bash
# Test dashboard data
curl -X GET "http://localhost:3000/api/dashboard?period=week" \
  -H "Authorization: Bearer {firebase_token}"
```

### Scenario 5: Task Sharing Between Users
**Goal**: Verify collaborative features

**Data Prerequisites**:
- ✅ Second test user `test2@emotodo.com` exists in Firebase Auth
- ✅ Second user has at least 2 tasks with emotions
- ✅ First user `test@emotodo.com` has clean sharing state (no existing shares)

1. **Setup second user**
   - Create test account: `test2@emotodo.com` / `testpass123` (if not exists)
   - Sign in as second user
   - Create 2 test tasks with different emotions

2. **Share tasks with first user**
   - Navigate to Settings → Sharing
   - Enter email: `test@emotodo.com`
   - Click "Share My Tasks"

3. **Verify sharing as first user**
   - Sign in as `test@emotodo.com`
   - Navigate to Shared Tasks view
   - ✅ Second user's tasks appear in read-only mode
   - ✅ Emotions and completion status visible

**API Validation**:
```bash
# Test sharing setup
curl -X POST "http://localhost:3000/api/sharing" \
  -H "Authorization: Bearer {firebase_token}" \
  -H "Content-Type: application/json" \
  -d '{"targetUserEmail": "test@emotodo.com"}'
```

## Test Data Setup

### CRITICAL: Emotion Initial Data (MUST BE CREATED FIRST)
```javascript
// These 7 emotions MUST exist in Firestore before any other tests
const requiredEmotions = [
  { id: "excited", name: "Excited", emoji: "🎉", color: "#10b981", category: "positive", energy: "high", displayOrder: 1 },
  { id: "motivated", name: "Motivated", emoji: "💪", color: "#3b82f6", category: "positive", energy: "high", displayOrder: 2 },
  { id: "calm", name: "Calm", emoji: "😌", color: "#06b6d4", category: "positive", energy: "medium", displayOrder: 3 },
  { id: "neutral", name: "Neutral", emoji: "😐", color: "#6b7280", category: "neutral", energy: "medium", displayOrder: 4 },
  { id: "tired", name: "Tired", emoji: "😴", color: "#f59e0b", category: "negative", energy: "low", displayOrder: 5 },
  { id: "anxious", name: "Anxious", emoji: "😰", color: "#f97316", category: "negative", energy: "low", displayOrder: 6 },
  { id: "overwhelmed", name: "Overwhelmed", emoji: "😵", color: "#ef4444", category: "negative", energy: "low", displayOrder: 7 }
];
```

### Required Test Users
```javascript
// Primary test user
{
  email: "test@emotodo.com",
  password: "testpass123",
  displayName: "Test User 1"
}

// Secondary test user for sharing
{
  email: "test2@emotodo.com", 
  password: "testpass123",
  displayName: "Test User 2"
}
```

### Sample Tasks for Testing (Create AFTER emotions)
```javascript
const testTasks = [
  {
    description: "Review quarterly sales report",
    emotionId: "excited",
    micronote: "Finally time to see our progress!"
  },
  {
    description: "Schedule dentist appointment",
    emotionId: "anxious", 
    micronote: "Not looking forward to this..."
  },
  {
    description: "Organize desk workspace",
    emotionId: "tired",
    micronote: "Easy win for today"
  }
];
```

## Performance Validation

### Real-Time Updates Test
1. Open EmoTodo in two browser tabs (same user)
2. Create task in Tab 1
3. Verify task appears in Tab 2 within 100ms
4. Complete task in Tab 2
5. Verify completion appears in Tab 1 within 100ms

### Offline Functionality Test  
1. Disconnect internet connection
2. Create new task (should succeed with offline indicator)
3. Reconnect internet
4. Verify task syncs to server within 5 seconds

### Mobile Responsiveness Test
1. Open on mobile device (or browser dev tools)
2. Verify responsive layout adapts correctly
3. Test touch interactions for emotion selection
4. Verify dashboard charts are readable on small screens

## Success Criteria

**Functional Requirements**:
- ✅ Task creation with emotion tagging works
- ✅ Emotion filtering functions correctly  
- ✅ Task completion records emotion changes
- ✅ Dashboard shows accurate analytics
- ✅ Task sharing between users works

**Performance Requirements**:
- ✅ Real-time updates < 100ms
- ✅ Dashboard renders < 1s
- ✅ Emotion filter response < 500ms
- ✅ Offline task creation works

**User Experience Requirements**:
- ✅ Mobile-responsive design
- ✅ Intuitive emotion selection UI
- ✅ Clear emotion change visualization
- ✅ Accessible color contrast for emotions

## Troubleshooting

### Common Issues

**Firebase Auth Token Expired**:
- Solution: Refresh page or re-authenticate
- Validation: Check browser dev tools for 401 responses

**Real-time Updates Not Working**:
- Check: Firestore security rules allow proper access
- Check: WebSocket connection established in dev tools

**Dashboard Not Loading**:
- Verify: Sufficient test data exists (minimum 5 tasks)
- Check: API responds correctly to `/api/dashboard`

**Sharing Not Working**:
- Verify: Target user email exists in Firebase Auth
- Check: User permissions updated in Firestore

---

**Quickstart Complete**: Core functionality validated, ready for full implementation.