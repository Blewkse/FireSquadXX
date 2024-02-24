import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MapService } from '../../services/map-service.service';
import { NavbarComponent } from '../navbar/navbar/navbar.component';

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
  @ViewChild('mapCanvas') mapCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private mapService: MapService) {}
  ngAfterViewInit(): void {
    this.mapService.getMap().subscribe((data) => {
      this.mapTiles = data.data;
      this.drawMap();
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
