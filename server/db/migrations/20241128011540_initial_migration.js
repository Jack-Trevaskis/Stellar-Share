/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
  .createTable('users', (table) => {
    table.increments('id').primary()
    table.string('auth0_sub').unique()
    table.string('name')
    table.string('email')
    table.string('picture')
  })
  .createTable('stuff', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('description')
    table.string('owner_id')
    table.float('price')
    table.string('image_url').nullable()
    table.float('bond').nullable()
    table.string('condition').nullable()
  })
  .createTable('user_reviews', (table) => {
    table.increments('id').primary()
    table.string('reviewer_id')
    table.string('user_id')
    table.string('description')
    table.integer('rating')
  })
  .createTable('stuff_reviews', (table) => {
    table.increments('id').primary()
    table.string('reviewer_id')
    table.integer('stuff_id')
    table.string('description')
    table.integer('rating')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
  .dropTable('users')
  .dropTable('stuff')
  .dropTable('user_reviews')
  .dropTable('stuff_reviews')
}