import {
  Casern,
  Forest,
  Road,
  Mountain,
  Plain,
  Water,
  Village,
} from "./Territories/index";
import TerritoryBurnable from "./TerritoryBurnable";
import TerritoryUnburnable from "./TerritoryUnburnable";

type MapPoint = {
  x: number;
  y: number;
};

export default class MapGenerator {
  private static instance: MapGenerator;
  private mapPixels: (TerritoryBurnable | TerritoryUnburnable)[][];

  private width: Number;
  private height: Number;

  constructor() {
    console.log("Constructing...");
    this.mapPixels = [];
  }

  public static getInstance(): MapGenerator {
    if (!MapGenerator.instance) {
      this.instance = new MapGenerator();
    }
    return this.instance;
  }

  private setPoint(
    x: number,
    y: number,
    pointType: TerritoryBurnable | TerritoryUnburnable
  ) {
    if (!this.mapPixels[x]) {
      this.mapPixels[x] = [];
    }
    this.mapPixels[x][y] = pointType;
  }

  public generateMap(width: number, height: number): void {
    this.width = width;
    this.height = height;
    const villagesList: MapPoint[] = [];

    //creation de la caserne
    let center: MapPoint = {
      x: 0,
      y: 0,
    };
    center.x = width % 2 === 0 ? width / 2 : Math.floor(width / 2) + 1;
    center.y = height % 2 === 0 ? height / 2 : Math.floor(height / 2) + 1;
    villagesList.push(center);

    this.setPoint(center.x, center.y, new Casern());

    console.log("1");
    //creation des forets
    let forestCount = 0;
    while (forestCount < 5) {
      const randomPoint: MapPoint = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
      };
      forestCount++;
      this.setPoint(randomPoint.x, randomPoint.y, new Forest());
      const radius = Math.floor(Math.random() * 100);
      for (let i = randomPoint.x - radius; i < randomPoint.x + radius; i++) {
        for (let j = randomPoint.y - radius; j < randomPoint.y + radius; j++) {
          this.setPoint(i, j, new Water());
        }
      }
    }

    console.log("2");

    //creation des lacs
    let lakeCount = 0;
    while (lakeCount < 4) {
      const randomPoint: MapPoint = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
      };
      lakeCount++;
      this.setPoint(randomPoint.x, randomPoint.y, new Water());
      const radius = Math.floor(Math.random() * 100);
      for (let i = randomPoint.x - radius; i < randomPoint.x + radius; i++) {
        for (let j = randomPoint.y - radius; j < randomPoint.y + radius; j++) {
          this.setPoint(i, j, new Water());
        }
      }
    }

    //creation des villages
    let villagesCount = 0;
    while (villagesCount < 10) {
      let randomPoint: MapPoint;

      do {
        randomPoint = {
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height),
        };
      } while (
        (randomPoint.x - center.x < 30 && randomPoint.y - center.y < 30) ||
        (this.mapPixels[randomPoint.x] &&
          this.mapPixels[randomPoint.x][randomPoint.y] instanceof Water)
      );
      villagesCount++;
      this.setPoint(randomPoint.x, randomPoint.y, new Village());
      villagesList.push(randomPoint);
      const radius = 10;
      for (let i = randomPoint.x - radius; i < randomPoint.x + radius; i++) {
        for (let j = randomPoint.y - radius; j < randomPoint.y + radius; j++) {
          this.setPoint(i, j, new Village());
        }
      }
    }

    //creation des chemins
    // const maxDistance = 200;
    // for(let i = 0; i < villagesList.length; i++){
    //     const currentVillage = villagesList[i];
    //     for(let j = 0; j < villagesList.length; j++){

    //     }
    // }
    for (let i = 0; i < this.mapPixels.length; i++) {
      if (!this.mapPixels[i]) {
        this.mapPixels[i] = [];
      }
      for (let j = 0; j < this.mapPixels[i].length; j++) {
        if (this.mapPixels[i][j] === undefined) {
          this.setPoint(i, j, new Plain());
        }
      }
    }
  }

  private calculateDistances(point1: MapPoint, point2: MapPoint) {
    return (
      Math.sqrt(Math.pow(point1.x - point2.x, 2)) +
      Math.sqrt(Math.pow(point1.y - point2.y, 2))
    );
  }

  public getMapPixels(): (TerritoryBurnable | TerritoryUnburnable)[][] {
    return this.mapPixels;
  }
}
