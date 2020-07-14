# PostIt BE Server

This repo contains a server for the [PostIt FE](https://github.com/turingschool-examples/post-it-testing) app. It is meant to be used for examples and testing practice purposes. 

The live site can be found at `https://post-it-server.herokuapp.com/api/v1/`.

## Endpoints
All endpoints start with the base: `https://post-it-server.herokuapp.com/api/v1/`

| Verb | URL | Expected Body | Sample Successful Response |
|------|-----|---------------|-----------------|
| GET  | `/posts` | N/A      | `[{id:<number>, title:<string>, author:<string>, content:<string>, score:<number>, comments: [ {content: <string>, id:<number>, parentPost:<number> } ] }, {...} ]` |
| POST | `/posts` | `{ author: <string>, content: <string>, title: <string>}` | The new post (see post outline above)|
| POST | `/posts/:postId/comments`, where `:postId` is the idea of the post being commented on | `{content:<string>}`| The full post, along with the new comment |
