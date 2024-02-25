import Village from './Village.js'

export default class Casern extends Village {
  public type: 'village' = 'village'
  public color = '#F93943'
  public isCasern: boolean = true

  constructor(id: number, position: { y: number; x: number }) {
    super(id, position)
  }
}
