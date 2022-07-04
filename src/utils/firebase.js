import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxyvUMdg_wU0qnSbRTRl7QWZ1WrBEt5UQ",
  authDomain: "triphouses-9dffc.firebaseapp.com",
  projectId: "triphouses-9dffc",
  storageBucket: "triphouses-9dffc.appspot.com",
  messagingSenderId: "603878473384",
  appId: "1:603878473384:web:c1c31c7fa7f07f725b8c9d",
};

export const initFireBase = initializeApp(firebaseConfig);
export const db = getFirestore(initFireBase);
