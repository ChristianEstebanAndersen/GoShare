export class Location {
    locationLabel: string = "";
    location: google.maps.places.AutocompletePrediction | undefined | CustomLocation;
    
    destinationLabel: string = "";
    destination: google.maps.places.AutocompletePrediction | undefined | CustomLocation;

    time: Date | null = null;

    draggable: boolean = false;
}

export class CustomLocation {
    constructor(pos: google.maps.LatLngLiteral) {
        this.position = pos;
    }
    
    label: string = "Custom location";
    position: google.maps.LatLngLiteral | undefined;
}

export class CurrentLocation extends CustomLocation {
    constructor(pos: google.maps.LatLngLiteral) {
        super(pos);
        this.label = "Current Location";
    }
    
}
