import Robot from "./Robot";
import { robotType } from "./enumRobot";

class Citerne extends Robot {
  constructor(id: number) {
    super(id);
    this.speed = 25;
    this.canPutOut = false;
    this.capacity = 1000;
    this.waterLvL = 1000;
    this.type = robotType.citerne;
  }
}

export default Citerne;
