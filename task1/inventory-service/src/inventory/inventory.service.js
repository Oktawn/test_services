const db = require('../../connectDB.js')
const axios = require('axios')

const portLog = process.env.LOGGER_PORT
const pathLog = `http://localhost:${portLog}/logs/write`

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

async function loadLogs(body, query, path) {
  let action, data
  if (body) {
    console.log('this body')
    const { plu_id, shop_id, shop_amount, order_amount,
      inc_amount, dec_amount, name_stock } = body

    if (name_stock === 'shop_amount' || name_stock === 'order_amount') {
      action = 'updated'
      data = {
        "plu_id": plu_id,
        "shop_id": shop_id,
        "diff_amount": `+${inc_amount}` || `-${dec_amount}`,
        "name_stock": name_stock
      }
    }
    else {
      action = 'added'
      data = {
        "plu_id": plu_id,
        "shop_id": shop_id,
        "shop_amount": shop_amount,
        "order_amount": order_amount
      }


    }
    const jsonData = JSON.stringify({ plu_id, shop_id, action, data })
    axios.post(pathLog, jsonData, { headers: { 'Content-Type': 'application/json' } })
      .catch(err => console.log(err))
  }
  else if (query) {
    action = "get"
    const { plu_id, shop_id, min_amount, max_amount } = query
    if (shop_id) {
      if (min_amount && max_amount) {
        data = {
          "where": path,
          "shop_id": shop_id,
          "min_amount": min_amount,
          "max_amount": max_amount
        }
      }
      else {
        data = {
          "where": path,
          "shop_id": shop_id
        }
      }
    }
    else if (plu_id) {
      data = {
        "where": path,
        "plu_id": plu_id
      }
    }
    const jsonData = JSON.stringify({ plu_id, shop_id, action, data })
    axios.post(pathLog, jsonData, { headers: { 'Content-Type': 'application/json' } })
      .catch(err => console.log(err))
  }
}



module.exports = {
  getStockByPLU,
  getStockInShop,
  getStockOrder,
  getStockShop,
  addProductInShop,
  incStockOnName,
  decStockOnName,
  loadLogs
}