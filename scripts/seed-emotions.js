#!/usr/bin/env node

/**
 * T001: Create emotion initial data in Firebase Firestore
 * 
 * CRITICAL FIRST TASK - This must complete before any other EmoTodo tasks
 * Creates the 7 predefined emotions required by all other components
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, getDocs } = require('firebase/firestore');

// Firebase configuration (use environment variables in production)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "emotodo-dev.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "emotodo-dev",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "emotodo-dev.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.FIREBASE_APP_ID || "1:123456789:web:abcdef"
};

// The 7 predefined emotions from data-model.md
const requiredEmotions = [
  { 
    id: "excited", 
    name: "Excited", 
    emoji: "🎉", 
    color: "#10b981", 
    category: "positive", 
    energy: "high", 
    displayOrder: 1 
  },
  { 
    id: "motivated", 
    name: "Motivated", 
    emoji: "💪", 
    color: "#3b82f6", 
    category: "positive", 
    energy: "high", 
    displayOrder: 2 
  },
  { 
    id: "calm", 
    name: "Calm", 
    emoji: "😌", 
    color: "#06b6d4", 
    category: "positive", 
    energy: "medium", 
    displayOrder: 3 
  },
  { 
    id: "neutral", 
    name: "Neutral", 
    emoji: "😐", 
    color: "#6b7280", 
    category: "neutral", 
    energy: "medium", 
    displayOrder: 4 
  },
  { 
    id: "tired", 
    name: "Tired", 
    emoji: "😴", 
    color: "#f59e0b", 
    category: "negative", 
    energy: "low", 
    displayOrder: 5 
  },
  { 
    id: "anxious", 
    name: "Anxious", 
    emoji: "😰", 
    color: "#f97316", 
    category: "negative", 
    energy: "low", 
    displayOrder: 6 
  },
  { 
    id: "overwhelmed", 
    name: "Overwhelmed", 
    emoji: "😵", 
    color: "#ef4444", 
    category: "negative", 
    energy: "low", 
    displayOrder: 7 
  }
];

async function seedEmotions() {
  try {
    console.log('🚀 Starting T001: Create emotion initial data...');
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    console.log('📦 Connected to Firestore');
    
    // Check if emotions already exist
    const emotionsRef = collection(db, 'emotions');
    const existingEmotions = await getDocs(emotionsRef);
    
    if (!existingEmotions.empty) {
      console.log(`⚠️  Found ${existingEmotions.size} existing emotions in Firestore`);
      console.log('🔍 Checking if all required emotions exist...');
      
      const existingIds = existingEmotions.docs.map(doc => doc.id);
      const missingEmotions = requiredEmotions.filter(emotion => !existingIds.includes(emotion.id));
      
      if (missingEmotions.length === 0) {
        console.log('✅ All 7 required emotions already exist in Firestore');
        console.log('📋 Existing emotions:', existingIds.join(', '));
        return;
      } else {
        console.log(`❌ Missing ${missingEmotions.length} emotions:`, missingEmotions.map(e => e.id).join(', '));
      }
    }
    
    // Create or update emotions
    console.log('📝 Creating/updating emotions in Firestore...');
    
    const createdEmotions = [];
    for (const emotion of requiredEmotions) {
      const emotionRef = doc(db, 'emotions', emotion.id);
      await setDoc(emotionRef, emotion, { merge: true });
      createdEmotions.push(emotion.id);
      console.log(`  ✅ ${emotion.emoji} ${emotion.name} (${emotion.category}/${emotion.energy})`);
    }
    
    // Verification
    console.log('🔍 Verifying emotion data...');
    const finalCheck = await getDocs(emotionsRef);
    const finalIds = finalCheck.docs.map(doc => doc.id);
    
    const allRequired = requiredEmotions.every(emotion => finalIds.includes(emotion.id));
    
    if (allRequired) {
      console.log('✅ SUCCESS: All 7 required emotions verified in Firestore');
      console.log('📊 Emotion summary:');
      console.log(`   - Positive (high energy): excited, motivated`);
      console.log(`   - Positive (medium energy): calm`);
      console.log(`   - Neutral (medium energy): neutral`);
      console.log(`   - Negative (low energy): tired, anxious, overwhelmed`);
      console.log('');
      console.log('🎯 T001 COMPLETED - Other tasks can now proceed');
      console.log('💡 Next: Run T002-T005 (project setup) or T006-T016 (tests)');
    } else {
      const missing = requiredEmotions.filter(emotion => !finalIds.includes(emotion.id));
      console.error('❌ FAILED: Missing emotions after creation:', missing.map(e => e.id).join(', '));
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ ERROR in T001:', error.message);
    console.error('');
    console.error('🔧 Troubleshooting:');
    console.error('   1. Check Firebase configuration in environment variables');
    console.error('   2. Ensure Firebase emulator is running: firebase emulators:start');
    console.error('   3. Verify Firestore is enabled in Firebase project');
    console.error('   4. Check network connectivity');
    process.exit(1);
  }
}

// CLI usage
if (require.main === module) {
  seedEmotions();
}

module.exports = { seedEmotions, requiredEmotions };