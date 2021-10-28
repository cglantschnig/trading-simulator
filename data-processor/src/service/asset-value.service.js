const prisma = require('../config/prisma')

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

function getDaysInCurrentMonth() {
  // instantiate a date object
  const dt = new Date()

  // dt.getMonth() will return a month between 0 - 11
  // we add one to get to the last day of the month 
  // so that when getDate() is called it will return the last day of the month
  const month = dt.getMonth() + 1
  const year = dt.getFullYear()
 
  // this line does the magic (in collab with the lines above)
  return new Date(year, month, 0).getDate()
}

function getDaysInYear() {
  const isLeap = year => new Date(year, 1, 29).getDate() === 29
  return isLeap ? 366 : 365
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