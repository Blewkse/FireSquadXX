<<<<<<< HEAD
import Fire from '../Fire.js'
import Pyromane from '../Pyromane.js'
import Robot from '../Robots/Robot.js'

export interface Observer {
  addFire(newFire: Fire): void
  changeRobotState(state: string, robot: Robot): void
  updatePyromane(pyromane: Pyromane): void
}
=======
type Observer<T> = (data: T) => void

export class Observable<T> {
  listObserver: Observer<T>[]
>>>>>>> 3d57ab159227fb5a3e133604fea026ba1fd126e8

  constructor() {
    this.listObserver = []
  }

  addObserver(observer: Observer<T>): void {
    this.listObserver.push(observer)
  }

  removeObserver(observer: Observer<T>): void {
    const index = this.listObserver.findIndex((elem) => {
      elem === observer
    })
    this.listObserver.splice(index, 1)
  }

  notify(data: T): void {
    this.listObserver.forEach((observer) => {
      observer(data)
    })
  }
}
