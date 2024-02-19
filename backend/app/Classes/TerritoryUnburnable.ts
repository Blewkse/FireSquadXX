abstract class TerritoryUnburnable {
  public type: 'road' | 'casern' | 'water' | 'village'
  public color: string
  public position: { x: number; y: number }
}

export default TerritoryUnburnable
