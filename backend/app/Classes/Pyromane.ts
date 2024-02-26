import Fire from './Fire.js'
import FireFactory from './FireFactory.js'
import { Observable, Observer } from './Interfaces/Observer.js'

class Pyromane implements Observable {
  private position: { x: number; y: number }
  private clock: NodeJS.Timer | undefined = undefined
  listObserver: Observer[]

  constructor(position: { x: number; y: number }) {
    this.position = position
  }

  addObserver(observer: Observer): void {
    this.listObserver.push(observer)
  }
  removeObserver(observer: Observer): void {
    const observerIndex = this.listObserver.findIndex((element) => element === observer)
    this.listObserver.splice(observerIndex, 1)
  }
  notify(): void {
    for (let observer of this.listObserver) observer.update(this)
  }

  public throwMolotov() {
    for (let index = 0; index < 4; index++) {
      const firePLace = this.calculatePointInRadius(
        this.position,
        Math.round(Math.random() * 10),
        Math.round(Math.random() * 10)
      )
      // const fire = this.fireFactory.create(firePLace)
      // this.fires.push(fire)
    }
  }

  public calculatePointInRadius(
    pointOrigine: { x: number; y: number },
    rayon: number,
    angleEnRadians: number
  ): { x: number; y: number } {
    const x = pointOrigine.x + rayon * Math.cos(angleEnRadians)
    const y = pointOrigine.y + rayon * Math.sin(angleEnRadians)
    return { x, y }
  }

  private update() {}

  public launchClock() {
    if (this.clock === undefined) {
      this.clock = setInterval(() => {
        this.update()
      }, 5000)
    }
  }

  // //pas ici
  // getFireByPosition(position: { x: number; y: number }) {
  //   for (let i = 0; i < this.fireList.length; i++) {
  //     if (this.fireList[i].positionsList.includes(position)) {
  //       return this.fireList[i]
  //     }
  //   }
  // }

  // //pas ici
  // shutFire(fire: Fire, position: { x: number; y: number }) {
  //   const fireIndex = fire.positionsList.findIndex((firePosition) => firePosition === position)
  //   if (fireIndex !== -1) {
  //     fire.positionsList.splice(fireIndex, 1)
  //     return 'Fire shuted !'
  //   } else {
  //     return 'No fire at this position !'
  //   }
  // }
}
export default Pyromane
