const prisma = require('../config/prisma')
const { getDaysInCurrentMonth, getDaysInYear } = require('../util/date-helper.util')

async function averageOverXDays(days) {
  const includeDate = new Date()
  includeDate.setDate(includeDate.getDate() - days)
  const result = await prisma.$queryRawUnsafe(`
      SELECT avg(value) 
      FROM "AssetValue"
      WHERE timestamp > '${includeDate.toISOString()}'
  `)
  return result[0].avg
}

exports.getAssetValueInfos = async () => {
  const avgDay = await averageOverXDays(1)
  const avgMonth = await averageOverXDays(getDaysInCurrentMonth())
  const avgYear = await averageOverXDays(getDaysInYear())

  const lastHour = new Date()
  lastHour.setHours(lastHour.getHours() - 1)

  const latestValues = await prisma.assetValue.findMany({
    where: {
      timestamp: {
        gt: lastHour 
      }
    },
    orderBy: [
      {
        timestamp: 'asc'
      }
    ]
  })

  return {
    avgDay,
    avgMonth,
    avgYear,
    latestValues: latestValues.map(({timestamp, value}) => ({
      timestamp,
      value
    }))
  }
}