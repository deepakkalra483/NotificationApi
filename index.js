const express = require("express");
require('dotenv').config();
const admin = require("./src/firebase"); // Import Firebase Admin
const app = express();
const port = 3000;

// Parse incoming JSON requests
app.use(express.json());

// Send Push Notification API
app.post("/send-notification", async (req, res) => {
  const { token, title, message } = req.body;

  if (!token || !title || !message) {
    return res.status(400).send("Token, title, and message are required.");
  }

  try {
    // Prepare the message for FCM
    const notificationMessage = {
      notification: {
        title: title,
        body: message,
      },
      token: token, // The recipient device's token
    };

    // Send the message
    const response = await admin.messaging().send(notificationMessage);

    // Send success response
    return res.status(200).send({ success: true, messageId: response });
  } catch (error) {
    // Handle errors
    console.error("Error sending notification:", error);
    return res.status(500).send({ success: false, error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
