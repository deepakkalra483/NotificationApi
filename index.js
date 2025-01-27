const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const orderRoutes = require("./src/routes/OrderRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/orders", orderRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
