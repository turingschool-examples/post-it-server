
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  try {
    await knex('posts').del();
    await knex('comments').del();
    const postId = await knex('posts').insert([
      {
        title: "First Post",
        author: "Johnny B",
        content: "Do the monkey",
        score: 0,
      },
 //     {
 //       id: 2,
 //       title: "I think it hailed yesterday",
 //       author: "Some Fella",
 //       content: "It was wild stuff",
 //       score: 0,
 //     }
    ], ['id'])
    
    return knex('comments').insert([
      {
        content: 'First!',
        parentPost: postId[0].id
      },
      {
        content: 'That was a weird show',
        parentPost: postId[0].id
      }
    ]);
  
  } catch (error) {
    console.log(`Error seeding data: ${error}`);
  } 
};
