const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile.js')[environment];
const db = require('knex')(configuration);

const versionedBase = '/api/v1';

app.get(`${versionedBase}/posts`, async (request, response) => {
  try {
    let allPosts = await db('posts').select();
    allPosts = allPosts.map(async (post) => {
      const comments = await db('comments').select('id', 'content').where({
        parentPost: post.id 
      });
      post.comments = comments;
      return post
    })
    const postsWithComments = await Promise.all(allPosts);
    response.status(200).json(postsWithComments);
  } catch (error) {
    console.error(error);
    response.status(500).json({error});
  }
});

app.listen(port, () => console.log(`App listening on port ${port}`));
