import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CustomLocation, Location } from "src/app/_models/location";


@Injectable({providedIn: 'root'})
export class LocationService {
    public location: BehaviorSubject<Location>;
    public static SavedLocations: BehaviorSubject<Location[]>;

    constructor() {
        this.location = new BehaviorSubject(new Location());
        LocationService.SavedLocations = new BehaviorSubject(<Location[]>[]);
    }

    SetLocation(location: Location) {
        this.location.next(location);
    }

    AddSavedLocation(location: Location) {
        var previous = LocationService.SavedLocations.value;
        previous.push(location);
        console.log("Saved locations now: ", previous);
        LocationService.SavedLocations.next(previous);
    }

    UpdateLatLng(id: string, position: google.maps.LatLngLiteral) {
        var currentLocation = this.location.value;
        if (id == 'location'){
            currentLocation.location = new CustomLocation(position);
        }
        else if (id == 'destination') {
            currentLocation.destination = new CustomLocation(position);
        }
        this.SetLocation(currentLocation);
    }
}