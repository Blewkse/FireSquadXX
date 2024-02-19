import Fire from './Fire.js'
import FireFactory from './FireFactory.js'
import Robot from './Robots/Robot.js'
import RobotFactory from './Robots/RobotFactory.js'
import { Observer, Observable } from './Interfaces/Observer.js'

class Mediator implements Observer {
  robotList: Robot[]
  fireList: Fire[]

  constructor() {}

  public newFire(fire: Fire) {}

  public update(observable: Observable): void {
    if (observable instanceof RobotFactory) {
      this.robotList = observable.getRobotList()
    } else if (observable instanceof FireFactory) {
      // this.fireList = observable.
    }
  }
}
