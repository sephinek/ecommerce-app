import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getDatabase, ref, get, set, child } from 'firebase/database';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

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

const db = getDatabase();
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

export async function addNewProduct(product, imageUrl) {
  const { category, name, price, size, colors, description } = product;
  const productId = uuidv4();

  return set(ref(db, 'products/' + productId), {
    id: productId,
    category,
    name,
    price: parseInt(price),
    size: size.split(','),
    colors: colors.split(','),
    description,
    image: imageUrl,
  });
}

export async function getAllProducts() {
  return get(child(dbRef, 'products'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getAnalyticsFn() {
  return logEvent(analytics, 'notification_received');
}
