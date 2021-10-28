const Tortoise = require('tortoise')
const cron = require('node-cron')
const { generateTradingValue } = require('./service/trading-generator.service')

const RABBITMQ_CONNECTION_STRING = process.env.RABBITMQ_CONNECTION_STRING || `amqp://guest:guest@localhost:5672/`
const RABBITMQ_EXCHANGE_NAME = process.env.RABBITMQ_EXCHANGE_NAME || 'trading-exchange'
const RABBITMQ_PUBLISH_KEY = process.env.RABBITMQ_PUBLISH_KEY || 'trading-key'

const tortoise = new Tortoise(RABBITMQ_CONNECTION_STRING)

// send every minute a message with a random value in a queue
cron.schedule('* * * * *', () => {
  let payload = {
    timestamp: new Date(),
    value: generateTradingValue()
  }
  tortoise
    .exchange(RABBITMQ_EXCHANGE_NAME, 'direct', { durable:false })
    .publish(RABBITMQ_PUBLISH_KEY, payload)

  console.info('sent random trend', payload)
})

console.info('initialized data provider')