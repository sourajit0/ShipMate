import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDjnUOTqdQoaVlmCf2l_PREN5aAXztCOog",
  authDomain: "abcd-93fe8.firebaseapp.com",
  projectId: "abcd-93fe8",
  storageBucket: "abcd-93fe8.appspot.com",
  messagingSenderId: "374974428176",
  appId: "1:374974428176:web:c45c55d4f93ac1d2b9c695"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
