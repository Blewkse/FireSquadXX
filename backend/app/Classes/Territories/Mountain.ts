import TerritoryBurnable from "../TerritoryBurnable";

class Mountain extends TerritoryBurnable {
  public propagationTime: 120;
  public type: "mountain" = "mountain";
  public isBurning = false;
  public canBurn = true;
  public color = "#C9C5CB";
}

export default Mountain;
