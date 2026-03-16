/* =============================================
   FIREBASE-CONFIG.JS
   Replace YOUR_* values with your Firebase project details.
   Instructions in SETUP_GUIDE.md
   ============================================= */

import { initializeApp }        from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut }
                                 from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, onSnapshot, collection, deleteDoc }
                                 from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ── YOUR FIREBASE CONFIG ──
// Get this from: Firebase Console → Your Project → Project Settings → Your Apps → Config
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

// ── SYNC ENGINE ──
// All user data is stored in Firestore under: users/{uid}/data/{key}
// This mirrors localStorage so the rest of the app doesn't need to change.

const SYNC = {

  uid: null,
  _unsubscribe: null,

  /* Called once user is confirmed logged in */
  async init(uid) {
    this.uid = uid;

    // 1) Pull all cloud data → merge into localStorage
    await this.pullAll();

    // 2) Listen to real-time changes from cloud → update localStorage
    this._listenCloud();

    console.log('🔄 Sync ready for', uid);
  },

  /* Save one key to Firestore */
  async save(key, value) {
    if (!this.uid) return;
    try {
      await setDoc(doc(db, 'users', this.uid, 'data', _safeKey(key)), {
        value: JSON.stringify(value),
        updatedAt: Date.now()
      });
    } catch(e) {
      console.warn('Sync save failed for', key, e);
    }
  },

  /* Pull all data for this user from Firestore → merge into localStorage */
  async pullAll() {
    if (!this.uid) return;
    try {
      const snap = await getDoc(doc(db, 'users', this.uid, 'meta', 'keys'));
      if (!snap.exists()) return; // New user — nothing to pull

      const keys = snap.data().keys || [];
      for (const key of keys) {
        const d = await getDoc(doc(db, 'users', this.uid, 'data', _safeKey(key)));
        if (d.exists()) {
          const local = localStorage.getItem(key);
          const cloud = d.data();
          // Cloud wins if newer OR if local is missing
          if (!local || cloud.updatedAt > (JSON.parse(local).__ts || 0)) {
            localStorage.setItem(key, cloud.value);
          }
        }
      }
      console.log('✅ Pulled', keys.length, 'keys from cloud');
    } catch(e) {
      console.warn('Pull failed', e);
    }
  },

  /* Real-time listener: cloud changes → localStorage */
  _listenCloud() {
    if (this._unsubscribe) this._unsubscribe();
    const colRef = collection(db, 'users', this.uid, 'data');
    this._unsubscribe = onSnapshot(colRef, snap => {
      snap.docChanges().forEach(change => {
        if (change.type === 'modified' || change.type === 'added') {
          const d = change.doc.data();
          const origKey = _origKey(change.doc.id);
          if (origKey && d.value) {
            localStorage.setItem(origKey, d.value);
          }
        }
      });
    }, err => console.warn('Listener error', err));
  },

  /* Delete all cloud data for this user (used on logout) */
  async deleteAll() {
    if (!this.uid) return;
    if (this._unsubscribe) this._unsubscribe();
    console.log('Cloud listener stopped');
  },

  stop() {
    if (this._unsubscribe) this._unsubscribe();
  }
};

/* Firestore doc IDs cannot have '/' so encode keys */
function _safeKey(k) { return k.replace(/\//g,'__').replace(/\./g,'_DOT_'); }
function _origKey(k) { return k.replace(/__/g,'/').replace(/_DOT_/g,'.'); }

// ── AUTH GUARD ──
// Check if user is logged in. If not → redirect to login.html
onAuthStateChanged(auth, async user => {
  if (!user) {
    // Not logged in → go to login page
    if (!window.location.pathname.endsWith('login.html')) {
      window.location.href = 'login.html';
    }
    return;
  }

  // Logged in: store user info and init sync
  const userData = {
    uid: user.uid,
    phone: user.phoneNumber,
    displayName: user.phoneNumber
  };
  localStorage.setItem('nt_user', JSON.stringify(userData));
  window._currentUser = userData;
  window._SYNC = SYNC;
  window._fbAuth = auth;
  window._fbSignOut = signOut;

  await SYNC.init(user.uid);

  // Patch localStorage.setItem so every write also syncs to cloud
  const _origSet = localStorage.setItem.bind(localStorage);
  localStorage.setItem = function(key, value) {
    _origSet(key, value);
    if (key.startsWith('nt_') || key.startsWith('sync_') || key.startsWith('cal_') || key.startsWith('health_') || key.startsWith('today_')) {
      SYNC.save(key, value);
      _trackKey(key);
    }
  };

  console.log('👤 Logged in:', user.phoneNumber);
});

/* Track all keys we've ever written so pullAll knows what to fetch */
async function _trackKey(key) {
  if (!SYNC.uid) return;
  try {
    const ref = doc(db, 'users', SYNC.uid, 'meta', 'keys');
    const snap = await getDoc(ref);
    const keys = snap.exists() ? (snap.data().keys || []) : [];
    if (!keys.includes(key)) {
      keys.push(key);
      await setDoc(ref, { keys, updatedAt: Date.now() });
    }
  } catch(e) {}
}

export { auth, db, SYNC };
