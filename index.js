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

app.listen(port, () => console.log(`App listening on port ${port}`));
