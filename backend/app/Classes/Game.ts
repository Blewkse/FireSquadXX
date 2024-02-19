import { RobotFactory } from './Robots/RobotFactory.js'
import PyromaneFactory from './PyromaneFactory.js'
import Fire from './Fire.js'
import Robot from './Robots/Robot.js'
import Pyromane from './Pyromane.js'
import ImageController from '#app/Controllers/Http/ImageController'

class Game {
  public robotFactory = new RobotFactory()
  public fireList = [] as Fire[]
  public robotList = [] as Robot[]
  public pyromane: Pyromane
  public matrix: number[][]

  async createMatrix(fileName: string) {
    const imageController = new ImageController()
    const matrix = await imageController.analyse(fileName)
    this.matrix = matrix
  }

  public createPyromane(position: { x: number; y: number }) {
    const pyromane = PyromaneFactory.create(position)
    this.pyromane = pyromane
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
