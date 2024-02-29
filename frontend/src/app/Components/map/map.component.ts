import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  HostListener
} from '@angular/core';
import { MapService } from '../../services/map-service.service';
import { NavbarComponent } from '../navbar/navbar/navbar.component';
import Village from '../../../../../backend/app/Classes/Territories/Village';

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
  villagesArray: Village[] = [];
  @ViewChild('mapCanvas') mapCanvas!: ElementRef<HTMLCanvasElement>;

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.getMousePosition(event);
  }

  constructor(private mapService: MapService) {}
  ngAfterViewInit(): void {
    this.mapService.getMap().subscribe((data) => {
      this.mapTiles = data.data;
      this.drawMap();
    });
  }

  getMousePosition(event: MouseEvent) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    console.log('Mouse position:', mouseX, mouseY); // Débogage

    for (const village of this.villagesArray) {
      if (village.position) {
        const villageX = village.position.x;
        const villageY = village.position.y;

        console.log('Village position:', villageX, villageY); // Débogage

        const distanceThreshold = 10; // Ajustez cette valeur selon votre préférence
        if (Math.abs(mouseX - villageX) <= distanceThreshold && Math.abs(mouseY - villageY) <= distanceThreshold) {
          console.log(`La souris est sur le village ${village.name}`);
          break;
        }
      }
    }
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
