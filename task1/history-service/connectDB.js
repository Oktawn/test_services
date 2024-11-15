const knex = require('knex')
const knexCfg = require('./knexfile.js')

const db = knex(knexCfg.development)

module.exports = db