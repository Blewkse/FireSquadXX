import { Dijkstra } from './Dijkstra.js'
import { Casern, Forest, Road, Mountain, Plain, Water, Village } from './Territories/index.js'
import TerritoryBurnable from './TerritoryBurnable.js'
import TerritoryUnburnable from './TerritoryUnburnable.js'

type MapPoint = {
  x: number
  y: number
}

type Region = {}

export default class MapGenerator {
  private static instance: MapGenerator
  private mapTiles: (TerritoryBurnable | TerritoryUnburnable)[][]
  private villagesList: Village[] = []
  private resolution: number

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

  public isValidCell(row: number, col: number) {
    return row >= 0 && row < this.resolution && col >= 0 && col < this.resolution
  }

  // grid size la taille de ma grille de gradient
  //resolution le nombre de mes tiles
  //octaves le nombre de couches que je vais additionner
  public generateMap(gridSize: number, resolution: number, canvasSize: number) {
    this.resolution = resolution
    this.mapTiles = []
    this.villagesList = []

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

    const gradientGrid = generateGradientGrid()
    try {
      const gridSquareSize = resolution / gridSize
      for (let y = 0; y < resolution; y++) {
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
          let newVillage
          if (i === 2) {
            newVillage = new Casern(i, { y: randomPoint.y, x: randomPoint.x })
            this.villagesList.push(newVillage)
            this.setPoint(randomPoint.y, randomPoint.x, newVillage)
          } else {
            newVillage = new Village(i, { y: randomPoint.y, x: randomPoint.x })
            this.villagesList.push(newVillage)
            this.setPoint(randomPoint.y, randomPoint.x, newVillage)
          }

          //plot the village area in circle
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
                if (this.isValidCell(x, y)) {
                  if (this.mapTiles[y][x].type === 'plain') {
                    i === 2 ? this.setPoint(y, x, newVillage) : this.setPoint(y, x, newVillage)
                  }
                }
              }
            }
          }

          i++
        }
      }

      //add some road to link village between them
      //we get n * (n - 1) roads
      //paths has here the departure and the destination
      //path represent the return from Dijkstra which is the length of the road and the table of the path
      //path is a matrice because coor are stocked in an array and not in an object, maybe its not that useful
      const paths: {
        path: { distance: number; path: number[][] }
        start: Village
        end: Village
      }[] = []
      //create the reference movement map by passing the actual mapTile
      Dijkstra.getNumberMatrixFromMatrixTiles(this.mapTiles)
      let k = 0
      //we mesure for each villages in the list except itself
      console.log('village list', this.villagesList.length)
      for (let i = 0; i < this.villagesList.length; i++) {
        for (let j = 0; j < this.villagesList.length; j++) {
          if (j === i) {
            continue
          }

          //compute the shortest path by Dijkstra
          const path = Dijkstra.findShortestPath(
            { x: this.villagesList[i].position.x, y: this.villagesList[i].position.y },
            { x: this.villagesList[j].position.x, y: this.villagesList[j].position.y }
          )
          k++
          //if path longer than 1000, the two villages are too far, no road created
          if (path.distance < 1000) {
            paths.push({
              path: path,
              start: this.villagesList[i],
              end: this.villagesList[j],
            })
          }
        }
      }
      console.log(k)
      let N = 0

      //i stock the relation between two villages
      //sometimes, Dijkstra compute a higher lenght from A to B than from B to A, to clean the map i keep only the lower
      const pathsVillagesHeap: {
        path: { distance: number; path: number[][] }
        start: Village
        end: Village
      }[] = []

      console.log('path.length', paths.length)
      //for each paths computed
      for (let path of paths) {
        N++
        //i check if A to B existing while i have B and A
        const existingRoadIndex = pathsVillagesHeap.findIndex(
          (currentPath) =>
            currentPath.start.id === path.end.id && currentPath.end.id === path.start.id
        )
        //if it exists i check if the length is lower or higher and i keep the lower
        if (existingRoadIndex !== -1) {
          if (pathsVillagesHeap[existingRoadIndex].path.distance > path.path.distance) {
            pathsVillagesHeap.splice(existingRoadIndex, 1)
            pathsVillagesHeap.push(path)
          }
        } else {
          pathsVillagesHeap.push(path)
        }
      }
      console.log('before', pathsVillagesHeap.length)
      //good, now we divide by 2 the number of roads,
      //now let's check if we have 3 villages, A B and C, if A -> B + B -> C not really higher than A -> C,
      //we can delete A -> C
      const margin = 150
      for (const [index, entry] of pathsVillagesHeap.entries()) {
        console.log(index, entry.start.id, entry.end.id)
        console.log(index, entry.start.position, entry.end.position)
      }
      let p = 0
      while (p < pathsVillagesHeap.length) {
        const pathToCompute = pathsVillagesHeap[p]
        for (const element of pathsVillagesHeap) {
          if (pathToCompute === element) {
            continue
          }
          if (pathToCompute.start === element.start) {
            const neighborPathToDestinationIndex = pathsVillagesHeap.findIndex(
              (path) =>
                (path.start === element.end && path.end === pathToCompute.end) ||
                (path.end === element.end && path.start === pathToCompute.end)
            )
            if (neighborPathToDestinationIndex !== -1) {
              const computedDistance =
                element.path.distance +
                pathsVillagesHeap[neighborPathToDestinationIndex].path.distance

              if (computedDistance < pathToCompute.path.distance + margin) {
                pathsVillagesHeap.splice(p, 1)
                p = 0
              }
            }
          }
          if (pathToCompute.start === element.end) {
            const neighborPathToDestinationIndex = pathsVillagesHeap.findIndex(
              (path) =>
                (path.start === element.start && path.end === pathToCompute.end) ||
                (path.end === element.start && path.start === pathToCompute.end)
            )
            if (neighborPathToDestinationIndex !== -1) {
              const computedDistance =
                element.path.distance +
                pathsVillagesHeap[neighborPathToDestinationIndex].path.distance

              if (computedDistance < pathToCompute.path.distance + margin) {
                pathsVillagesHeap.splice(p, 1)
                p = 0
              }
            }
          }
        }
        p++
      }

      console.log('after', pathsVillagesHeap.length)
      for (const [index, entry] of pathsVillagesHeap.entries()) {
        console.log(index, entry.start.id, entry.end.id)
        console.log(index, entry.start.position, entry.end.position)
      }

      //i loop on my pathVillageHeap to keep only the optimized roads
      for (const element of pathsVillagesHeap) {
        console.log('in')
        for (let j = 0; j < element.path.path.length; j++) {
          //dijkstra treat with x,y not y,x like here
          this.setPoint(element.path.path[j][1], element.path.path[j][0], new Road())
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
