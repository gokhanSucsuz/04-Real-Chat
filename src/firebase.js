// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyArY6I-gZNMDkAW976wiVsyLsyQdiJjnUQ",
	authDomain: "chat-1f363.firebaseapp.com",
	projectId: "chat-1f363",
	storageBucket: "chat-1f363.appspot.com",
	messagingSenderId: "1092718827694",
	appId: "1:1092718827694:web:b0eab6086790e98c71753f",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseConfig);
