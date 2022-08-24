const express = require("express");
const customers = require("../models/customer");
const orders = require("../models/order");
const custService = require("../services/customerService");
const router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.get("/customers", (req, res) => {
  res.setHeader("Content-Type", "text/json");
  res.send(customers);
});
router.get("/orders", (req, res) => {
  res.setHeader("Content-Type", "text/json");
  res.send(orders);
});
router.get("/week-wise-sales", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.send(custService.weekWiseSales());
});
router.get("/cust-total-spends", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.send(custService.custTotalSpends());
});

router.get("/date-with-highbuiss", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.send(custService.dateWithHighBuiss());
});
router.get("/city-low-wholesale", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.send(custService.lowestWholeSale());
});
router.post("/cust", (req, res) => {
  var body = req.body;
  res.send(body);
});
router.get("/", (req, res) => {
  res.send("<h1>Hiii</h1>");
});

module.exports = router;
