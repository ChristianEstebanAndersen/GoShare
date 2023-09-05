import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from '../_layout/_layout';
import { HomePage } from './home.page';
import { LocationOnMapComponent } from './pages/location-on-map/location-on-map.component';
import { SelectDriverPageComponent } from './pages/select-driver-page/select-driver-page.component';
import { LocationDraggableComponent } from './pages/location-draggable/location-draggable.component';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: HomePage
      },
      {
        path: 'pickLocation',
        component: LocationOnMapComponent
      },
      {
        path: 'selectrider',
        component: SelectDriverPageComponent
      },
      {
        path: 'selectLocation',
        component: LocationDraggableComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
