import Robot from "./Robot";
import { robotType } from "./enumRobot";

class Extincteur extends Robot {
  constructor() {
    super();
    this.speed = 70;
    this.canPutOut = true;
    this.capacity = 250;
    this.waterLvL = 250;
    this.type = robotType.extincteur;
  }
}

export default Extincteur;
