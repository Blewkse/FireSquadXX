import Pyromane from './Pyromane.js'

class PyromaneFactory {
  static create(position: { x: number; y: number }) {
    const pyromane = new Pyromane()
    pyromane.position = position

    return pyromane
  }

  static update(pyromane: Pyromane, newPosition: { x: number; y: number }) {
    pyromane.position = newPosition
  }
  
}

export default PyromaneFactory
