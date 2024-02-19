import Robot from './Robot.js'
import { RobotType } from './enumRobot.js'

class Citerne extends Robot {
  constructor(id: string) {
    super(id)
    this.speed = 25
    this.canPutOut = false
    this.capacity = 1000
    this.waterLvL = 1000
    this.type = RobotType.citerne
  }
}

export default Citerne
