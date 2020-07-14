const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.locals = [
        {
          id: 1,
          title: "First Post",
          author: "Jake",
          content: "Suckin' at something is the first step to being sorta good at something",
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
          title: "My platform",
          author: "GM",
          content: "Dogs should vote",
          score: 0,
          comments: [
            {
              content: "That's my mayor!",
              id: 154,
              parentPost: 2
            }
          ]
        }
  ];




const versionedBase = '/api/v1';

app.get(`${versionedBase}/posts`, (request, response) => {
    response.status(200).json({posts: app.locals});
});

app.post(`${versionedBase}/posts`, (request, response) => {
    const { title, author, content } = request.body;
    const reqProps = {title, author, content};
    for ( prop in reqProps ) {
      if (!reqProps[prop]) {
        response.status(500).json({error:`Prop ${prop} is not defined`});
      }
    }
    const newPost = { title, author, content };
    newPost.id = Date.now();
    newPost.score = 0;
    newPost.comments = [];
    app.locals.push(newPost);
    response.status(201).json(newPost);
});

app.post(`${versionedBase}/posts/:postId/comments`, (request, response) => {
    const { postId } = request.params;
    const parentPost = app.locals.find(post => post.id == postId);
    if (!parentPost) throw new Error (`No post with id ${postId} found`);
    
    const { content } = request.body;
    if ( !content ) response.status(500).json({error:`No content property found on request`});
    parentPost.comments.push({id:Date.now(), parentPost:postId, content:content});
    response.status(201).json(parentPost);

});

app.listen(port, () => console.log(`App listening on port ${port}`));
