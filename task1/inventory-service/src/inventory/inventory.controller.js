require("dotenv").config();
const Router = require('@koa/router')
const invService = require('./inventory.service')

const router = new Router()

const loadLogs = async (ctx, next) => {
  invService.loadLogs(ctx.request.body, ctx.query, ctx.path);
  await next();
}

router.prefix('/inventory')
router.use(loadLogs)

router.get('/shop', async (ctx) => {
  const { shop_id } = ctx.query
  try {
    const res = await invService.getStockInShop(shop_id)
    ctx.status = 200
    ctx.body = res
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { message: err.message };
  }
})
  .get('/plu', async (ctx) => {
    const { plu_id } = ctx.query
    try {
      const res = await invService.getStockByPLU(plu_id)
      ctx.status = 200
      ctx.body = res
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = { message: err.message };
    }
  })
  .get('/inShop', async (ctx) => {
    const { shop_id, min_amount, max_amount } = ctx.query
    try {
      const res = await invService.getStockShop(shop_id, min_amount, max_amount)
      ctx.status = 200
      ctx.body = res
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = { message: err.message };
    }
  })
  .get('/inOrder', async (ctx) => {
    const { shop_id, min_amount, max_amount } = ctx.query
    try {
      const res = await invService.getStockOrder(shop_id, min_amount, max_amount)
      ctx.status = 200
      ctx.body = res
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = { message: err.message };
    }
  })
  .post('/add', async (ctx) => {
    const { plu_id, shop_id, shop_amount, order_amount } = ctx.request.body
    try {
      await invService.addProductInShop(plu_id, shop_id, shop_amount, order_amount)
      ctx.status = 201
      ctx.body = { message: 'Product success added in shop' }
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = { message: err.message };
    }
  })
  .post('/inc', async (ctx) => {
    const { plu_id, shop_id, inc_amount, name_stock } = ctx.request.body
    try {
      await invService.incStockOnName(plu_id, shop_id, inc_amount, name_stock)
      ctx.status = 201
      ctx.body = { message: 'Product success added in shop' }
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = { message: err.message };
    }
  })
  .post('/dec', async (ctx) => {
    const { plu_id, shop_id, dec_amount, name_stock } = ctx.request.body
    try {
      await invService.decStockOnName(plu_id, shop_id, dec_amount, name_stock)
      ctx.status = 201
      ctx.body = { message: 'Product success removed in shop' }
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = { message: err.message };
    }
  })


module.exports = router