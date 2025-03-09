const admin = require("../config/firebase");

const placeOrder = async (req, res) => {
  const { tokens, orderDetails } = req.body;
  // console.log("tokens--", orderDetails);
  if (!tokens || tokens?.length == 0) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }
  try {
    const message = {
      to: "deM-lu3nQcuKOuntT7tX8F:APA91bHHt1nDYByQL77WyERceyNBfixNRdOxzZrISOhN-UlsVpF4ekO003400QxvZu6ll3DUs0Hyshpje5yNw5dhUb8XSyIbpvPkbwA4HO3ii3wop2T08gs",
      priority: "high",
      content_available: true,
      data: {
        title: "Wake Up!",
        body: "Open the full-screen activity",
        force_open: true,
      },
    };
    const notificationPayload = {
      // notification: {
      //   title: "New Order Placed",
      //   body: `Order # has been placed for Table #.`,
      // },
      data: orderDetails,
      tokens: tokens,
    };

    const response = await admin
      .messaging()
      .sendEachForMulticast(notificationPayload);
    res.status(200).json({ success: true, messageId: response });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }

  // Send push notification
};

const orderReady = async (req, res) => {
  const { token } = req?.body;
  if (!token || token == "") {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }
  try {
    const notificationPayload = {
      notification: {
        title: "Your Order is Ready!",
        body: `Please pick your order`,
      },
      token: token,
    };
    const response = await admin.messaging().send(notificationPayload);
    res.status(200).json({ success: true, messageId: response });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

module.exports = { placeOrder, orderReady };
