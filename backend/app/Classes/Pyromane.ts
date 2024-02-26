import FireFactory from "./FireFactory"

class Pyromane {
  public id: string;
  public position:Point;
 
  private molotov: number;
 
  constructor(public fireFactory: FireFactory) {
    this.molotov = Math.round(Math.random() * 10);
  }

  throwMolotov(){
    for (let index = 0; index < this.molotov; index++) {
      const firePLace = this.calculatePointInRadius(this.position,Math.round(Math.random() * 10),Math.round(Math.random() * 10))
      this.fireFactory.create(firePLace)  
    }
    
    
  };

  calculatePointInRadius(pointOrigine: Point, rayon: number, angleEnRadians: number): Point {
    const x = pointOrigine.x + rayon * Math.cos(angleEnRadians);
    const y = pointOrigine.y + rayon * Math.sin(angleEnRadians);
    return { x, y };
  }
 
 
}
interface Point { //extends TerritoryBurnable
    x: number;
    y: number;
  }
export default Pyromane;
