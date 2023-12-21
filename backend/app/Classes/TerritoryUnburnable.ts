export abstract class TerritoryUnburnable {
  public type: "city" | "road" | "casern" | "water";
  public color: string;
  public position: { x: number; y: number };
}
