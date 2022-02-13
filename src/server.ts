import App from './App';

import PostsController from './controllers/PostsController';

const app = new App(
  [
    new PostsController(),
  ],
  8080
)

app.listen();