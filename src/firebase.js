// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyBxKQZ4mXnBpFzrHdDCN1KSvm-rhq431JU",
	authDomain: "chat-a06fd.firebaseapp.com",
	projectId: "chat-a06fd",
	storageBucket: "chat-a06fd.appspot.com",
	messagingSenderId: "223580469000",
	appId: "1:223580469000:web:fcde2d142e691228245ebd",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
