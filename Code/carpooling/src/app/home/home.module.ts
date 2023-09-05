import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HomePageRoutingModule } from './home-routing.module';
import { Layout } from '../_layout/_layout';
import { LocationSelectorComponent } from '../components/location-selector/location-selector.component';
import { LocationOnMapComponent } from './pages/location-on-map/location-on-map.component';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { MapComponent } from '../components/map/map.component';
import { GoogleApi } from '../_services/google/googleapi';
import { HTTP } from '@awesome-cordova-plugins/http';
import { AutocompleteSearchComponent } from '../components/autocomplete-search/autocomplete-search.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { SelectDriverPageComponent } from './pages/select-driver-page/select-driver-page.component';
import { DriverCardComponent } from '../components/driver-card/driver-card.component';
import { LocationService } from '../_services/google/locationService';
import { PaymentSelectorComponent } from '../components/payment-selector/payment-selector.component';
import { LocationDraggableComponent } from './pages/location-draggable/location-draggable.component';
import { SavedLocationsComponent } from '../components/saved-locations/saved-locations.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    GoogleMapsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    HomePage, 
    Layout, 
    LocationSelectorComponent, 
    LocationOnMapComponent, 
    SpinnerComponent, 
    MapComponent,
    AutocompleteSearchComponent,
    SelectDriverPageComponent,
    DriverCardComponent,
    PaymentSelectorComponent,
    LocationDraggableComponent,
    SavedLocationsComponent
  ],
  providers: [
    GoogleApi,
    HTTP,
    LocationService
  ]
})
export class HomePageModule {}
