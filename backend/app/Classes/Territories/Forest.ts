import TerritoryBurnable from '../TerritoryBurnable.js'

export default class Forest extends TerritoryBurnable {
  public propagationTime = 30
  public type: 'forest' = 'forest'
  public isBurning = false
  public canBurn = true
  public color = '#405A31'
}
