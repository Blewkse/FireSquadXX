import Robot from './Robot.js'
import { RobotType } from './enumRobot.js'

class Extincteur extends Robot {
  constructor(id: number) {
    super(id.toString())
    this.speed = 50
    this.canPutOut = true
    this.capacity = 250
    this.waterLvL = 250
    this.type = RobotType.extincteur
  }
}

export default Extincteur
