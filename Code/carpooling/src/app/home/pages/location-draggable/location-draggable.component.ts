import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Helper } from 'src/app/_helpers/helper';
import { LocationSelectorComponent } from 'src/app/components/location-selector/location-selector.component';
import { MapComponent } from 'src/app/components/map/map.component';
import { CurrentLocation, Location } from 'src/app/_models/location';
import { MapMarker } from 'src/app/_models/mapMarker';

@Component({
  selector: 'app-location-draggable',
  templateUrl: './location-draggable.component.html',
  styleUrls: ['./location-draggable.component.scss'],
})
export class LocationDraggableComponent  implements OnInit {
  @ViewChild('location_selector') locationSelector: LocationSelectorComponent |  undefined;
  @ViewChild('map') map: MapComponent |  undefined;
  
  showVerify: boolean = false;
  mapHeight: number = 80;
  textHeight: number = 20;

  constructor(
    private navCtrl: NavController
  ) { }

  async ngOnInit() { 
    Helper.delay(500).then(() => {
      this.reset();
    });
  }

  ionViewDidEnter() {
    this.reset();
  }

  reset() {
    this.locationSelector?.Reset();
    this.setToCurrent();
    this.showVerify = false;
    this.mapHeight = 80;
    this.textHeight = 20;
  }

  setToCurrent() {
    this.locationSelector?.SetCurrentLocation(true);
  }

  navigateBack() {
    this.navCtrl.back();
  }

  locationUpdated(location: Location) {
    location.draggable = true;
    if (location.location)
      this.map?.addMarker(location.location, 'location', true);
    if (location.destination)
      this.map?.addMarker(location.destination, 'destination', true);

    if (location.location && location.destination) {
      this.showVerify = true;
      this.mapHeight = 65;
      this.textHeight = 35;
    }
  }

  confirmDestination() {
    this.navCtrl.navigateForward("/home/selectrider");
  }
}
