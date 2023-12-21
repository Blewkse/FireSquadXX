import Fire from "./Fire";

class FireFactory {
  static create(position: { x: number; y: number }) {
    const fire = new Fire();
    fire.positionsList = [position];
    fire.robotsList = [];
    return fire;
  }

  static update(fire: Fire, newPosition: { x: number; y: number }) {
    const { positionsList } = fire;
    positionsList.push(newPosition);
  }
}

export default FireFactory;
