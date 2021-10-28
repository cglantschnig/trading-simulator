const express = require('express')
const { addAsync } = require('@awaitjs/express')
const helmet = require('helmet')
const cors = require('cors')
const { version } = require('../package.json')
const { getAssetValueInfos } = require('./controller/trading.controller')

// initialize background jobs/listeners
require('./listener/trading-data.listener')

const app = addAsync(express())
const port = process.env.PORT || 8080

// used for health check
app.get('/', (req, res) => {
  res.send(`Data Processor API v${version}`)
})

app.use(helmet()) // https://helmetjs.github.io/
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.getAsync('/api/v1/asset-values/info', getAssetValueInfos)

app.listen(port, () => {
  console.info(`application listening at port ${port}`)
})