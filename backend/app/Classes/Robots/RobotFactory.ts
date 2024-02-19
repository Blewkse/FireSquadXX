import Robot from './Robot.js'
import Citerne from './Citerne.js'
import Rapido from './Rapido.js'
import Extincteur from './Extincteur.js'
import { RobotState } from './enumRobot.js'
import { Observer, Observable } from '../Interfaces/Observer.js'

class RobotFactory implements Observable {
  listRobot: Array<Robot> = []
  nbRapido: number = 0
  nbCiterne: number = 0
  nbExtincteur: number = 0

  listObserver: Observer[]

  constructor() {
    this.listRobot.push(new Citerne(this.nbCiterne + 1))
    this.nbCiterne++
    this.listRobot.push(new Citerne(this.nbCiterne + 1))
    this.nbCiterne++
    this.listRobot.push(new Citerne(this.nbCiterne + 1))
    this.nbCiterne++
    this.listRobot.push(new Rapido(this.nbRapido + 1))
    this.nbRapido++
    this.listRobot.push(new Rapido(this.nbRapido + 1))
    this.nbRapido++
    this.listRobot.push(new Rapido(this.nbRapido + 1))
    this.nbRapido++
    this.listRobot.push(new Rapido(this.nbRapido + 1))
    this.nbRapido++
    this.listRobot.push(new Rapido(this.nbRapido + 1))
    this.nbRapido++
    this.listRobot.push(new Rapido(this.nbRapido + 1))
    this.nbRapido++
    this.listRobot.push(new Rapido(this.nbRapido + 1))
    this.nbRapido++
    this.listRobot.push(new Rapido(this.nbRapido + 1))
    this.nbRapido++
    this.listRobot.push(new Extincteur(this.nbExtincteur + 1))
    this.nbExtincteur++
    this.listRobot.push(new Extincteur(this.nbExtincteur + 1))
    this.nbExtincteur++
    this.listRobot.push(new Extincteur(this.nbExtincteur + 1))
    this.nbExtincteur++
    this.listRobot.push(new Extincteur(this.nbExtincteur + 1))
    this.nbExtincteur++
    this.listRobot.push(new Extincteur(this.nbExtincteur + 1))
    this.nbExtincteur++
    this.notify()
  }

  public getRobotList() {
    return this.listRobot
  }

  public addCiterne() {
    this.listRobot.push(new Citerne(this.nbExtincteur + 1))
    this.nbCiterne++
  }
  public addRapido() {
    this.listRobot.push(new Rapido(this.nbExtincteur + 1))
    this.nbRapido++
  }
  public addExtincteur() {
    this.listRobot.push(new Extincteur(this.nbExtincteur + 1))
    this.nbExtincteur++
  }

  public removeCiterne() {
    for (let i = 0; i < this.listRobot.length; i++) {
      if (this.listRobot[i] instanceof Citerne) {
        if (this.listRobot[i].state != RobotState.inOperation) {
          this.listRobot.splice(i, 1)
          break
        }
      }
    }
    this.nbCiterne--
  }
  public removeRapido() {
    for (let i = 0; i < this.listRobot.length; i++) {
      if (this.listRobot[i] instanceof Rapido) {
        if (this.listRobot[i].state != RobotState.inOperation) {
          this.listRobot.splice(i, 1)
          break
        }
      }
    }
    this.nbRapido--
  }
  public removeExtincteur() {
    for (let i = 0; i < this.listRobot.length; i++) {
      if (this.listRobot[i] instanceof Extincteur) {
        if (this.listRobot[i].state != RobotState.inOperation) {
          this.listRobot.splice(i, 1)
          break
        }
      }
    }
    this.nbExtincteur--
  }

  addObserver(observer: Observer) {
    this.listObserver.push(observer)
  }

  removeObserver(observer: Observer) {
    const index = this.listObserver.findIndex((elem) => {
      elem == observer
    })
    this.listObserver.splice(index, 1)
  }

  notify() {
    this.listObserver.forEach((observer) => {
      observer.update(this)
    })
  }
}

export default RobotFactory
