import Fire from "./Fire";
import FireFactory from "./FireFactory";
import Robot from "./Robots/Robot";
import RobotFactory from "./Robots/RobotFactory";
import { Observer, Observable } from "./Interfaces/Observer";

class Mediator implements Observer {
  robotList: Robot[];
  fireList: Fire[];

  constructor() {}

  public newFire(fire: Fire) {}

  public update(observable: Observable): void {
    if (observable instanceof RobotFactory) {
      this.robotList = observable.getRobotList();
    } else if (observable instanceof FireFactory) {
      // this.fireList = observable.
    }
  }
}
