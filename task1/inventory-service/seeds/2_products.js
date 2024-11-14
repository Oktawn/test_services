/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('products').del()
  await knex('products').insert([
    { plu_id: 1, name: 'Молоко 3,2%' },
    { plu_id: 2, name: 'Хлеб белый' },
    { plu_id: 3, name: 'Яблоки Голден' },
    { plu_id: 4, name: 'Курица охлажденная' },
    { plu_id: 5, name: 'Сыр Российский' },
    { plu_id: 6, name: 'Макароны' },
    { plu_id: 7, name: 'Помидоры' },
    { plu_id: 8, name: 'Огурцы' },
    { plu_id: 9, name: 'Картофель' },
    { plu_id: 10, name: 'Бананы' },
    { plu_id: 11, name: 'Чай черный' },
    { plu_id: 12, name: 'Кофе зерновой' },
    { plu_id: 13, name: 'Сахар' },
    { plu_id: 14, name: 'Масло подсолнечное' },
    { plu_id: 15, name: 'Яйца куриные' },
    { plu_id: 16, name: 'Морковь' },
    { plu_id: 17, name: 'Гречневая крупа' },
    { plu_id: 18, name: 'Рис' },
    { plu_id: 19, name: 'Колбаса вареная' },
    { plu_id: 20, name: 'Печенье' }
  ]);
};
