export interface Observer {
  update(observable: Observable): void
}

export interface Observable {
  listObserver: Observer[]
  addObserver(observer: Observer): void
  removeObserver(observer: Observer): void
  notify(): void
}
