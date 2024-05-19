import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getDatabase, ref, get, child, update } from 'firebase/database';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { redirect } from 'react-router-dom';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();

const dbRef = ref(getDatabase());
const auth = getAuth();

export function signInFn() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function signOutFn() {
  signOut(auth).then(redirect('/')).catch(console.error);
}

export function onUserStateChanged(callback) {
  return onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await isAdminUser(user) : null;
    await callback(updatedUser);
  });
}

async function isAdminUser(user) {
  return get(child(dbRef, 'admins'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      } else {
        return user;
      }
    })
    .catch(console.error);
}

export function addNewProduct({
  image,
  category,
  name,
  price,
  size,
  colors,
  description,
}) {
  const newProduct = {
    image,
    category,
    name,
    price,
    size,
    colors,
    description,
  };

  const newProductKey = push(child(ref(db), 'products')).key;

  const updates = {};
  updates['/products' + newProductKey] = newProduct;

  return update(ref(db), updates);
}

export function getAnalyticsFn() {
  return logEvent(analytics, 'notification_received');
}
