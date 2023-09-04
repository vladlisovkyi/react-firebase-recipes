import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCvji3pEpU-jk0xfHF4JvbILj7aizfNu5k",
  authDomain: "reci-8a6fc.firebaseapp.com",
  projectId: "reci-8a6fc",
  storageBucket: "reci-8a6fc.appspot.com",
  messagingSenderId: "455840600393",
  appId: "1:455840600393:web:80f6255df02c22c6824a98",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
