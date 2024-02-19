import TerritoryBurnable from '../TerritoryBurnable.js'

class Plain extends TerritoryBurnable {
  public type: 'plain' = 'plain'
  public isBurning = false
  public canBurn = true
  public color = '#718C60'
}

export default Plain
