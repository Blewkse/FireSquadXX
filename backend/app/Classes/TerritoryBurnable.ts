abstract class TerritoryBurnable {
  public propagationTime: number;
  public type: "forest" | "mountain" | "plain";
  public isBurning: boolean;
  public color: string;
  public position: { x: number; y: number };
  public mapMatrix: (TerritoryBurnable | TerritoryUnburnable)[][];

  updateBurningState = (fire: Fire) => {
    const { x, y } = this.position;
    const { mapMatrix } = this;
    const neighbors = [
      mapMatrix[x - 1] && mapMatrix[x - 1][y],
      mapMatrix[x + 1] && mapMatrix[x + 1][y],
      mapMatrix[x][y - 1],
      mapMatrix[x][y + 1],
      mapMatrix[x - 1] && mapMatrix[x - 1][y - 1],
      mapMatrix[x - 1] && mapMatrix[x - 1][y + 1],
      mapMatrix[x + 1] && mapMatrix[x + 1][y - 1],
      mapMatrix[x + 1] && mapMatrix[x + 1][y + 1],
    ];
    const burningNeighbors = neighbors.filter(
      (neighbor) => neighbor instanceof TerritoryBurnable && neighbor.isBurning
    );
    const hasBurningNeighbor = burningNeighbors.length > 0;
    const isBurning = this.isBurning;
    if (!isBurning && hasBurningNeighbor) {
      setTimeout(() => {
        this.isBurning = true;
        FireFactory.update(fire, this.position);
      }, this.propagationTime * 1000);
    }
  };
}
