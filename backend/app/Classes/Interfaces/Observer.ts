interface Observer {
  update(observable: Observable);
}

interface Observable {
  listObserver: Observer[];
  addObserver(observer: Observer);
  removeObserver(observer: Observer);
  notify(observable: Observable);
}
