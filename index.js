const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.locals = [
        {
          id: 1,
          title: "First Post",
          author: "Johnny B",
          content: "Do the monkey",
          score: 0,
          comments: [
            {
              content: "First!",
              id: 11,
              parentPost: 1
            },
            {
              content: "Second!",
              id: 12,
              parentPost: 1
            },
            {
              content: "Last :(!",
              id: 13,
              parentPost: 1
            }
          ]
        },
        {
          id: 2,
          title: "I think it hailed yesterday",
          author: "Some Fella",
          content: "It was wild stuff",
          score: 0,
          comments: [
            {
              content: "I saw it too!",
              id: 154,
              parentPost: 2
            },
            {
              content: "I don't believe in hail",
              id: 12345232,
              parentPost: 2
            }
          ]
        }
  ];




const versionedBase = '/api/v1';

app.get(`${versionedBase}/posts`, (request, response) => {
  try {
    response.status(200).json({posts: app.locals});
  } catch (error) {
    response.status(500).json(error);
  }
});

app.post(`${versionedBase}/posts`, (request, response) => {
  try {
    const { title, author, content } = request.body;
    const reqProps = {title, author, content};
    for ( prop in reqProps ) {
      if (!reqProps[prop]) throw new Error(`Prop ${prop} is not defined`);
    }
    const newPost = { title, author, content };
    newPost.id = Date.now();
    newPost.score = 0;
    newPost.comments = [];
    app.locals.push(newPost);
    response.status(201).json(newPost);
  } catch (error) {
    response.status(422).json({error: error.message});
  }
});

app.post(`${versionedBase}/posts/:postId/comments`, (request, response) => {
  try {
    const { postId } = request.params;
    const parentPost = app.locals.find(post => post.id == postId);
    if (!parentPost) throw new Error (`No post with id ${postId} found`);
    
    const { content } = request.body;
    if ( !content ) throw new Error(`No content property found on request`);
    parentPost.comments.push({id:Date.now(), parentPost:postId, content:content});
    response.status(201).json(parentPost);
  } catch(error) {
    response.status(422).json({error: error.message});
  }

});

app.listen(port, () => console.log(`App listening on port ${port}`));
