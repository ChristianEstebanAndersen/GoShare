import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { LocationService } from 'src/app/_services/google/locationService';
import { Location } from 'src/app/_models/location';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-saved-locations',
  templateUrl: './saved-locations.component.html',
  styleUrls: ['./saved-locations.component.scss'],
})
export class SavedLocationsComponent  implements OnInit {
  @ViewChild('ion_modal_saved_locations') modalSavedLocations: IonModal | undefined;
  @Output("selectLocation") selectLocation: EventEmitter<Location> = new EventEmitter();

  savedLocations: Location[] = [];
  selectedServiceLocation: Location | null = null;

  constructor(
    private locationService: LocationService
  ) { }

  subscriptions: Subscription[] = [];

  ngOnInit() {
    var savedSub = LocationService.SavedLocations.subscribe(s => {
      console.log("Saved locations: ", s);
      this.savedLocations = s;
    });

    var locationSub = this.locationService.location.subscribe(l => {
      this.selectedServiceLocation = l;
      this.savedLocations.forEach(s => {
        s.location = l.location;
        s.locationLabel = l.locationLabel;
      });
    });
    this.subscriptions.push(savedSub, locationSub);
  }

  addSaved(event: google.maps.places.AutocompletePrediction) {
    console.log(event);
    if (event) {
      var location = new Location();
      location.destinationLabel = event.description;
      location.destination = event;
      location.location = this.selectedServiceLocation?.location;
      location.locationLabel = this.selectedServiceLocation?.locationLabel ?? "Not set";
      this.locationService.AddSavedLocation(location);
    }
  }

  cancel() {
    this.modalSavedLocations?.dismiss();
  }

  onWillDismiss() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  selectedLocation(location: Location) {
    console.log(location);
    this.selectLocation.emit(location);
    this.locationService.SetLocation(location);
    this.modalSavedLocations?.dismiss();
  }
}
