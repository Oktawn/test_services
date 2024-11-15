require("dotenv").config();
const Router = require('@koa/router')
const logsService = require('./logs.service')

const router = new Router()
router.prefix('/logs')

router.post('/write', async (ctx) => {
  const { plu_id, shop_id, action, data } = ctx.request.body
  try {
    await logsService.addLog(plu_id, shop_id, action, data)
    ctx.status = 201
    ctx.body = { message: 'Log success added' }
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { message: err.message };
  }
})
  .get('/read', async (ctx) => {
    const { shop_id, plu_id, startDate, endDate, action, page = 1, limit = 50 } = ctx.query
    try {
      const res = await logsService.getLogs(shop_id, plu_id, startDate, endDate, action, page, limit)
      ctx.status = 200
      ctx.body = res
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = { message: err.message };
    }
  })

module.exports = router