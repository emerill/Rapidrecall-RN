import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "rapidrecall-rn.firebaseapp.com",
  projectId: "rapidrecall-rn",
  storageBucket: "rapidrecall-rn.firebasestorage.app",
  messagingSenderId: "600769406591",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);