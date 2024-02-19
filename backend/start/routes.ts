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

import GameController from '#app/Controllers/Http/GameController'
import MapGeneratorsController from '#app/Controllers/Http/MapGeneratorsController'
import router from '@adonisjs/core/services/router'
import transmit from '@adonisjs/transmit/services/main'
import { randomUUID } from 'node:crypto'

router.get('/', async () => {
  return { hello: 'world' }
})

router.get('/game/', async ({ request }) => {
  const { x, y } = request.qs()
  const gameController = new GameController()
  gameController.main({ x, y })
  return gameController.game
})

router.get('/test-sse', async (context) => {
  const { request, response } = context

  transmit.$createStream(request, response)
  transmit.on('subscribe', (channel) => {
    console.log(channel)
  })
  console.log('uid', request.input('uid'))

  const userUid = request.input('uid') || randomUUID()

  console.log(await transmit.$subscribeToChannel(userUid, 'eazezzaez', context))

  const ok = await transmit.$subscribeToChannel(userUid, 'game', context)
  console.log(ok)

  transmit.broadcast('game', { hello: 'Hello from the server' })

  setTimeout(() => {
    transmit.broadcast('game', { hello: 'Hello from the server' })
  }, 1000)
})

router.get('api/maps/GenerateMap', MapGeneratorsController.generateMap)
