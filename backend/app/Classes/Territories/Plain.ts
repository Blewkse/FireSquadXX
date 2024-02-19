import TerritoryBurnable from "../TerritoryBurnable";

class Plain extends TerritoryBurnable {
  public propagationTime: 60;
  public type: "plain" = "plain";
  public isBurning = false;
  public canBurn = true;
  public color = "#718C60";
}

export default Plain;
