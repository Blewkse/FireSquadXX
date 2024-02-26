import Pyromane from "./Fire";

class PyromaneFactory {
  static create(position: { x: number; y: number }) {
    const pyromane = new Pyromane();
    pyromane.positionsList = [position];
   
    return pyromane;
  }

  static update(pyromane: Pyromane, newPosition: { x: number; y: number }) {
    const { positionsList } = pyromane;
    positionsList.push(newPosition);
  }
  
}

export default PyromaneFactory;
