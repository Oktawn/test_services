/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('inventory', (table) => {
    table.increments('id').primary()
    table.integer('plu_id').notNullable()
    table.integer('shop_id').notNullable()
    table.integer('shop_amount').notNullable()
    table.integer('order_amount').notNullable()

    table.foreign('plu_id').references('plu_id').inTable('products')
    table.foreign('shop_id').references('shop_id').inTable('shops')

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('inventory');
};
