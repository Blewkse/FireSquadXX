import { Component, OnInit } from '@angular/core';
import { interval, Observable } from "rxjs";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private x: number = 250;
  private y: number = 250;
  private dx: number = 2;
  private dy: number = 1;

  ngOnInit(): void {
    this.drawBackground();
    this.movePointEvery10Seconds();
  }

  drawBackground() {
    const canvas = document.getElementById('mapCanvas') as HTMLCanvasElement;
    const context = canvas?.getContext('2d');

    if (canvas && context) {
      const img = new Image();
      img.src = '/assets/Pixilframe.png';

      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        const x = 250;
        const y = 250;

        context.beginPath();
        context.arc(x, y, 5, 0, 2 * Math.PI);
        context.fillStyle = 'red';
        context.fill();
        context.closePath();
      };

      img.addEventListener('error', (event) => {
        console.error("Error loading image:", event);
      });
    } else {
      console.error("Canvas element or context not found.");
    }
  }


  movePoint() {
    const canvas = document.getElementById('mapCanvas') as HTMLCanvasElement;
    const context = canvas?.getContext('2d');

    if (canvas && context) {
      this.x += this.dx;
      this.y += this.dy;

      context.beginPath();
      context.arc(this.x, this.y, 5, 0, 2 * Math.PI);
      context.fillStyle = 'red';
      context.fill();
      context.closePath();
    }
  }

  movePointEvery10Seconds() {
    const moveInterval: Observable<number> = interval(100);
    moveInterval.subscribe(() => {
      this.movePoint();
    });
  }


}
