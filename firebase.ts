import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAvZoXfy1poUhnlRLPqwRjEb9soPmWdaMs",
    authDomain: "facebook-nextjs-4322c.firebaseapp.com",
    projectId: "facebook-nextjs-4322c",
    storageBucket: "facebook-nextjs-4322c.appspot.com",
    messagingSenderId: "1082139691371",
    appId: "1:1082139691371:web:cbb787f7d0c732e962e42e"
  };

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

  export const db = getFirestore(app);
  export const storage = getStorage(app);