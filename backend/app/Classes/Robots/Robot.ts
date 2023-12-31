import { robotState, robotType } from "./enumRobot";
import Fire from "../Fire";

type Position = {
  x: number;
  y: number;
};

abstract class Robot {
  id: number;
  type: robotType;
  speed: number;
  canPutOut: boolean;
  capacity: number;
  position: Position;
  waterLvL: number;
  state: robotState;

  constructor(id: number) {
    this.id = id;
  }

  async travelTo(x: number, y: number, fire?: Fire, refuel?: boolean) {
    this.state = refuel
      ? robotState.travelingToRefuel
      : robotState.travelingToOperation;
    const path = new Array<Position>(); //algo renaud pathfinding
    for (let i = 0; i < path.length; i++) {
      this.position.x = path[i].x;
      this.position.y = path[i].y;
      await this.wait(1000 * (1 / this.speed));
    }

    this.state = refuel ? robotState.refueling : robotState.inOperation;
    if (fire) {
      fire.addRobot(this);
    }
  }

  async wait(delay: number) {
    return await setTimeout(() => {}, delay);
  }
}

export default Robot;
