const Router = require('@koa/router')
const prodService = require('./products.service')
const router = new Router()


router.prefix('/product')

router.post('/', async (ctx) => {
  const { plu_id, name } = ctx.request.body
  try {
    await prodService.addProduct(plu_id, name)
    ctx.status = 201
    ctx.body = { message: 'Product created successfully' }
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { message: err.message };
  }
})
  .get('/name', async (ctx) => {
    const { name } = ctx.query
    try {
      const res = await prodService.getProductsByName(name.trim())
      ctx.status = 200
      ctx.body = res
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = { message: err.message };
    }
  })
  .get('/:plu_id', async (ctx) => {
    const { plu_id } = ctx.params
    try {
      const res = await prodService.getProductsByPLU(plu_id.trim())
      ctx.status = 200
      ctx.body = res
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = { message: err.message };
    }
  })


module.exports = router