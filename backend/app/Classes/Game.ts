import RobotFactory from './Robots/RobotFactory.js'
import Fire from './Fire.js'
import Robot from './Robots/Robot.js'
import Pyromane from './Pyromane.js'

class Game {
  public robotFactory = new RobotFactory()
  public fireList: Fire[]
  public robotList: Robot[]
  public pyromane: Pyromane

<<<<<<< HEAD
  private clock: NodeJS.Timeout | undefined = undefined
  private pyromaneClockCount: number = 0

  private instance: Game
=======
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
>>>>>>> d76f4ec72c1e5b1fd5fadd4d6e1af836e5f71969

  public createRobots() {
    const robots = this.robotFactory.listRobot

    robots.forEach((robot: Robot) => {
      this.robotList.push(robot)
    })
  }

  public updatePyromane() {
    PyromaneFactory.update(pyromane, newPosition)
  }

  getInstance() {
    if (!this.instance) {
      this.instance = new Game()
    }
    return this.instance
  }

  private update(): void {
    if (this.pyromaneClockCount === 20) {
      this.updatePyromane()
    }
    this.pyromaneClockCount++
  }

  public play(): void {
    this.clock = setInterval(() => {
      this.update()
    }, 5000)
  }

  public stop(): void {
    this.pyromane = new Pyromane()
    if (this.clock !== undefined) {
      clearInterval(this.clock)
    }
  }
}

export default Game
