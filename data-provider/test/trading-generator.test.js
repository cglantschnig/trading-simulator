const { generateTradingValue } = require("../src/service/trading-generator.service")

test('trading value should be between 0 and 20', () => {
  for (let i = 0; i < 100; i++) {
    const value = generateTradingValue()
    expect(value >= 0 && value <= 20)
  }
})