export interface Observer {
  update(observable: Observable);
}

export interface Observable {
  listObserver: Observer[];
  addObserver(observer: Observer);
  removeObserver(observer: Observer);
  notify();
}
