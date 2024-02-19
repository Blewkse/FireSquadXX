import { Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { HomeComponent } from './components/home/home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'map', component: MapComponent },
  { path: '', component: MapComponent, pathMatch: 'full' },
];
