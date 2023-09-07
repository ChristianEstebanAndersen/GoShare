import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { GoogleMapConfig } from '@capacitor/google-maps/dist/typings/definitions';
import { CreateMapArgs } from '@capacitor/google-maps/dist/typings/implementation';
import { NavController } from '@ionic/angular';
import { LocationSelectorComponent } from 'src/app/components/location-selector/location-selector.component';
import { MapComponent } from 'src/app/components/map/map.component';
import { CurrentLocation, Location } from 'src/app/_models/location';
import { Helper } from 'src/app/_helpers/helper';

@Component({
  selector: 'app-location-on-map',
  templateUrl: './location-on-map.component.html',
  styleUrls: ['./location-on-map.component.scss'],
})
export class LocationOnMapComponent  implements OnInit {
  @ViewChild('location_selector') locationSelector: LocationSelectorComponent |  undefined;
  @ViewChild('map') map: MapComponent |  undefined;

  basePath: string = Helper.basePath;
  isCurrent: boolean = true;
  constructor(
    private navCtrl: NavController
    ) { }

  async ngOnInit() { 
    Helper.delay(500).then(() => {
      this.setToCurrent();
    });
  }

  setToCurrent() {
    this.locationSelector?.SetCurrentLocation();
    this.isCurrent = true;
  }

  navigateBack() {
    this.navCtrl.back();
  }

  locationUpdated(location: Location) {
    if (!(location.location instanceof CurrentLocation)) {
      this.isCurrent = false;
    }

    if (location.location)
      this.map?.addMarker(location.location, 'location');
    if (location.destination)
      this.map?.addMarker(location.destination, 'destination');

    if (location.location && location.destination) {
      this.navCtrl.navigateForward('home/selectrider');
    }
  }

  setOnMap() {
    this.navCtrl.navigateForward('/home/selectLocation');
  }
}
