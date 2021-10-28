const Tortoise = require('tortoise')
const prisma = require('../config/prisma')

const RABBITMQ_CONNECTION_STRING = process.env.RABBITMQ_CONNECTION_STRING || `amqp://guest:guest@localhost:5672/`
const RABBITMQ_EXCHANGE_NAME = process.env.RABBITMQ_EXCHANGE_NAME || 'trading-exchange'
const RABBITMQ_PUBLISH_KEY = process.env.RABBITMQ_PUBLISH_KEY || 'trading-key'
const RABBITMQ_QUEUE_NAME = 'trading-queue'

const tortoise = new Tortoise(RABBITMQ_CONNECTION_STRING)

console.info('listening for new trending data')

tortoise
  .queue(RABBITMQ_QUEUE_NAME, { durable: false })
  .exchange(RABBITMQ_EXCHANGE_NAME, 'direct', RABBITMQ_PUBLISH_KEY, { durable: false })
  .prefetch(1)
  .subscribe(async (msg, ack, nack) => {
    console.info('received payload from trending data', msg)
    try {
      const { timestamp, value } = JSON.parse(msg)
      await prisma.assetValue.create({
        data: {
          timestamp,
          value
        }
      })
      ack() // or nack()
    } catch(e) {
      nack()
    }
  })
