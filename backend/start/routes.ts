/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import { router } from '@adonisjs/core/services/router'
import GameController from '#app/Controllers/Http/GameController'

Route.get("/", async () => {
  return { hello: "world" };
});

router.get('/game/', async ({ request }) => {
  const { x, y } = request.qs()
  const gameController = new GameController()
  gameController.main({ x, y })
  return gameController.game
})
