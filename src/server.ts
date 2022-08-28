import App from './App';

import PostsController from './controllers/PostsController';

const app = new App(
  [
    new PostsController(),
  ]
)

app.listen(8080);