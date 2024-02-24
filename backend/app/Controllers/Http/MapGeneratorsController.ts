import MapGenerator from '../../Classes/MapGenerator.js'
import { HttpContext } from '@adonisjs/core/http'

const MapGeneratorsController = {
  generateMap({ response }: HttpContext) {
    const generator = MapGenerator.getInstance()
    generator.generateMap(4, 750 / 4)

    const mapTiles = generator.getMapTiles()

    // return response.status(200).json({ success: true, data: gradients })
    return response.status(200).json({ success: true, data: mapTiles })
  },
}

export default MapGeneratorsController
