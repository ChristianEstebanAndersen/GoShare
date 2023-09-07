import { Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from 'src/app/components/map/map.component';
import { Helper } from 'src/app/_helpers/helper';
import { Driver } from 'src/app/_models/driver';
import { Location } from 'src/app/_models/location';
import { Payment } from 'src/app/_models/payment';
import { LocationService } from 'src/app/_services/google/locationService';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-select-driver-page',
  templateUrl: './select-driver-page.component.html',
  styleUrls: ['./select-driver-page.component.scss'],
})
export class SelectDriverPageComponent  implements OnInit {
  @ViewChild('map') map: MapComponent |  undefined;
  @ViewChild('ion_modal_reserve_on_select') modalReserve: IonModal | undefined;

  drivers: Driver[] = [];
  selectedDrivers: Driver[] = [];
  payment: Payment = new Payment();
  stage: 'selectRiders' | 'confirm' | 'approved' | 'waiting' | 'contact' = 'selectRiders';
  location: Location | undefined;
  selectedReserveTime: Date | null = null;
  now: Date;
  basePath: string = Helper.basePath;

  constructor(private locationService: LocationService) { 
    this.now = new Date();
    this.drivers.push({
      id: "1",
      name: "Casper",
      stars: 4.8,
      numReviwers: 44,
      seats: 4,
      price: 10
    });
    this.drivers.push({
      id: "2",
      name: "Christian",
      stars: 4.9,
      numReviwers: 19,
      seats: 2,
      price: 12
    });
    this.drivers.push({
      id: "3",
      name: "Peter",
      stars: 3.5,
      numReviwers: 2,
      seats: 4,
      price: 8
    });
  }

  ionViewDidEnter() {
    this.reset();
  }

  reset() {
    this.stage = 'selectRiders';
    this.payment = new Payment();
    this.selectedDrivers = [];
  }

  ngOnInit() {
    this.locationService.location.subscribe(location => {
      Helper.delay(500).then(() => {
        this.location = location;
        if (location.location)
          this.map?.addMarker(location.location, 'location');
        if (location.destination)
          this.map?.addMarker(location.destination, 'destination');
      })
    });
  }

  selectedDriver(value: { selected: Boolean, driver: Driver | undefined }) {
    var contains = this.selectedDrivers.some(d => d.id == value.driver?.id);
    if (value.selected && !contains && value.driver) {
      this.selectedDrivers.push(value.driver);
    }
    else if (!value.selected && contains && value.driver) {
      this.selectedDrivers = this.selectedDrivers.filter(d => d.id != value.driver!.id);
    }
  }

  selectPayment(payment: Payment) {
    this.payment = payment;
  }

  async RequestDrivers() {
    this.stage = 'confirm';
    
    await Helper.delay(2000);
    this.stage = 'approved';

    await Helper.delay(2000);
    this.stage = 'waiting';

    await Helper.delay(2000);
    this.stage = 'contact';  
  }

  onWillDismissReserve() {
  }

  cancelReserve() {
    this.modalReserve?.dismiss(null, 'cancel');
  }

  selectReserveTime() {
    this.modalReserve?.dismiss(null, 'confirm');
    if (this.location)
      this.location.time = this.selectedReserveTime;
  }
}
