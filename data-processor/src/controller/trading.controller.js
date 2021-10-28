const { getAssetValueInfos } = require("../service/asset-value.service")

exports.getAssetValueInfos = async (req, res) => {
  const result = await getAssetValueInfos()
  res.json(result)
}