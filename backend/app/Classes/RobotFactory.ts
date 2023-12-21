import Robot from "./Robot";
import Citerne from "./Citerne";
import Rapido from "./Rapido";
import Extincteur from "./Extincteur";
import { robotState, robotType } from "./enumRobot";

class RobotFactory {
  listRobot: Array<Robot> = [];

  public instantiateCasern() {
    this.listRobot.push(new Citerne());
    this.listRobot.push(new Citerne());
    this.listRobot.push(new Citerne());
    this.listRobot.push(new Rapido());
    this.listRobot.push(new Rapido());
    this.listRobot.push(new Rapido());
    this.listRobot.push(new Rapido());
    this.listRobot.push(new Rapido());
    this.listRobot.push(new Rapido());
    this.listRobot.push(new Rapido());
    this.listRobot.push(new Rapido());
    this.listRobot.push(new Extincteur());
    this.listRobot.push(new Extincteur());
    this.listRobot.push(new Extincteur());
    this.listRobot.push(new Extincteur());
    this.listRobot.push(new Extincteur());
  }
}
