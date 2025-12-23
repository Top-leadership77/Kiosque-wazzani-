// ===== Firebase Config =====
const firebaseConfig = {
  apiKey: "AIzaSyAJxzFknapSh0fnPfIXwEEK3OijSKlqxco",
  authDomain: "kiosque-wazzani.firebaseapp.com",
  projectId: "kiosque-wazzani",
  storageBucket: "kiosque-wazzani.appspot.com",
  messagingSenderId: "76505742154",
  appId: "1:76505742154:web:dc4f190f9f2de80acb1fb3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
