import Robot from './Robot.js'
import Citerne from './Citerne.js'
import Rapido from './Rapido.js'
import Extincteur from './Extincteur.js'

class RobotFactory {
  listRobot: Array<Robot> = []

  constructor() {
    this.listRobot.push(new Citerne())
    this.listRobot.push(new Citerne())
    this.listRobot.push(new Citerne())
    this.listRobot.push(new Rapido())
    this.listRobot.push(new Rapido())
    this.listRobot.push(new Rapido())
    this.listRobot.push(new Rapido())
    this.listRobot.push(new Rapido())
    this.listRobot.push(new Rapido())
    this.listRobot.push(new Rapido())
    this.listRobot.push(new Rapido())
    this.listRobot.push(new Extincteur())
    this.listRobot.push(new Extincteur())
    this.listRobot.push(new Extincteur())
    this.listRobot.push(new Extincteur())
    this.listRobot.push(new Extincteur())
  }
}
