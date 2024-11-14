/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('shop').del()
  await knex('shop').insert([
    { id: 1, name: 'Магнит' },
    { id: 2, name: 'Пятёрочка' },
    { id: 3, name: 'Перекрёсток' },
    { id: 4, name: 'Лента' },
    { id: 5, name: 'Дикси' },
    { id: 6, name: 'Ашан' },
    { id: 7, name: 'О`КЕЙ' },
    { id: 8, name: 'МЕТРО' },
    { id: 9, name: 'ВкусВилл' },
    { id: 10, name: 'Глобус' }
  ]);
};
