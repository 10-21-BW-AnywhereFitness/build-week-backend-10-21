exports.up = async (knex) => {
  await knex.schema
    .createTable('roles', (roles) => {
      roles.increments('role_id')
      roles.string('role_type').notNullable().unique()
    })
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable()
      users.string('password', 200).notNullable()
      users.boolean('instructor_auth')
      users.integer('role_id')
        .unsigned()
        .notNullable()
        .references('role_id')
        .inTable('roles')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
    })
    .createTable('classes', (classes) => {
      classes.increments('class_id')
      classes.string('class_name').notNullable().unique()
      classes.string('class_type').notNullable()
      classes.date('class_date').notNullable()
      classes.time('class_time').notNullable()
      classes.integer('class_duration').notNullable()
      classes.string('class_intensity').notNullable()
      classes.string('class_location').notNullable()
      classes.integer('class_registered_clients')
      classes.integer('class_max').notNullable()
      classes.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
    .createTable('reservations', reservations => {
      reservations.increments('reservation_id')
      reservations.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      reservations.integer('class_id')
      .unsigned()
      .notNullable()
      .references('class_id')
      .inTable('classes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('reservations');
  await knex.schema.dropTableIfExists('classes');
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('roles');
}
