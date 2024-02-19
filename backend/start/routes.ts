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

<<<<<<< HEAD
import Route from "@ioc:Adonis/Core/Route";
import "./routes/map";

Route.get("/", async () => {
  return { hello: "world" };
});
=======
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return { hello: 'world' }
})
>>>>>>> f5eddbd3ef424a62c0096c08c352bbb0e1120df0
