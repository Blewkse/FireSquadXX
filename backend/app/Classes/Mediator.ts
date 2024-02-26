import Fire from './Fire.js'
import FireFactory from './FireFactory.js'
import Robot from './Robots/Robot.js'
import RobotFactory from './Robots/RobotFactory.js'
import { Observer, Observable } from './Interfaces/Observer.js'

class Mediator implements Observer {
  robotList: Robot[]
  fireList: Fire[]

  constructor() {}
  addFire(newFire: Fire): void {
    throw new Error('Method not implemented.')
  }
  changeRobotState(newFire: Fire): void {
    throw new Error('Method not implemented.')
  }
}
