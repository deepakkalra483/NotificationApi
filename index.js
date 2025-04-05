const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const orderRoutes = require("./src/routes/OrderRoutes");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/orders", orderRoutes);

app.get('/ping', (req, res) => {
  res.status(200).send('Server is alive!');
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
