import Fire from "./Fire";
import { Observable, Observer } from "./Interfaces/Observer";

class FireFactory implements Observable {
  listObserver: Observer[];

  fireList: Fire[];

  timer: NodeJS.Timer | null;

  comstructor() {}

  public startFactory(): void {}

  public stopFactory(): void {}

  static create(position: { x: number; y: number }): Fire {
    const fire = new Fire();
    fire.positionsList = [position];
    return fire;
  }

  static update(fire: Fire, newPosition: { x: number; y: number }) {
    const { positionsList } = fire;
    positionsList.push(newPosition);
  }

  addObserver(observer: Observer): void {
    this.listObserver.push(observer);
  }

  removeObserver(observer: Observer): void {
    const index = this.listObserver.findIndex((elem) => {
      elem == observer;
    });
    this.listObserver.splice(index, 1);
  }

  notify(): void {
    this.listObserver.forEach((observer) => {
      observer.update(this);
    });
  }

  getFireList(): Fire[] {
    return this.fireList;
  }
}

export default FireFactory;
