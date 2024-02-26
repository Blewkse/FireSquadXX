import Fire from '../Fire.js'
import Robot from '../Robots/Robot.js'

export interface Observer {
  addFire(newFire: Fire): void
  changeRobotState(state: string, robot: Robot): void
}

export interface Observable {
  listObserver: Observer[]
  addObserver(observer: Observer): void
  removeObserver(observer: Observer): void
  notify(): void
}
