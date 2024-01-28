import Fire from "./Fire";
import FireFactory from "./FireFactory";
import Robot from "./Robots/Robot";
import RobotFactory from "./Robots/RobotFactory";

class Mediator {
  robotList: Robot[];

  constructor(
    robotList: Robot[],
    robotFactory: RobotFactory,
    fireFactory: FireFactory
  ) {
    this.robotList = robotList;
  }

  public newFire(fire: Fire) {}
}
