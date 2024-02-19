import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from "./components/map/map.component";
import { NavbarComponent } from "./components/navbar/navbar/navbar.component";

@Component({
  selector: 'app-root',
<<<<<<< HEAD
=======
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MapComponent,
    NavbarComponent
  ],
>>>>>>> f5eddbd3ef424a62c0096c08c352bbb0e1120df0
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {

  }
}
