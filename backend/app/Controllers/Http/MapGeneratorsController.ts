// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MapGenerator from "App/Classes/MapGenerator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

const MapGeneratorsController = {
  generateMap({ response }: HttpContextContract) {
    const generator = MapGenerator.getInstance();
    generator.generateMap(500, 500);
    const mapPixels = generator.getMapPixels();

    return response.status(200).json({ success: true, data: mapPixels });
  },
};

export default MapGeneratorsController;
