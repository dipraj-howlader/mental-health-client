import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAQhbKjSvAgQmi-zkwH80lFKN5v9eGI-QI",
  authDomain: "mental-health-app-e08d2.firebaseapp.com",
  projectId: "mental-health-app-e08d2",
  storageBucket: "mental-health-app-e08d2.appspot.com",
  messagingSenderId: "199670375951",
  appId: "1:199670375951:web:2e467d9c38a1059c77257a"
};

const app = initializeApp(firebaseConfig);

export { app };
