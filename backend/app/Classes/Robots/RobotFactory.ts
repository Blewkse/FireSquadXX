import Robot from './Robot.js'
import Citerne from './Citerne.js'
import Rapido from './Rapido.js'
import Extincteur from './Extincteur.js'
import { randomUUID } from 'node:crypto'

export class RobotFactory {
  listRobot: Array<Robot> = []

  constructor() {
    this.listRobot.push(new Citerne(randomUUID()))
    this.listRobot.push(new Citerne(randomUUID()))
    this.listRobot.push(new Citerne(randomUUID()))
    this.listRobot.push(new Rapido(randomUUID()))
    this.listRobot.push(new Rapido(randomUUID()))
    this.listRobot.push(new Rapido(randomUUID()))
    this.listRobot.push(new Rapido(randomUUID()))
    this.listRobot.push(new Rapido(randomUUID()))
    this.listRobot.push(new Rapido(randomUUID()))
    this.listRobot.push(new Rapido(randomUUID()))
    this.listRobot.push(new Rapido(randomUUID()))
    this.listRobot.push(new Extincteur(randomUUID()))
    this.listRobot.push(new Extincteur(randomUUID()))
    this.listRobot.push(new Extincteur(randomUUID()))
    this.listRobot.push(new Extincteur(randomUUID()))
    this.listRobot.push(new Extincteur(randomUUID()))
  }
}
