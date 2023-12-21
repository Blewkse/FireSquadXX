import { TerritoryBurnable } from "./TerritoryBurnable";

export class Mountain extends TerritoryBurnable {
  public propagationTime: 120;
  public type: "mountain" = "mountain";
  public isBurning = false;
  public canBurn = true;
  public color = "#464646";
}
