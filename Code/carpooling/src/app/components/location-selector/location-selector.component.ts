import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { Helper } from 'src/app/_helpers/helper';
import { CurrentLocation, Location } from 'src/app/_models/location';
import { LocationService } from 'src/app/_services/google/locationService';

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss'],
})
export class LocationSelectorComponent  implements OnInit {
  @ViewChild('ion_modal_location') modalLocation: IonModal | undefined;
  @ViewChild('ion_modal_destination') modalDestination: IonModal | undefined;
  @Output('locationUpdated') updateLocation: EventEmitter<Location> = new EventEmitter();
  @Input() onlyDest: boolean = false;
  @Input() destLabel: string = "Set destination";
  @Input() posLabel: string = "Set location";

  location: Location;
  locationColor: string = "white";

  idLocation: string = "location-modal-" + Math.random().toFixed(5);
  idDestination: string = "location-modal-" + Math.random().toFixed(5);

  basePath: string = Helper.basePath;

  constructor(
    locationService: LocationService
  ) { 

    this.location = new Location();
    locationService.location.subscribe(location => {
      console.log("New location selected: ", location);
      this.location = location;
    });
    
    this.updateLocation.subscribe(location => {
      locationService.SetLocation(location);
    });
  }

  ngOnInit() {}

  SetCurrentLocation(draggable: boolean = false) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.location.locationLabel = "Current location";
      var curLocation = new CurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }); 
      this.location.draggable = draggable;
      this.locationColor = "#5360E2";
      this.location.location = curLocation;
      this.updateLocation.emit(this.location);
    });
  }

  Reset() {
    this.location = new Location();
  }

  logLocation() {
    console.log(this.location);
  }

  cancel(field: 'destination' | 'location') {
    if (field == 'destination') {
      this.modalDestination?.dismiss(null, 'cancel');
    }
    else {
      this.modalLocation?.dismiss(null, 'cancel');
    }
  }

  selectLocation(value: google.maps.places.AutocompletePrediction, field: 'destination' | 'location') {
    console.log("select");
    if (field == 'destination') {
      this.modalDestination?.dismiss(value, 'confirm');
    }
    else {
      this.locationColor = "white";
      this.modalLocation?.dismiss(value, 'confirm');
    }
  }

  onWillDismiss(event: Event, field: 'destination' | 'location') {
    const ev = event as CustomEvent<OverlayEventDetail<google.maps.places.AutocompletePrediction>>

    if (ev.detail.data) {
      if (field == 'destination') {
        this.location.destinationLabel = ev.detail.data.description;
        this.location.destination = ev.detail.data;
      }
      else {
        this.location.locationLabel = ev.detail.data.description;
        this.location.location = ev.detail.data;
      }
      this.updateLocation.emit(this.location);
    }
  }

  GetDate(): Date | null {
    return this.location.time;
  }

  SetDate(date: Date | null) {
    this.location.time = date;
  }
}
