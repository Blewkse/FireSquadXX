import RobotFactory from './Robots/RobotFactory.js'
import PyromaneFactory from './PyromaneFactory.js'
import Fire from './Fire.js'
import Robot from './Robots/Robot.js'
import Pyromane from './Pyromane.js'

class Game {
  public robotFactory = new RobotFactory()
  public fireList: Fire[]
  public robotList: Robot[]
  public pyromane: Pyromane
  public matrix: number[][]

  constructor() {
    this.fireList = []
    this.robotList = []
  }

  async createMatrix(fileName: string) {
    this.matrix = []
  }

  public createPyromane(position: { x: number; y: number }) {
    this.pyromane = PyromaneFactory.create(position)
    this.pyromane.throwMolotov()
    this.fireList = this.pyromane.fires
  }

  public createRobots() {
    const robots = this.robotFactory.listRobot

    robots.forEach((robot: Robot) => {
      this.robotList.push(robot)
    })
  }

  public updatePyromane(pyromane: Pyromane, newPosition: { x: number; y: number }) {
    PyromaneFactory.update(pyromane, newPosition)
  }
}

export default Game
