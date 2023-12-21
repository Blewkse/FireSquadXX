abstract class TerritoryBurnable {
  public propagationTime: number;
  public type: "forest" | "mountain" | "plain";
  public isBurning: boolean;
  public color: string;
  public closerTerritories: [TerritoryBurnable | TerritoryUnburnable];

  updateBurningState = () => {
    this.closerTerritories.forEach(
      (territory: TerritoryBurnable | TerritoryUnburnable) => {
        if (territory instanceof TerritoryBurnable) {
          setTimeout(() => {
            this.isBurning = true;
          }, this.propagationTime);
        }
      }
    );
  };
}

abstract class TerritoryUnburnable {
  public type: "city" | "road" | "casern" | "water";
  public color: string;
}

class Forest extends TerritoryBurnable {
  public propagationTime = 30;
  public type: "forest" = "forest";
  public isBurning = false;
  public canBurn = true;
  public color = "#55AE58";
}

class Mountain extends TerritoryBurnable {
  public propagationTime: 120;
  public type: "mountain" = "mountain";
  public isBurning = false;
  public canBurn = true;
  public color = "#464646";
}

class Plain extends TerritoryBurnable {
  public propagationTime: 60;
  public type: "plain" = "plain";
  public isBurning = false;
  public canBurn = true;
  public color = "#DAF8C2";
}

class Water extends TerritoryUnburnable {
  public type: "water" = "water";
  public color = "#52B4EA";
}

class City extends TerritoryUnburnable {
  public type: "city" = "city";
  public color = "#EF8532";
}

class Road extends TerritoryUnburnable {
  public type: "road" = "road";
  public color = "#000000";
}

class Casern extends TerritoryUnburnable {
  public type: "casern" = "casern";
  public color = "#DA3832";
}

export {
  TerritoryBurnable,
  TerritoryUnburnable,
  Forest,
  Mountain,
  Plain,
  Water,
  City,
  Road,
  Casern,
};
