import { Routes } from '@angular/router';
<<<<<<< HEAD
import { MapComponent } from "./components/map/mapw.component";
import { HomeComponent } from "./components/home/home/home.component";
=======
import { MapComponent } from './components/map/map.component';
import { HomeComponent } from './components/home/home/home.component';
>>>>>>> 21ca3157f10923a544d661acbd3f5362d7c59fac

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'map', component: MapComponent },
  { path: '', component: MapComponent, pathMatch: 'full' },
];
