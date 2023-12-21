import Robot from "./Robots/Robot";
import { robotType } from "./Robots/enumRobot";

class Fire {
  public positionsList: { x: number; y: number }[];
  private robotsList: Robot[];
  private pdv: number;
  private nbExtincteur: number = 0;
  private intervalAttacking: NodeJS.Timeout | null;

  addRobot(robot: Robot) {
    if (robot.type === robotType.extincteur) {
      this.nbExtincteur++;
      if (this.nbExtincteur > 0) {
        this.putOutFire();
      }
    }
    this.robotsList.push(robot);
  }

  removeRobot(robot: Robot) {
    const index = this.robotsList.findIndex((elem) => {
      elem.id === robot.id;
    });
    this.robotsList.slice(index, 1);
    if (robot.type === robotType.extincteur) this.nbExtincteur--;
    if (this.nbExtincteur == 0) {
      this.putInFire();
    }
  }

  putOutFire() {
    this.intervalAttacking = setInterval(() => {
      this.pdv - 50 * this.nbExtincteur;
    }, 1000);
  }

  putInFire() {
    this.intervalAttacking = null;
  }
}

export default Fire;
