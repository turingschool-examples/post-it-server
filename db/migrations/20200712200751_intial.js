
exports.up = function(knex) {
  return knex.schema
    .createTable('posts', function (table) {
      table.increments('id');
      table.string('title');
      table.string('author');
      table.string('content');
      table.integer('score');
    })
    .createTable('comments', function (table) {
      table.increments('id');
      table.string('content');
      table.integer('parentPost').references('id').inTable('posts');
    });  
};

exports.down = function(knex) {
  
};
