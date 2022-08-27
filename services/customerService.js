const customers = require("../models/customer");
const orders = require("../models/order");
const _ = require("lodash");

function convertToDate(dateString) {
  var date = dateString.trim().split("-");
  return new Date(Number(date[2]), Number(date[1]) - 1, Number(date[0]));
}
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return [d.getUTCFullYear(), weekNo];
}
function weekWiseSales() {
  var o = [];
  var sortByDates = _.sortBy(orders, (order) => {
    return convertToDate(order.OrderDate);
  });
  var ordersDates = _.uniqBy(sortByDates, "OrderDate");
  for (const order of ordersDates) {
    var weekArray = getWeekNumber(convertToDate(order.OrderDate));
    o.push({
      year: convertToDate(order.OrderDate).getFullYear(),
      weekNo: weekArray[1],
      dateString: order.OrderDate,
      date: convertToDate(order.OrderDate),
      orderAmount: order.OrderAmount,
      month: convertToDate(order.OrderDate).getMonth() + 1,
    });
    var finalReport = [];
    o.forEach((val, index) => {
      var weekSum = _.reduce(
        o,
        (sum, value, key) => {
          return val.year === value.year && val.weekNo === value.weekNo
            ? Number(value.orderAmount)
            : sum;
        },
        0
      );
      finalReport.push({
        year: val.year,
        month: val.month,
        weekNoPerYear: val.weekNo,
        weekSales: weekSum,
      });
    });
  }
  finalReport = _.uniqWith(finalReport, _.isEqual);
  return finalReport;
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
  const report = [];
  const cities = [];
  wholeSaleOrders.forEach((order) => {
    customers.forEach((customer) => {
      if (order.CustomerID === customer.CustomerID) {
        data = {
          orderAmount: order.OrderAmount,
          city: customer.City,
        };
        cities.push(customer.City);
        report.push(data);
      }
    });
  });
  const citiess = _.uniq(cities);
  var finalReport = [];
  citiess.forEach((city) => {
    amountSum = 0;
    report.forEach((val) => {
      if (city === val.city) {
        amountSum += Number(val.orderAmount);
      }
    });
    finalReport.push({
      city,
      amountSum,
    });
  });
  cityWithLowestWholeSale = _.minBy(finalReport, (rep) => {
    return rep.amountSum;
  });
  return cityWithLowestWholeSale.city;
}
function highestRetail() {
  retailOrders = _.filter(orders, (o) => {
    return o.TypeOfOrder === "Retail";
  });
  const report = [];
  const cities = [];
  retailOrders.forEach((order) => {
    customers.forEach((customer) => {
      if (order.CustomerID === customer.CustomerID) {
        data = {
          orderAmount: order.OrderAmount,
          city: customer.City,
        };
        cities.push(customer.City);
        report.push(data);
      }
    });
  });
  const citiess = _.uniq(cities);
  var finalReport = [];
  citiess.forEach((city) => {
    amountSum = 0;
    report.forEach((val) => {
      if (city === val.city) {
        amountSum += Number(val.orderAmount);
      }
    });
    finalReport.push({
      city,
      amountSum,
    });
  });
  cityWithHigestRetail = _.maxBy(finalReport, (rep) => {
    return rep.amountSum;
  });
  return cityWithHigestRetail.city;
}

module.exports = {
  weekWiseSales,
  custTotalSpends,
  dateWithHighBuiss,
  lowestWholeSale,
  highestRetail,
};
