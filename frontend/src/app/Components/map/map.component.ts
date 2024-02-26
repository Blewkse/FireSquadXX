import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MapService } from '../../services/map-service.service';
import { NavbarComponent } from '../navbar/navbar/navbar.component';
import { Subscription, interval } from 'rxjs';

type Tile = {
  color: string;
  type: string;
};

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  imports: [NavbarComponent],
  providers: [MapService],
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit {
  mapTiles: Tile[][] = [];
  transMapTiles: Tile[][] = [];

  @ViewChild('mapCanvas') mapCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('mapCanvasTransparent') mapCanvasTransparent!: ElementRef<HTMLCanvasElement>;

  canvasUpdateSubscription: Subscription = new Subscription();
  constructor(private mapService: MapService) {}
  ngAfterViewInit(): void {
    this.mapService.getMap().subscribe((data) => {
      this.mapTiles = data.data;
      this.drawMap();
    });
  }

  onSecondCanvasClick(): void {
    const canvas: HTMLCanvasElement = this.mapCanvasTransparent.nativeElement;
    const context = canvas.getContext('2d');
    canvas.width = canvas.height = 750;
    // Dessinez quelque chose sur le deuxième canvas (pour illustration)
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle ='black'; // Provide a default value for the fillStyle property
      context.fillRect(1, 1, 10, 10);
    }
  }

  getPixelColorFromFirstCanvas(x: number, y: number): string | undefined {
    const canvas: HTMLCanvasElement = this.mapCanvas.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      // Récupérer les données du pixel sur le premier canvas
      const pixelData = context.getImageData(x, y, 1, 1).data;

      // Convertir les données RGBA en une chaîne de couleur CSS
      const color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
      return color;
    }
    return undefined;
  }


drawMapTrans(array:any[], x:number,y:number): void {
  const canvas = this.mapCanvasTransparent.nativeElement;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  array.forEach((row, i) => {
    ctx.fillStyle = row.color;
    ctx.fillRect(row.x, row.y, 4,4);


  });
 
}

  drawMap(): void {
    const canvas = this.mapCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.height = 750;
    if (!ctx) return;

    const tileSize = 4;

    if (!this.mapTiles) return;

    for (let i = 0; i < this.mapTiles.length; i++) {
      for (let j = 0; j < this.mapTiles[i].length; j++) {
        ctx.fillStyle = this.mapTiles[i][j].color;
        ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
      }
    }
   
  }
}
