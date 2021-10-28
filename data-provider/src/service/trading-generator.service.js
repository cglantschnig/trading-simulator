// returns trading values between 0 and 20 randomly
exports.generateTradingValue = function() {
  return Math.round(Math.random() * 20 * 1000) / 1000;
}