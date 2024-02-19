import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/GenerateMap', 'MapGeneratorsController.generateMap')
  })
  .prefix('api/maps')

export default router
