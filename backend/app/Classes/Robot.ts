import { robotState, robotType } from "./enumRobot";

abstract class Robot {
  type: robotType;
  speed: number;
  canPutOut: boolean;
  capacity: number;
  position: {
    x: number;
    y: number;
  };
  waterLvL: number;
  state: robotState;
}

export default Robot;
