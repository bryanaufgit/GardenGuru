import admin from "firebase-admin";

// Standard: von /src/lib/ zwei Ebenen hoch ins Backend-Root:
const serviceAccount = require("../../serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;