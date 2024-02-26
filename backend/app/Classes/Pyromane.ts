import Fire from './Fire.js'
import FireFactory from './FireFactory.js'

class Pyromane {
  public id: string
  public position: Point
  public fireFactory: FireFactory
  public molotov = Math.round(Math.random() * 10)
  public fires: Fire[]

  constructor(position: Point) {
    this.position = position
    this.fires = []
  }

  public throwMolotov() {
    for (let index = 0; index < this.molotov; index++) {
      const firePLace = this.calculatePointInRadius(this.position,Math.round(Math.random() * 10),Math.round(Math.random() * 10))
      this.fireFactory.create(firePLace)  
    }
    
    
  };

  public calculatePointInRadius(pointOrigine: Point, rayon: number, angleEnRadians: number): Point {
    const x = pointOrigine.x + rayon * Math.cos(angleEnRadians)
    const y = pointOrigine.y + rayon * Math.sin(angleEnRadians)
    return { x, y }
  }
}

interface Point {
  //extends TerritoryBurnable
  x: number
  y: number
}

export default Pyromane
