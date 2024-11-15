const db = require('../../connectDB.js')

async function addLog(plu_id, shop_id, action, data) {
  try {
    const newLog = { plu_id, shop_id, action, data }
    await db.table('logs').insert(newLog)
  } catch (error) {
    error.status = 400
    error.message = 'failed to add log'
    throw error
  }
}

async function getLogs(shop_id, plu_id, startDate, endDate, action, page, limit) {
  console.log(shop_id, plu_id, startDate, endDate, action, page, limit)
  try {
    const res = db.table('logs')
    if (shop_id) res.where({ shop_id })
    if (plu_id) res.where({ plu_id })
    if (action) res.where({ action })
    if (startDate && endDate) res.whereBetween('created_at', [startDate, endDate])
    if (startDate && !endDate) res.where('created_at', '>', startDate)
    if (!startDate && endDate) res.where('created_at', '<', endDate)

    res.orderBy('created_at', 'asc')
    res.offset((page - 1) * limit)
    res.limit(limit)

    const ans = await res;
    return ans;
  } catch (error) {
    error.status = 400
    error.message = 'failed to get logs'
    throw error
  }
}

module.exports = {
  addLog,
  getLogs
}