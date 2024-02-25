import { RobotState, RobotType } from './enumRobot.js'
import Fire from '../Fire.js'
import { Dijkstra } from '../Dijkstra.js'

export type Position = {
  x: number
  y: number
}

abstract class Robot {
  id: string
  type: RobotType
  speed: number
  canPutOut: boolean
  capacity: number
  position: Position
  waterLvL: number
  state: RobotState

  constructor(id: string) {
    this.id = id
  }

  findShortestPathToFire(fire: Fire) {
    const closestFire = this.findClosestFire(fire)

    return Dijkstra.findShortestPath(this.position, closestFire)
  }

  findShortestPathToRefuel(refuel: Position) {
    return Dijkstra.findShortestPath(this.position, refuel)
  }

  findClosestFire(fire: Fire) {
    return fire.positionsList.reduce((prev, curr) => {
      const prevDist = Math.sqrt(
        Math.pow(prev.x - this.position.x, 2) + Math.pow(prev.y - this.position.y, 2)
      )
      const currDist = Math.sqrt(
        Math.pow(curr.x - this.position.x, 2) + Math.pow(curr.y - this.position.y, 2)
      )
      return prevDist < currDist ? prev : curr
    }, fire.positionsList[0])
  }
}

export default Robot
