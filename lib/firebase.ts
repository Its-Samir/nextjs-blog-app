import { type FirebaseOptions, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: "nextjs-app-543cf.firebaseapp.com",
	projectId: "nextjs-app-543cf",
	storageBucket: "nextjs-app-543cf.appspot.com",
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: "G-WL2JBNB6JB",
} satisfies FirebaseOptions;

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
