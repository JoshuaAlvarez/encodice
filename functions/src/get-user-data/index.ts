import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const getUserData = functions.https.onCall(async (data, context) => {
  const userId = context.auth?.uid;
  if (!userId) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User is not authenticated."
    );
  }

  const userDoc = await db.collection("users").doc(userId).get();
  if (!userDoc.exists) {
    throw new functions.https.HttpsError(
      "not-found",
      "User not found in database."
    );
  }

  const userData = userDoc.data();
  const postVotes = userData?.postVotes || {};
  const topicSnippets = userData?.topicSnippets || {};

  return {
    postVotes,
    topicSnippets,
  };
});
