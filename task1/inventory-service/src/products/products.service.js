const db = require('../../connectDB.js')


/** 
 * @param {number} plu_id 
 * @param {string} name 
 * **/
async function addProduct(plu_id, name) {
  const prod = { plu_id, name }
  try {
    await db.table('products').insert(prod)
  } catch (e) {
    e.status = 400
    throw e
  }
}

/** 
 * @param {number} plu_id 
 **/
async function getProductsByPLU(plu_id) {
  try {
    const res = await db.table('products').where({ plu_id })
    return res
  } catch (error) {
    error.status = 400
    error.message = 'the product was not found by plu'
    throw error
  }
}

/** 
 * @param {string} name 
 **/
async function getProductsByName(name) {
  try {
    const res = await db.table('products').where({ name: name })
    return res
  } catch (error) {
    error.status = 400
    error.message = 'the product was not found by name'
    throw error
  }
}



module.exports = {
  addProduct,
  getProductsByPLU,
  getProductsByName
}