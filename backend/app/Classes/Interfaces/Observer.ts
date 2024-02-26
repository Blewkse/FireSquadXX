type Observer<T> = (data: T) => void

export class Observable<T> {
  listObserver: Observer<T>[]

  constructor() {
    this.listObserver = []
  }

  addObserver(observer: Observer<T>): void {
    this.listObserver.push(observer)
  }

  removeObserver(observer: Observer<T>): void {
    const index = this.listObserver.findIndex((elem) => {
      elem === observer
    })
    this.listObserver.splice(index, 1)
  }

  notify(data: T): void {
    this.listObserver.forEach((observer) => {
      observer(data)
    })
  }
}
