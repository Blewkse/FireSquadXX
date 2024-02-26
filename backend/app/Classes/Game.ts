import RobotFactory from './Robots/RobotFactory.js'
import Fire from './Fire.js'
import Robot from './Robots/Robot.js'
import Pyromane from './Pyromane.js'

class Game {
  public robotFactory = new RobotFactory()
  public fireList = [] as Fire[]
  public robotList = [] as Robot[]
  public pyromane: Pyromane

  private clock: NodeJS.Timeout | undefined = undefined
  private pyromaneClockCount: number = 0

  private instance: Game

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
