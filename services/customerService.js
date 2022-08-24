const customers = require("../models/customer");
const orders = require("../models/order");
const _ = require("lodash");
const { uniqBy } = require("lodash");
const { report } = require("../app");

function sortArray(arr) {
  return _.uniq(arr.sort());
}
function convertToDate(dateString) {
  24 - 04 - 2022;
  var date = dateString.trim().split("-");
  return new Date(Number(date[2]), Number(date[1]) - 1, Number(date[0]));
}
function weekWiseSales() {
  var o = [];
  var sortByDates = _.sortBy(orders, (order) => {
    return convertToDate(order.OrderDate);
  });
  var ordersDates = uniqBy(sortByDates, "OrderDate");
  for (const order of ordersDates) {
    o.push(order.OrderDate);
  }
  return o;
}
function custTotalSpends() {
  const report = [];
  for (const customer of customers) {
    var totalOrderValue = getTotalOrderValue(customer.CustomerID);
    data = {
      customerId: customer.CustomerID,
      address: customer.Address,
      totalOrderValue: totalOrderValue,
    };
    report.push(data);
  }
  return report;
}
function getTotalOrderValue(customerID) {
  var totalOrderValue = 0;
  orders.forEach((val) => {
    if (val.CustomerID === customerID) {
      totalOrderValue += Number(val.OrderAmount);
    }
  });
  return totalOrderValue;
}
function dateWithHighBuiss() {
  var report = [];
  var o = [];
  var sortByDates = _.sortBy(orders, (order) => {
    return convertToDate(order.OrderDate);
  });
  var ordersDates = uniqBy(sortByDates, "OrderDate");
  for (const order of ordersDates) {
    o.push(order.OrderDate);
  }
  o.forEach((val) => {
    var sum = _.reduce(
      orders,
      (sum, value, key) => {
        return value.OrderDate === val ? sum + Number(value.OrderAmount) : sum;
      },
      0
    );
    report.push({ date: val, spends: sum });
  });
  dateWithHighBuissReport = _.maxBy(report, (o) => {
    return o.spends;
  });
  return dateWithHighBuissReport;
}
function lowestWholeSale() {
  wholeSaleOrders = _.filter(orders, (o) => {
    return o.TypeOfOrder === "Wholesale";
  });
  // add = _.uniqBy(wholeSaleOrders);
  return add;
}
function highestRetail() {}
module.exports = {
  weekWiseSales,
  custTotalSpends,
  dateWithHighBuiss,
  lowestWholeSale,
  highestRetail,
};
