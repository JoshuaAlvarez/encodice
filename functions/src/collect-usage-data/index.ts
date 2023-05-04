import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const collectUsageData = functions.https.onRequest(async (req, res) => {
  try {
    const { userId, action } = req.body;

    const timestamp = admin.firestore.Timestamp.now();

    const usageData = {
      userId,
      action,
      timestamp,
    };

    await admin.firestore().collection('usage').add(usageData);

    res.status(200).send('Usage data collected successfully.');
  } catch (error) {
    console.error('Error collecting usage data:', error);

    res.status(500).send('Error collecting usage data.');
  }
});
