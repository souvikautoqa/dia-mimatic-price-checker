// const admin = require('firebase-admin');
// const serviceAccount = require("./key.json");
// admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
// const db = admin.firestore();

// module.exports = db;

const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getAuth } = require("firebase/auth");

const serviceAccount = require("./key.json");
const app = initializeApp(serviceAccount);

const db = getFirestore(app);
const auth = getAuth(app);

module.exports = { db, auth };