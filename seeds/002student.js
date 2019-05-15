
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Maya', cohort_id: '1'},
        {name: 'Jack', cohort_id: '3'},
        {name: 'Roland', cohort_id: '2'}
      ]);
    });
};
