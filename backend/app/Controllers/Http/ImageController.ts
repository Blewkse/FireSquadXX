// import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

class ImageController {
  public async analyse() {
    const imgPath = path.resolve(__dirname, '..', '..', 'assets', 'Pixil.png')

    const image = sharp(imgPath)
    const metadata = await image.metadata()
    const rowImageData = await image.raw().toBuffer()

    const matrix = [] as any[][]
    let pixelIndex = 0

    for (let i = 0; i < metadata.height!; i++) {
      const row = [] as any[]
      for (let j = 0; j < metadata.width!; j++) {
        const pixel = {
          x: j,
          y: i,
          color: {
            r: rowImageData[pixelIndex],
            g: rowImageData[pixelIndex + 1],
            b: rowImageData[pixelIndex + 2],
          },
        }
        row.push(pixel)
        pixelIndex += 4
      }
      matrix.push(row)
    }

    fs.writeFileSync(
      path.resolve(__dirname, '..', '..', 'assets', 'matrix.json'),
      JSON.stringify(matrix)
    )
  }
}

export default ImageController

ImageController.prototype.analyse()
