import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: [NavbarComponent, RouterOutlet],
  standalone: true,
})
export class MapComponent implements OnInit {
  private points: {
    x: number;
    y: number;
    radius: number;
    targetRadius: number;
    growthSpeed: number;
  }[] = [];

  ngOnInit(): void {
    this.initializeMap();
    this.addClickEventListener();
    this.startPointGrowth();
  }

  initializeMap() {
    const canvas = document.getElementById('mapCanvas') as HTMLCanvasElement;
    const context = canvas?.getContext('2d');

    if (canvas && context) {
      const img = new Image();
      img.src = '/assets/Pixilframe.png';

      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        this.drawPoints();
      };

      img.addEventListener('error', (event) => {
        console.error('Error loading image:', event);
      });
    } else {
      console.error('Canvas element or context not found.');
    }
  }

  drawPoint(x: number, y: number, radius: number) {
    const canvas = document.getElementById('mapCanvas') as HTMLCanvasElement;
    const context = canvas?.getContext('2d');

    if (canvas && context) {
      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI);
      context.fillStyle = 'red';
      context.fill();
      context.closePath();
    }
  }

  drawPoints() {
    for (const point of this.points) {
      this.drawPoint(point.x, point.y, point.radius);
    }
  }

  addClickEventListener() {
    const canvas = document.getElementById('mapCanvas') as HTMLCanvasElement;

    if (canvas) {
      canvas.addEventListener('click', (event) => {
        const x = event.clientX - canvas.getBoundingClientRect().left;
        const y = event.clientY - canvas.getBoundingClientRect().top;
        const minRadius = 5; // Taille minimale du point
        const maxRadius = 80; // Taille maximale du point
        const radius = Math.random() * (minRadius - 1) + 1; // Taille aléatoire entre 1 et minRadius
        const targetRadius =
          Math.random() * (maxRadius - minRadius) + minRadius; // Taille aléatoire entre minRadius et maxRadius
        const growthSpeed = 1; // Vitesse de croissance du point

        this.points.push({ x, y, radius, targetRadius, growthSpeed });
        this.drawPoints(); // Ajout pour redessiner les points immédiatement après un clic
      });
    }
  }

  startPointGrowth() {
    setInterval(() => {
      for (const point of this.points) {
        if (point.radius < point.targetRadius) {
          point.radius += point.growthSpeed;
        }
      }
      this.drawPoints();
    }, 200);
  }
}
