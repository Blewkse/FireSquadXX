import TerritoryUnburnable from '../TerritoryUnburnable.js'

export default class Village extends TerritoryUnburnable {
  public type: 'village' = 'village'
  public color = '#AB5049'
  public id: number
  public name: string
  public position: { y: number; x: number }
  region: string = ''

  constructor(id: number, position: { y: number; x: number }) {
    super()
    this.id = id
    this.position = position
    const names = [
      'Tarnstead',
      'Coniston',
      'Black Hallows',
      'Boatwright',
      'Lullin',
      'Wheldrake',
      'Clacton',
      "Knife's Edge",
      'Haling Cove',
      'Fallkirk',
    ]

    const randomI = Math.floor(Math.random() * 9)
    this.name = names[randomI]
  }
}
