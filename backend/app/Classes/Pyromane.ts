import Fire from './Fire.js'
import FireFactory from './FireFactory.js'
import { Observable } from './Interfaces/Observer.js'
import MapGenerator from './MapGenerator.js'

class Pyromane extends Observable<Pyromane> {
  private position: { x: number; y: number }
  private clock: NodeJS.Timer | undefined = undefined
  constructor(position: { x: number; y: number }) {
    super()
    this.position = position
  }
  public throwMolotov() {
    // const firePlace = this.calculatePointInRadius(
    //   this.position,
    //   Math.round(Math.random() * 10),
    //   Math.round(Math.random() * 10)
    // )
    FireFactory.getInstance().create(this.position)
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
  private update() {
    const newPosition = { x: Math.random() * 2, y: Math.random() * 2 }
    if (MapGenerator.getInstance().isValidCell(newPosition.y, newPosition.x)) {
      this.position = newPosition
      this.notify(this)
    }
    const isThrowingMolotov = Math.random() > 0.75
    if (isThrowingMolotov) {
      this.throwMolotov()
    }
  }
  public launchClock() {
    if (this.clock === undefined) {
      this.clock = setInterval(() => {
        this.update()
      }, 5000)
    }
  }

  public getPosition(): { x: number; y: number } {
    return this.position
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
