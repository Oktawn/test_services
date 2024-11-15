/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('shops').del()
  await knex('shops').insert([
    { shop_id: 1, name: 'Магнит' },
    { shop_id: 2, name: 'Пятёрочка' },
    { shop_id: 3, name: 'Перекрёсток' },
    { shop_id: 4, name: 'Лента' },
    { shop_id: 5, name: 'Дикси' },
    { shop_id: 6, name: 'Ашан' },
    { shop_id: 7, name: 'О`КЕЙ' },
    { shop_id: 8, name: 'МЕТРО' },
    { shop_id: 9, name: 'ВкусВилл' },
    { shop_id: 10, name: 'Глобус' }
  ]);
};
