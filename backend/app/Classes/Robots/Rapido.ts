import Robot from "./Robot";
import { robotType } from "./enumRobot";

class Rapido extends Robot {
  constructor(id: number) {
    super(id);
    this.speed = 75;
    this.canPutOut = false;
    this.capacity = 100;
    this.waterLvL = 100;
    this.type = robotType.rapido;
  }
}

export default Rapido;
