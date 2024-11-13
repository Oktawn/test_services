import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.integer('age').notNullable()
    table.boolean('gender').notNullable()
    table.boolean('problems').notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}

