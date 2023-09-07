import { v4 as uuid } from 'uuid';

export class MapMarker {
    constructor() {
        this.id = uuid();
        this.options = { 
            draggable: false, 
            animation: google.maps.Animation.DROP, 
            icon: null, /*{
                url: '{{ basePath }}/svg/location-outline.svg',
                scaledSize: new google.maps.Size(50, 50),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 0),
            }*/
        };
        this.position = { lat: 0, lng: 0 };
        this.visible = true;
        this.opacity = 1;
        this.label = { color: 'black', text: "" };
        this.title = "";
    }

    id: string;
    position: google.maps.LatLngLiteral;
    visible: boolean;
    opacity: number;
    label: {
        color: string,
        text: string;
    };
    title: string;
    options: {
        draggable: boolean,
        animation: google.maps.Animation,
        icon: string | null | { url: string, scaledSize: google.maps.Size, origin: google.maps.Point, anchor: google.maps.Point }
    };
}
