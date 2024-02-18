import TerritoryBurnable from "../TerritoryBurnable";

export default class Forest extends TerritoryBurnable {
  public propagationTime = 30;
  public type: "forest" = "forest";
  public isBurning = false;
  public canBurn = true;
  public color = "#55AE58";
}
