import { Casern, Forest, Road, Mountain, Plain, Water, Village } from './Territories/index.js'
import TerritoryBurnable from './TerritoryBurnable.js'
import TerritoryUnburnable from './TerritoryUnburnable.js'

type MapPoint = {
  x: number
  y: number
}

export default class MapGenerator {
  private static instance: MapGenerator
  private mapTiles: (TerritoryBurnable | TerritoryUnburnable)[][]

  private width: Number
  private height: Number

  constructor() {
    this.mapTiles = []
  }

  public static getInstance(): MapGenerator {
    if (!MapGenerator.instance) {
      this.instance = new MapGenerator()
    }
    return this.instance
  }

  private setPoint(y: number, x: number, pointType: TerritoryBurnable | TerritoryUnburnable) {
    if (!this.mapTiles[y]) {
      this.mapTiles[y] = []
    }
    this.mapTiles[y][x] = pointType
  }

  // grid size la taille de ma grille de gradient
  //resolution le nombre de mes tiles
  //octaves le nombre de couches que je vais additionner
  public generateMap(gridSize: number, resolution: number, canvasSize: number) {
    //calcule sur un cercle trigo l'angle du vecteur puis le regule entre 0 et 1
    const randVect = () => {
      let theta = Math.random() * 2 * Math.PI
      return { x: Math.cos(theta), y: Math.sin(theta) }
    }

    //genere la grille des gradient de reference
    const generateGradientGrid = () => {
      const gradientGrid: { x: number; y: number }[][] = []
      for (let y = 0; y <= gridSize; y++) {
        gradientGrid[y] = []
        for (let x = 0; x <= gridSize; x++) {
          gradientGrid[y].push(randVect())
        }
      }
      return gradientGrid
    }

    //effectue un produit scalaire entre le gradient au point sur la grille et la distance avec le point de base
    //cela permet de recuperer l'influence du point en fonction de sa force et sa distance
    const dotProdGrid = (tilesY: number, tilesX: number, gridY: number, gridX: number) => {
      const differenceVector = { x: tilesX - gridX, y: tilesY - gridY }
      const gridDotVector = gradientGrid[gridY][gridX]

      return differenceVector.x * gridDotVector.x + differenceVector.y * gridDotVector.y
    }

    //permet d'adoucir les transitions
    const smootherstep = (x: number) => {
      return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3
    }

    //shift = difference between the tile Y/X and the grid
    // a and b are dot products of grid points
    const interpolation = (shift: number, a: number, b: number) => {
      return a + smootherstep(shift) * (b - a)
    }

    const hasNoDecimal = (num: number) => {
      return num === Math.floor(num)
    }

    // console.log(generateGradientGrid())

    const gradientGrid = generateGradientGrid()
    console.log(gradientGrid)
    // const gradientGrids: { x: number; y: number }[][][] = []
    // for (let i = 0; i < octaves; i++) {
    //   gradientGrids.push(generateGradientGrid())
    // }
    try {
      const gridSquareSize = resolution / gridSize
      for (let y = 0; y < resolution; y++) {
        if (hasNoDecimal(y / gridSquareSize)) {
          console.log(y)
        }
        for (let x = 0; x < resolution; x++) {
          const tilesY = y / gridSquareSize
          const tilesX = x / gridSquareSize

          const floorTilesY = Math.floor(tilesY)
          const floorTilesX = Math.floor(tilesX)
          let v: number = 0
          const gridDotTL = dotProdGrid(tilesY, tilesX, floorTilesY + 1, floorTilesX)
          const gridDotTR = dotProdGrid(tilesY, tilesX, floorTilesY + 1, floorTilesX + 1)
          const gridDotBL = dotProdGrid(tilesY, tilesX, floorTilesY, floorTilesX)
          const gridDotBR = dotProdGrid(tilesY, tilesX, floorTilesY, floorTilesX + 1)
          const interpTop = interpolation(tilesX - floorTilesX, gridDotTL, gridDotTR)
          const interpBot = interpolation(tilesX - floorTilesX, gridDotBL, gridDotBR)
          v = interpolation(tilesY - floorTilesY, interpBot, interpTop)
          // console.log(v)

          if (v < -0.2) {
            this.setPoint(y, x, new Water())
          } else if (v > 0.2) {
            this.setPoint(y, x, new Mountain())
          } else if (v > 0.1) {
            this.setPoint(y, x, new Forest())
          } else {
            this.setPoint(y, x, new Plain())
          }
        }
      }

      const getRandomPoint = (max: number) => {
        return Math.floor(Math.random() * max)
      }
      //add some villages in the plain
      let i = 0
      while (i < 5) {
        const randomPoint = { x: getRandomPoint(resolution), y: getRandomPoint(resolution) }
        if (!(this.mapTiles[randomPoint.y][randomPoint.x].type === 'plain')) {
          continue
        } else {
          i === 2
            ? this.setPoint(randomPoint.y, randomPoint.x, new Casern())
            : this.setPoint(randomPoint.y, randomPoint.x, new Village())
          const rayon = 2
          const xMin = Math.max(randomPoint.x - rayon, 0)
          const xMax = Math.min(randomPoint.x + 1 + rayon, resolution - 1)
          const yMin = Math.max(randomPoint.y - rayon, 0)
          const yMax = Math.max(randomPoint.y + rayon, resolution - 1)
          for (let y = yMin; y <= yMax; y++) {
            for (let x = xMin; x < xMax; x++) {
              if (
                Math.pow(x - randomPoint.x, 2) + Math.pow(y - randomPoint.y, 2) <=
                Math.pow(rayon, 2)
              ) {
                if (this.mapTiles[y][x].type === 'plain') {
                  i === 2 ? this.setPoint(y, x, new Casern()) : this.setPoint(y, x, new Village())
                }
              }
            }
          }

          i++
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  private calculateDistances(point1: MapPoint, point2: MapPoint) {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2)) + Math.sqrt(Math.pow(point1.y - point2.y, 2))
  }

  public getMapTiles(): (TerritoryBurnable | TerritoryUnburnable)[][] {
    return this.mapTiles
  }
}
