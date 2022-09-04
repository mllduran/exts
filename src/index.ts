import App from './App';

import Providers from './providers/Providers';
import PostsController from './controllers/PostsController';
import UsersController from './controllers/UsersController';


const main = async () => {
  const config = {};
  const providers = new Providers(config);

  await providers.initialize();

  const providersObj = providers.providers

  const app = new App(
    [
      new PostsController(providersObj),
      new UsersController(providersObj)
    ]
  );

  app.listen(8080);
};

main().catch(console.error);