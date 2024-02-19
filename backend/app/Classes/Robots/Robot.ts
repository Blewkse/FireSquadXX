import { robotState, robotType } from './enumRobot.js'
import Fire from '../Fire.js'

type Position = {
  x: number
  y: number
}

abstract class Robot {
  id: number
  type: robotType
  speed: number
  canPutOut: boolean
  capacity: number
  position: Position
  waterLvL: number
  state: robotState

  constructor(id: number) {
    this.id = id
  }

  async travelTo(x: number, y: number, fire?: Fire, refuel?: boolean) {
    this.state = refuel ? robotState.travelingToRefuel : robotState.travelingToOperation
    const path = new Array<Position>() //algo renaud pathfinding
    for (const element of path) {
      this.position.x = element.x
      this.position.y = element.y
      await this.wait(1000 * (1 / this.speed))
    }

    this.state = refuel ? robotState.refueling : robotState.inOperation
    if (fire) {
      fire.addRobot(this)
    }
  }

  async wait(delay: number) {
    return await setTimeout(() => {}, delay)
  }
}

export default Robot
