const Router = require('@koa/router')
const invService = require('./inventory.service')

const router = new Router()

router.prefix('/inventory')

router.get('/shopId/:shop_id', async (ctx) => {
  const { shop_id } = ctx.params
  try {
    const res = await invService.getStockInShop(shop_id)
    ctx.status = 200
    ctx.body = res
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { message: err.message };
  }
})
  .get('/plu/:plu_id', async (ctx) => {
    const { plu_id } = ctx.params
    try {
      const res = await invService.getStockByPLU(plu_id)
      ctx.status = 200
      ctx.body = res
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = { message: err.message };
    }
  })

module.exports = router