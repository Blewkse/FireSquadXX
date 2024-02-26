import Fire from './Fire.js'
import FireFactory from './FireFactory.js'
import Robot from './Robots/Robot.js'
import RobotFactory from './Robots/RobotFactory.js'
import { Observable } from './Interfaces/Observer.js'
import Pyromane from './Pyromane.js'
import { EventsStreaming } from './EventsStreaming.js'

class Mediator extends Observable<Mediator> {
  robotList: Robot[]
  fireList: Fire[]
  fireFactory: FireFactory
  pyromane: Pyromane

  constructor(pyromane: Pyromane) {
    super()
    this.pyromane = pyromane
    this.observePyromane()
  }

  private observePyromane(): void {
    this.pyromane.addObserver((data) => this.updatePyromane(data))
  }

  private updatePyromane(data: Pyromane) {
    EventsStreaming.sendGameEventToClient({ pyromanePosition: { x: data.getPosition() } })
  }
  // addFire(newFire: Fire): void {
  //   throw new Error('Method not implemented.')
  // }
  // changeRobotState(newFire: Fire): void {
  //   throw new Error('Method not implemented.')
  // }
}
