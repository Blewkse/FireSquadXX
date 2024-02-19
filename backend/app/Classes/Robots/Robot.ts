import { robotState, robotType } from "./enumRobot";
import Fire from "../Fire";
import { Dijkstra } from "../Dijkstra";

export type Position = {
  x: number;
  y: number;
};

abstract class Robot {
  id: number
  type: robotType
  speed: number
  canPutOut: boolean
  capacity: number
  position: Position
  waterLvL: number
  state: robotState

  constructor(id: number) {
    this.id = id
  }

  findShortestPathToFire(matrix: number[][], fire: Fire) {
    const closestFire = this.findClosestFire(fire);

    return Dijkstra.findShortestPath(matrix, this.position, closestFire);
  }

  findShortestPathToRefuel(matrix: number[][], refuel: Position) {
    return Dijkstra.findShortestPath(matrix, this.position, refuel);
  }

  findClosestFire(fire: Fire) {
    return fire.positionsList.reduce((prev, curr) => {
      const prevDist = Math.sqrt(
        Math.pow(prev.x - this.position.x, 2) +
          Math.pow(prev.y - this.position.y, 2)
      );
      const currDist = Math.sqrt(
        Math.pow(curr.x - this.position.x, 2) +
          Math.pow(curr.y - this.position.y, 2)
      );
      return prevDist < currDist ? prev : curr;
    }, fire.positionsList[0]);
  }
}

export default Robot
