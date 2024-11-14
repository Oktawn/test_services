/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('inventory').del()
  await knex('inventory').insert([
    // Магнит (id: 1)
    { plu_id: 1, shop_id: 1, shop_amount: 45, order_amount: 15 },
    { plu_id: 2, shop_id: 1, shop_amount: 80, order_amount: 30 },
    { plu_id: 5, shop_id: 1, shop_amount: 25, order_amount: 10 },
    { plu_id: 7, shop_id: 1, shop_amount: 60, order_amount: 20 },
    { plu_id: 10, shop_id: 1, shop_amount: 70, order_amount: 25 },
    { plu_id: 15, shop_id: 1, shop_amount: 100, order_amount: 40 },
    { plu_id: 18, shop_id: 1, shop_amount: 35, order_amount: 15 },
    { plu_id: 20, shop_id: 1, shop_amount: 55, order_amount: 20 },

    // Пятёрочка (id: 2)
    { plu_id: 2, shop_id: 2, shop_amount: 65, order_amount: 25 },
    { plu_id: 4, shop_id: 2, shop_amount: 40, order_amount: 15 },
    { plu_id: 6, shop_id: 2, shop_amount: 90, order_amount: 30 },
    { plu_id: 8, shop_id: 2, shop_amount: 45, order_amount: 15 },
    { plu_id: 12, shop_id: 2, shop_amount: 30, order_amount: 10 },
    { plu_id: 14, shop_id: 2, shop_amount: 50, order_amount: 20 },
    { plu_id: 16, shop_id: 2, shop_amount: 75, order_amount: 25 },
    { plu_id: 19, shop_id: 2, shop_amount: 40, order_amount: 15 },

    // Перекрёсток (id: 3)
    { plu_id: 1, shop_id: 3, shop_amount: 55, order_amount: 20 },
    { plu_id: 3, shop_id: 3, shop_amount: 70, order_amount: 25 },
    { plu_id: 7, shop_id: 3, shop_amount: 45, order_amount: 15 },
    { plu_id: 9, shop_id: 3, shop_amount: 85, order_amount: 30 },
    { plu_id: 11, shop_id: 3, shop_amount: 40, order_amount: 15 },
    { plu_id: 15, shop_id: 3, shop_amount: 60, order_amount: 20 },
    { plu_id: 17, shop_id: 3, shop_amount: 50, order_amount: 20 },
    { plu_id: 20, shop_id: 3, shop_amount: 35, order_amount: 10 },

    // Лента (id: 4)
    { plu_id: 2, shop_id: 4, shop_amount: 95, order_amount: 35 },
    { plu_id: 5, shop_id: 4, shop_amount: 50, order_amount: 20 },
    { plu_id: 8, shop_id: 4, shop_amount: 65, order_amount: 25 },
    { plu_id: 10, shop_id: 4, shop_amount: 80, order_amount: 30 },
    { plu_id: 13, shop_id: 4, shop_amount: 45, order_amount: 15 },
    { plu_id: 16, shop_id: 4, shop_amount: 70, order_amount: 25 },
    { plu_id: 18, shop_id: 4, shop_amount: 55, order_amount: 20 },
    { plu_id: 19, shop_id: 4, shop_amount: 40, order_amount: 15 },

    // Дикси (id: 5)
    { plu_id: 1, shop_id: 5, shop_amount: 40, order_amount: 15 },
    { plu_id: 4, shop_id: 5, shop_amount: 55, order_amount: 20 },
    { plu_id: 7, shop_id: 5, shop_amount: 35, order_amount: 10 },
    { plu_id: 11, shop_id: 5, shop_amount: 60, order_amount: 20 },
    { plu_id: 14, shop_id: 5, shop_amount: 45, order_amount: 15 },
    { plu_id: 17, shop_id: 5, shop_amount: 70, order_amount: 25 },
    { plu_id: 19, shop_id: 5, shop_amount: 50, order_amount: 20 },
    { plu_id: 20, shop_id: 5, shop_amount: 65, order_amount: 25 },

    // Ашан (id: 6)
    { plu_id: 3, shop_id: 6, shop_amount: 85, order_amount: 30 },
    { plu_id: 6, shop_id: 6, shop_amount: 100, order_amount: 40 },
    { plu_id: 9, shop_id: 6, shop_amount: 75, order_amount: 25 },
    { plu_id: 12, shop_id: 6, shop_amount: 60, order_amount: 20 },
    { plu_id: 15, shop_id: 6, shop_amount: 90, order_amount: 35 },
    { plu_id: 16, shop_id: 6, shop_amount: 45, order_amount: 15 },
    { plu_id: 18, shop_id: 6, shop_amount: 70, order_amount: 25 },
    { plu_id: 20, shop_id: 6, shop_amount: 55, order_amount: 20 },

    // О'КЕЙ (id: 7)
    { plu_id: 2, shop_id: 7, shop_amount: 70, order_amount: 25 },
    { plu_id: 5, shop_id: 7, shop_amount: 45, order_amount: 15 },
    { plu_id: 8, shop_id: 7, shop_amount: 60, order_amount: 20 },
    { plu_id: 10, shop_id: 7, shop_amount: 85, order_amount: 30 },
    { plu_id: 13, shop_id: 7, shop_amount: 50, order_amount: 20 },
    { plu_id: 15, shop_id: 7, shop_amount: 75, order_amount: 25 },
    { plu_id: 17, shop_id: 7, shop_amount: 40, order_amount: 15 },
    { plu_id: 19, shop_id: 7, shop_amount: 65, order_amount: 25 },

    // МЕТРО (id: 8)
    { plu_id: 1, shop_id: 8, shop_amount: 120, order_amount: 45 },
    { plu_id: 4, shop_id: 8, shop_amount: 95, order_amount: 35 },
    { plu_id: 7, shop_id: 8, shop_amount: 80, order_amount: 30 },
    { plu_id: 10, shop_id: 8, shop_amount: 110, order_amount: 40 },
    { plu_id: 13, shop_id: 8, shop_amount: 75, order_amount: 25 },
    { plu_id: 16, shop_id: 8, shop_amount: 90, order_amount: 35 },
    { plu_id: 18, shop_id: 8, shop_amount: 85, order_amount: 30 },
    { plu_id: 20, shop_id: 8, shop_amount: 100, order_amount: 40 },

    // ВкусВилл (id: 9)
    { plu_id: 2, shop_id: 9, shop_amount: 45, order_amount: 15 },
    { plu_id: 5, shop_id: 9, shop_amount: 35, order_amount: 10 },
    { plu_id: 8, shop_id: 9, shop_amount: 50, order_amount: 20 },
    { plu_id: 11, shop_id: 9, shop_amount: 40, order_amount: 15 },
    { plu_id: 14, shop_id: 9, shop_amount: 55, order_amount: 20 },
    { plu_id: 17, shop_id: 9, shop_amount: 30, order_amount: 10 },
    { plu_id: 19, shop_id: 9, shop_amount: 45, order_amount: 15 },
    { plu_id: 20, shop_id: 9, shop_amount: 60, order_amount: 25 },

    // Пятерочка (id: 10)
    { plu_id: 1, shop_id: 10, shop_amount: 90, order_amount: 35 },
    { plu_id: 3, shop_id: 10, shop_amount: 75, order_amount: 25 },
    { plu_id: 6, shop_id: 10, shop_amount: 85, order_amount: 30 },
    { plu_id: 9, shop_id: 10, shop_amount: 70, order_amount: 25 },
    { plu_id: 12, shop_id: 10, shop_amount: 95, order_amount: 35 },
    { plu_id: 15, shop_id: 10, shop_amount: 80, order_amount: 30 },
    { plu_id: 18, shop_id: 10, shop_amount: 65, order_amount: 25 },
    { plu_id: 20, shop_id: 10, shop_amount: 88, order_amount: 35 }
  ]);
};
