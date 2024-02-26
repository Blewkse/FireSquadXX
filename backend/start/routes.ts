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

import { EventsStreaming } from '#app/Classes/EventsStreaming'
import GameController, { HandleGameEvent } from '#app/Controllers/Http/GameController'
import MapGeneratorsController from '#app/Controllers/Http/MapGeneratorsController'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return { hello: 'world' }
})

router.get('/game/', async (context) => {
  const { request, response } = context

  EventsStreaming.initializeStream(request, response)
  EventsStreaming.subscribeToGameEvents(request.input('uid'), context)

  const { x, y } = request.qs()
  console.log('???????????????', x, y)

  const handleGameEvent: HandleGameEvent = (event) => {
    EventsStreaming.sendGameEventToClient(event)
  }

  const gameController = new GameController(handleGameEvent)

  gameController.main({ x, y })
})

router.get('api/maps/GenerateMap', MapGeneratorsController.generateMap)
