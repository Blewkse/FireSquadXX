import { RobotState, RobotType } from './enumRobot.js'
import Fire from '../Fire.js'
import { Dijkstra } from '../Dijkstra.js'
import { Observable, Observer } from '../Interfaces/Observer.js'

export type Position = {
  x: number
  y: number
}

abstract class Robot implements Observable {
  id: string
  type: RobotType
  speed: number
  canPutOut: boolean
  capacity: number
  position: Position
  waterLvL: number
  state: RobotState
  assignedFire: Fire
  assignedRefuel: Robot
  activePath: number[][]

  private clock: NodeJS.Timeout | undefined = undefined
  listObserver: Observer[]

  constructor(id: string) {
    this.id = id
  }

  addObserver(observer: Observer): void {
    this.listObserver.push(observer)
  }
  removeObserver(observer: Observer): void {
    const observerIndex = this.listObserver.findIndex((elem) => elem === observer)
    this.listObserver.splice(observerIndex, 1)
  }
  notify(): void {
    this.listObserver.forEach((observer) => {
      observer.changeRobotState(this.state, this)
    })
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

  public assignFire(fire: Fire) {
    this.assignedFire = fire
    const dijkstraPath = this.findShortestPathToFire(fire)
    this.activePath = dijkstraPath.path
  }

  public assignRefuel(refuelRobot: Robot) {
    this.assignedRefuel = refuelRobot
    const dijkstraPath = this.findShortestPathToRefuel(refuelRobot.position)
    this.activePath = dijkstraPath.path
  }

  private update(): void {
    if (this.activePath.length > 0) {
      for (let i = 0; i < this.activePath.length; i++) {
        this.position = { x: this.activePath[i][0], y: this.activePath[i][1] }
      }
    }
  }

  public launchClock(): void {
    if (this.clock === undefined) {
      this.clock = setInterval(() => {
        this.update()
      }, this.speed)
    }
  }

  public stopClock() {
    if (this.clock !== undefined) {
      clearInterval(this.clock)
    }
  }
}

export default Robot
