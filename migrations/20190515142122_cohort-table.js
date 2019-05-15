
exports.up = function(knex, Promise) {
    return knex.schema.createTable( 'cohort', function(tbl) {
        tbl.increments()

        tbl
            .string( 'name' , 128 )
            .notNullable()
            .unique()

        tbl.timestamps( true , true )
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists( 'cohort' );
};