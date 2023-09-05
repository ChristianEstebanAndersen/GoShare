import { Component, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MapMarker } from 'src/app/_models/mapMarker';
import { GoogleApi } from 'src/app/_services/google/googleapi';
import { CurrentLocation, CustomLocation } from 'src/app/_models/location';
import { LocationService } from 'src/app/_services/google/locationService';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent  implements OnInit, OnDestroy {
  @ViewChild('google_map') mapElement: any;
  @ViewChild('something') element: any;
  
  @Input() height: number = 30;
  @Input() borderRadius: string = "1rem 1rem 0px 0px";
  @Input() gestureHandling: string = 'auto';

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 57.0359808,
    lng: 9.9221504
  };
  zoom = 10;
  markers: MapMarker[] = [];

  constructor(
    private googleApi: GoogleApi,
    private locationService: LocationService
  ) {}

  async ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center.lat = position.coords.latitude;
      this.center.lng = position.coords.longitude;
    });
  }

  async addMarker(location: google.maps.places.AutocompletePrediction | undefined | CustomLocation, markerId: string, draggable: boolean = false) {
    if (!this.element) return;
    this.markers = this.markers.filter(m => m.id != markerId);
    
    // Current location selected
    if (location instanceof CustomLocation) {
      if (!location.position) return;
      var curMarker = new MapMarker();
      curMarker.id = markerId;
      curMarker.label = {
        text: location.label,
        color: 'cornflowerblue',
      };
      curMarker.position = {
        lat: location.position.lat,
        lng: location.position.lng
      };
      curMarker.options.draggable = draggable;
      
      this.markers.push(curMarker);
      this.fitMarkers();
      return;
    }

    // Google maps prediction
    if (!location?.place_id) return;

    var details = await this.googleApi.GetDetails(location?.place_id, this.element.nativeElement);
    
    // Drop a Map Marker
    let lat = details?.geometry?.location?.lat();
    let lng = details?.geometry?.location?.lng();
    if (!lat || !lng) {
      return;
    }

    var marker = new MapMarker();
    marker.position = {
      lat: lat,
      lng: lng,
    };
    marker.id = markerId;
    marker.options.draggable = draggable;
    
    this.markers.push(marker);
    this.fitMarkers();
  }

  fitMarkers() {
    console.log(this.markers);
    var bounds = new google.maps.LatLngBounds();
    this.markers.forEach(marker => {
      bounds.extend(marker.position);
    });
    
    var boundsCenter = bounds.getCenter();
    this.center = {
      lat: boundsCenter.lat(),
      lng: boundsCenter.lng(),
    };

    this.mapElement.fitBounds(bounds);
    this.zoom -1;
    if (this.zoom > 15) {
      this.zoom = 15;
    }

  }

  markerDropped(event: any, marker: MapMarker) {
    var droppedMarker = this.markers.find(m => m.id == marker.id);
    if (!droppedMarker) return;

    droppedMarker.position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    this.locationService.UpdateLatLng(droppedMarker.id, droppedMarker.position);
  }

  ngOnDestroy() {}

  darkmode = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ];
}
