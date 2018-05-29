exports.up = function(knex, Promise) {
    return knex.schema.createTable('Subscription', function (t) {
        t.increments('id').primary();
        t.string('email').notNullable();
        t.string('city').notNullable();
        t.timestamps(false, true);
    });
};

exports.down = function(knex, Promise) {
    return Promise(knex.schema.dropTableIfExists('Subscription'));
};
