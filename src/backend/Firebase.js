import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDAWDhCbyaOJp_rvWeWqi1oqLwrIAWFsQo",
    authDomain: "realtime-chat-82224.firebaseapp.com",
    projectId: "realtime-chat-82224",
    storageBucket: "realtime-chat-82224.appspot.com",
    messagingSenderId: "124068082357",
    appId: "1:124068082357:web:d0f260e681b959d32e44fc",
  };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { db, auth, provider, storage };
