import Fire from './Fire.js'
import { Observable } from './Interfaces/Observer.js'

class FireFactory extends Observable<FireFactory> {
  private static instance: FireFactory

  constructor() {
    super()
  }

  public static getInstance(): FireFactory {
    if (!this.instance) {
      this.instance = new FireFactory()
    }
    return this.instance
  }

  public create(position: { x: number; y: number }): void {
    const fire = new Fire(position)
    fire.positionsList = [position]
    this.notify(this)
  }
}

export default FireFactory
