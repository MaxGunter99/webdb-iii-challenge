
exports.up = function(knex, Promise) {
    return knex.schema.createTable( 'students', tbl => {
        tbl.increments()
        tbl.string( 'name' , 128 ).notNullable();
        tbl.interger( 'cohort_id' )
            .unsigned()
            .references('id')
            .inTable('cohort_id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        tbl.timestamps( true , true )
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists( 'students' )
};