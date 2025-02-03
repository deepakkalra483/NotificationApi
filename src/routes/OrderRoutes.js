const express = require("express");
const { placeOrder, orderReady } = require("../controllers/OrderController");
const router = express.Router();

router.post("/placeOrder", placeOrder);
router.post("/orderReady", orderReady);

module.exports = router;
