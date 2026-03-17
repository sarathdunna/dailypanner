# NT Life Plan — Login + Cloud Sync Setup Guide
## 100% Free using Firebase (Google)

---

## What You Get (All FREE)
| Feature | Free Limit |
|---|---|
| Phone OTP Login | Unlimited users |
| Cloud Firestore storage | 1 GB free |
| Daily reads | 50,000/day |
| Daily writes | 20,000/day |
| Hosting | 10 GB free |
| SMS OTP messages | 10/day free (India) |

---

## STEP 1 — Create a Firebase Project

1. Go to → **https://console.firebase.google.com/**
2. Sign in with your **Google account**
3. Click **"Add project"** (big + button)
4. Enter project name: `nt-life-plan`
5. **Disable** Google Analytics (not needed) → Click **"Create project"**
6. Wait 30 seconds → Click **"Continue"**

---

## STEP 2 — Register Your Web App

1. In your Firebase project dashboard, click the **</> (Web)** icon
2. App nickname: `NT Life Plan Web`
3. ✅ Check **"Also set up Firebase Hosting"** (optional but useful)
4. Click **"Register app"**
5. You will see a **firebaseConfig object** — it looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXX",
  authDomain: "nt-life-plan.firebaseapp.com",
  projectId: "nt-life-plan",
  storageBucket: "nt-life-plan.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

6. **COPY THIS ENTIRE CONFIG** — you need it in Step 5

---

## STEP 3 — Enable Phone Authentication

1. In Firebase Console left sidebar → **"Authentication"**
2. Click **"Get started"**
3. Click **"Sign-in method"** tab
4. Click **"Phone"**
5. Toggle it to **Enable** → Click **"Save"**

---

## STEP 4 — Enable Firestore Database

1. In Firebase Console left sidebar → **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in test mode"** (allows read/write for 30 days)
4. Choose region: **asia-south1 (Mumbai)** — closest to India
5. Click **"Enable"**

**Set Security Rules (after 30 days):**
Click **"Rules"** tab and replace with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
Click **"Publish"**

---

## STEP 5 — Add Your Firebase Config to the App

You need to paste your config in **2 files**:

### File 1: `login.html`
Open `login.html` and find this section (around line 90):

```javascript
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  ...
};
```

**Replace** the entire `firebaseConfig` object with YOUR config from Step 2.

### File 2: `index.html`
Open `index.html` and find the same `firebaseConfig` block (around line 25):

```javascript
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  ...
};
```

**Replace** it with the same config.

---

## STEP 6 — Add Your GitHub Domain to Firebase

Firebase needs to know your website domain to allow phone auth.

1. In Firebase Console → **Authentication**
2. Click **"Settings"** tab
3. Scroll to **"Authorized domains"**
4. Click **"Add domain"**
5. Enter: `sarathdunna.github.io`
6. Click **"Add"**

---

## STEP 7 — Upload Files to GitHub

### Option A — GitHub Web (Easiest)

1. Go to **https://github.com/sarathdunna/dailypanner**
2. **Upload `login.html`** (new file — drag and drop)
3. **Update `index.html`** — click the file → pencil icon → paste new content → commit
4. **Update `js/app.js`** — same way
5. **Update `css/style.css`** — same way

### Option B — Git CLI (Faster)

```bash
# Clone your repo
git clone https://github.com/sarathdunna/dailypanner.git
cd dailypanner

# Copy all updated files into the folder
# (copy login.html, index.html, css/style.css, js/app.js)

# Push
git add .
git commit -m "Add phone login + cloud sync"
git push origin main
```

---

## STEP 8 — Test Your App

1. Open: **https://sarathdunna.github.io/dailypanner/**
2. You should be redirected to the **login page**
3. Enter your phone number with country code (+91)
4. Click **"Send OTP"**
5. Enter the 6-digit OTP you receive via SMS
6. You're logged in! ✅

**To test cross-device sync:**
1. Login on your **phone** → check some habits / tasks
2. Open the same URL on your **laptop** → login with same number
3. Your data should **restore automatically** 🔄

---

## STEP 9 — Add to Phone Home Screen

For the best mobile app experience:

**Android (Chrome):**
1. Open `sarathdunna.github.io/dailypanner` in Chrome
2. Tap ⋮ (3 dots) → "Add to Home screen"
3. Tap "Add"
4. App icon appears on your home screen!

**iPhone (Safari):**
1. Open the URL in Safari
2. Tap Share (box with arrow) → "Add to Home Screen"
3. Tap "Add"

---

## Troubleshooting

| Problem | Solution |
|---|---|
| OTP not received | Check phone number format (+91XXXXXXXXXX) |
| "auth/too-many-requests" | Wait 10 min (Firebase rate limit) |
| Page not redirecting to login | Clear browser cache and reload |
| Data not syncing | Click 👤 → "Sync Now" in the app |
| "Firebase not defined" error | Check your config was pasted correctly |
| Firestore permission denied | Set Firestore rules to test mode (Step 4) |

---

## Firebase Free Tier Limits (Spark Plan)

Your app will comfortably stay within free limits:

| What | Daily Usage (estimated) | Free Limit |
|---|---|---|
| Firestore reads | ~200/day | 50,000/day |
| Firestore writes | ~50/day | 20,000/day |
| Auth logins | ~2/day | Unlimited |
| Storage | ~1 MB | 1 GB |

You would need **thousands of daily users** to exceed the free tier. For personal use, it's **permanently free**.

---

## Summary

```
Firebase (Free) provides:
✅ Phone OTP Login
✅ Cloud database (Firestore)
✅ Real-time sync across all devices
✅ Auto-restore on new device login
✅ Secure (only YOU can read your data)
✅ Works offline (syncs when back online)
```

**Your live app:** https://sarathdunna.github.io/dailypanner/
