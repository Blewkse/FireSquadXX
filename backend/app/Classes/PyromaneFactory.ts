import Pyromane from './Pyromane.js'

class PyromaneFactory {
  static create(position: { x: number; y: number }) {
    return new Pyromane(position)
  }

  static update(pyromane: Pyromane, newPosition: { x: number; y: number }) {
    pyromane.position = newPosition
  }
  
}

export default PyromaneFactory
