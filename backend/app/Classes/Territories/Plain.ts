import TerritoryBurnable from '../TerritoryBurnable.js'

class Plain extends TerritoryBurnable {
  public propagationTime: 60
  public type: 'plain' = 'plain'
  public isBurning = false
  public canBurn = true
  public color = '#DAF8C2'
}

export default Plain
