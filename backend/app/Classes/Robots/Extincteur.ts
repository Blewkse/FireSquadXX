import Robot from './Robot.js'
import { robotState, robotType } from './enumRobot.js'

class Extincteur extends Robot {
  constructor(id: number) {
    super(id)
    this.speed = 50
    this.canPutOut = true
    this.capacity = 250
    this.waterLvL = 250
    this.type = robotType.extincteur
  }
}

export default Extincteur
