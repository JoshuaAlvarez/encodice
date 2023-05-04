import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const userProfile = functions.https.onRequest(async (req, res) => {
  try {
    const userId = req.path.split("/")[1];
    const userDoc = await db.collection("users").doc(userId).get();

    if (!userDoc.exists) {
      res.status(404).send("User not found");
      return;
    }

    const userData = userDoc.data();
    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
