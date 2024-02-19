import TerritoryBurnable from '../TerritoryBurnable.js'

class Mountain extends TerritoryBurnable {
  public type: 'mountain' = 'mountain'
  public isBurning = false
  public canBurn = true
  public color = '#C9C5CB'
}

export default Mountain
