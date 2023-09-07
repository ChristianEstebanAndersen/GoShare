import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, NavController } from '@ionic/angular';
import { Location } from 'src/app/_models/location';
import { LocationSelectorComponent } from '../components/location-selector/location-selector.component';
import { MapComponent } from '../components/map/map.component';
import { Helper } from '../_helpers/helper';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('ion_modal_reserve') modalReserve: IonModal | undefined;
  @ViewChild(MapComponent) map: MapComponent | undefined;
  @ViewChild(LocationSelectorComponent) locationSelector: LocationSelectorComponent | undefined;

  basePath: string = Helper.basePath;
  selectedLocation: Location | undefined;
  now: Date;
  selectedReserveTime: Date | null = null;

  constructor(private navCtrl: NavController) { 
    this.now = new Date();
  }
  
  ngOnInit(): void {
    Helper.delay(500).then(() => {
      this.reset();
    });
  }

  ionViewDidEnter() {
    this.reset();
  }

  reset() {
    this.locationSelector?.Reset();
    this.locationSelector?.SetCurrentLocation();
  }

  login() {
    this.navCtrl.navigateBack("");
  }

  async updateLocation(location: Location) {
    console.log(location);
    this.selectedLocation = location;

    if (this.map && location.location) {
      await this.map.addMarker(location.location, "location");
    }
    if (this.map && location.destination) {
      await this.map.addMarker(location.destination, "destination");
    }
    
    if (location.destination && location.location) {
      this.navCtrl.navigateForward('/home/selectrider');
    }
  }

  onWillDismissReserve() {
  }

  cancelReserve() {
    this.modalReserve?.dismiss(null, 'cancel');
  }

  selectReserveTime() {
    this.modalReserve?.dismiss(null, 'confirm');
    this.locationSelector?.SetDate(this.selectedReserveTime);
    this.navCtrl.navigateForward('/home/pickLocation');
  }

  selectLocationOnMap() {
    this.navCtrl.navigateForward('/home/selectLocation');
  }
}
