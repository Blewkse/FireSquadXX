import { randomUUID } from 'node:crypto'
import { Observable } from './Interfaces/Observer.js'

class Fire extends Observable<Fire> {
  public id: string
  public positionsList: { x: number; y: number }[]
  public pdv: number
  private fireInterval: NodeJS.Timeout

  constructor(initialPosition: { x: number; y: number }) {
    super()
    this.id = randomUUID()
    this.positionsList = [initialPosition]
    this.pdv = Math.round(Math.random() * 1000)
    this.startFireExpandation()
  }

  private expandFire() {
    const newPositions: { x: number; y: number }[] = []

    this.positionsList.forEach((position) => {
      const { x, y } = position
      newPositions.push({ x: x + 1, y }, { x: x - 1, y }, { x, y: y + 1 }, { x, y: y - 1 })
    })

    this.positionsList = newPositions
  }

  private startFireExpandation() {
    this.fireInterval = setInterval(() => {
      this.expandFire()
      this.notify(this)
    }, 1000)
  }

  public stopFireExpandation() {
    clearInterval(this.fireInterval)
  }
}

export default Fire
