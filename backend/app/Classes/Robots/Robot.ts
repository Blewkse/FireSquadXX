import { robotState, robotType } from "./enumRobot";
import Fire from "../Fire";

type Position = {
  x: number;
  y: number;
};

abstract class Robot {
  type: robotType;
  speed: number;
  canPutOut: boolean;
  capacity: number;
  position: Position;
  waterLvL: number;
  state: robotState;

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
      fire.robotsList.push(this);
    }
  }

  async wait(delay: number) {
    return await setTimeout(() => {}, delay);
  }
}

export default Robot;
