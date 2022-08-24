const express = require("express");
const customers = require("./models/customer");
const customerController = require("./controllers/customerController");
const app = express();
app.use(customerController);

module.exports = app;
