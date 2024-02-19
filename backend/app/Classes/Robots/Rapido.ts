import Robot from './Robot.js'
import { RobotType } from './enumRobot.js'

class Rapido extends Robot {
  constructor(id: string) {
    super(id)
    this.speed = 75
    this.canPutOut = false
    this.capacity = 100
    this.waterLvL = 100
    this.type = RobotType.rapido
  }
}

export default Rapido
