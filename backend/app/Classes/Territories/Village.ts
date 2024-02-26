import TerritoryUnburnable from '../TerritoryUnburnable.js'

export default class Village extends TerritoryUnburnable {
  public override type: 'village' = 'village'; // Ajoutez 'override' ici
  public override color?: string = '#AB5049'; // Ajoutez 'override' ici
  public id: number;
  public  name: string; // Ajoutez 'override' ici
  public override position?: { y: number; x: number }; // Ajoutez 'override' ici
  public region: string = '';

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
