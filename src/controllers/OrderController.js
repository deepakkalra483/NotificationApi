const admin = require("../config/firebase");

const placeOrder = async (req, res) => {
  const { tokens, orderDetails } = req.body;
  console.log("tokens--", tokens);
  if (!tokens || tokens?.length == 0) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }
  try {
    const notificationPayload = {
      notification: {
        title: "New Order Placed",
        body: `Order # has been placed for Table #.`,
      },
      data: {
        tableNumber: `${orderDetails?.table}`,
      },
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

module.exports = { placeOrder };
