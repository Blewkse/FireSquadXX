import TerritoryBurnable from "./TerritoryBurnable";

class Mountain extends TerritoryBurnable {
  public propagationTime: 120;
  public type: "mountain" = "mountain";
  public isBurning = false;
  public canBurn = true;
  public color = "#464646";
}

export default Mountain;
