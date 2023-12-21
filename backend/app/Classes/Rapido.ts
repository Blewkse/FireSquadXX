import Robot from "./Robot";
import { robotType } from "./enumRobot";

class Rapido extends Robot {
  constructor() {
    super();
    this.speed = 100;
    this.canPutOut = false;
    this.capacity = 100;
    this.waterLvL = 100;
    this.type = robotType.rapido;
  }
}

export default Rapido;
