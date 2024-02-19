import Robot from './Robots/Robot.js'
import { RobotState, RobotType } from './Robots/enumRobot.js'

class Fire {
  public id: string
  public positionsList: { x: number; y: number }[]
  private robotsList: Robot[]
  private pdv: number
  private nbExtincteur: number = 0
  private intervalAttacking: NodeJS.Timeout | null

  constructor() {
    this.pdv = Math.round(Math.random() * 1000)
  }

  addRobot(robot: Robot) {
    if (robot.type === RobotType.extincteur) {
      this.nbExtincteur++
      if (this.nbExtincteur > 0) {
        this.putOutFire()
      }
    }
    this.robotsList.push(robot)
  }

  removeRobot(robot: Robot) {
    const index = this.robotsList.findIndex((elem) => {
      elem.id === robot.id
    })
    this.robotsList.slice(index, 1)
    if (robot.type === RobotType.extincteur) this.nbExtincteur--
    if (this.nbExtincteur == 0) {
      this.putInFire()
    }
  }

  putOutFire() {
    if (this.intervalAttacking == null) {
      this.intervalAttacking = setInterval(() => {
        this.pdv - 50 * this.nbExtincteur
        if (this.pdv <= 0) {
          //    notifier mediateur
        }
      }, 1000)
    }
  }

  putInFire() {
    if (this.intervalAttacking != null) {
      this.intervalAttacking = null
    }
  }
}

export default Fire
