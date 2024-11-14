const db = require('../../connectDB.js')

/** 
* @param {number} plu_id
**/
async function getStockByPLU(plu_id) {
  try {
    const stock = await db.table('inventory')
      .join('shops', 'inventory.shop_id', '=', 'shops.shop_id')
      .join('products', 'inventory.plu_id', '=', 'products.plu_id')
      .where({ 'inventory.plu_id': plu_id })
      .select('inventory.*', 'products.name', 'shops.name as shop_name')
    if (!stock.length)
      throw new Error('product not found')
    return stock
  } catch (error) {
    error.status = 400
    error.message = error.message || 'product not found'
    throw error
  }
}

/** 
* @param {number} shop_id
**/
async function getStockInShop(shop_id) {
  try {
    const res = await db.table('inventory')
      .join('shops', 'inventory.shop_id', '=', 'shops.shop_id')
      .join('products', 'inventory.plu_id', '=', 'products.plu_id')
      .where({ 'shops.shop_id': shop_id })
      .select('inventory.*', 'products.name', 'shops.name as shop_name')
    if (!res.length)
      throw new Error('shop not found')
    return res
  } catch (error) {
    error.status = 400
    error.message = error.message || 'shop not found'
    throw error
  }
}

/**
 * @param {number} shop_id 
 * @param {number} min_amount 
 * @param {number} max_amount 
 */
async function getStockOrder(shop_id, min_amount, max_amount) {
  try {
    const res = await db.table('inventory')
      .join('shops', 'inventory.shop_id', '=', 'shops.shop_id')
      .join('products', 'inventory.plu_id', '=', 'products.plu_id')
      .where({ 'shops.shop_id': shop_id })
      .whereBetween('order_amount', [min_amount, max_amount])
      .select('inventory.*', 'products.name', 'shops.name as shop_name')
    return res
  } catch (error) {
    error.status = 400
    error.message = 'shop not found'
    throw error
  }
}

/**
 * @param {number} shop_id 
 * @param {number} min_amount 
 * @param {number} max_amount 
 */

async function getStockShop(shop_id, min_amount, max_amount) {
  try {
    const res = await db.table('inventory')
      .join('shops', 'inventory.shop_id', '=', 'shops.shop_id')
      .join('products', 'inventory.plu_id', '=', 'products.plu_id')
      .where({ 'shops.shop_id': shop_id })
      .whereBetween('shop_amount', [min_amount, max_amount])
      .select('shops.name as shop_name', 'inventory.*', 'products.name')
    return res
  } catch (error) {
    error.status = 400
    error.message = 'shop not found'
    throw error
  }
}

/**
 * @param {number} plu_id 
 * @param {number} shop_id 
 * @param {number} shop_amount 
 * @param {number} order_amount 
 */
async function addProductInShop(plu_id, shop_id, shop_amount, order_amount) {
  const newProduct = { plu_id, shop_id, shop_amount, order_amount }
  try {
    await db.table('inventory').insert(newProduct)
  } catch (error) {
    error.status = 400
    error.message = 'failed to add product'
    throw error
  }
}

/**
 * @param {number} plu_id 
 * @param {number} shop_id 
 * @param {number} inc_amount 
 * @param {string} name_stock 
 */
async function incStockOnName(plu_id, shop_id, inc_amount, name_stock) {
  try {

    if (name_stock !== 'shop_amount' && name_stock !== 'order_amount')
      throw new Error('invalid stock name');

    if (inc_amount <= 0)
      throw new Error('invalid increment amount');


    const checkProduct = await db.table('inventory').where({ plu_id, shop_id })
    if (!checkProduct.length)
      throw new Error('product not found')

    await db.table('inventory').where({ plu_id, shop_id }).increment(name_stock, inc_amount)
  } catch (error) {
    error.status = 400
    error.message = error.message || 'failed to increment stock order'
    throw error
  }
}

/**
 * @param {number} plu_id 
 * @param {number} shop_id 
 * @param {number} dec_amount 
 * @param {string} name_stock 
 */
async function decStockOnName(plu_id, shop_id, dec_amount, name_stock) {
  try {
    const checkProduct = await db.table('inventory').where({ plu_id, shop_id })
    if (!checkProduct.length)
      throw new Error('product not found');

    if (name_stock !== 'shop_amount' && name_stock !== 'order_amount')
      throw new Error('invalid stock name');

    if (dec_amount <= 0)
      throw new Error('invalid decrement amount');


    const stock = await db.table('inventory').where({ plu_id, shop_id })
    if (stock[0][name_stock] < dec_amount)
      throw new Error('not enough stock');


    await db.table('inventory').where({ plu_id, shop_id }).decrement(name_stock, dec_amount)

  } catch (error) {
    error.status = 400
    error.message = error.message || 'failed to decrement stock order'
    throw error
  }

}



module.exports = {
  getStockByPLU,
  getStockInShop,
  getStockOrder,
  getStockShop,
  addProductInShop,
  incStockOnName,
  decStockOnName
}