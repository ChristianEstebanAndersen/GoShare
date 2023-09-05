import { Injectable } from "@angular/core";
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class GoogleApi {
    GoogleAutocomplete;
    
    public constructor(private client: HTTP, private httpClient: HttpClient ) {
        this.GoogleAutocomplete = new google.maps.places.AutocompleteService()
    }

    public AutoComplete(input: string): Promise<google.maps.places.AutocompletePrediction[] | null> {
        return new Promise((resolve, reject) => {
            let autocomplete = { input: input };

            if (autocomplete.input === '') {
                resolve([]);
            }

            this.GoogleAutocomplete.getPlacePredictions({ input: autocomplete.input }, (predictions, status) => {
                resolve(predictions);
            }).catch(err => {
                reject(err);
            });
        });
    }

    public GetDetails(placeId: string, map: google.maps.Map | HTMLDivElement): Promise<google.maps.places.PlaceResult | null> {
        return new Promise((resolve, reject) => {
            if (placeId === '') {
                resolve(null);
            }

            let service = new google.maps.places.PlacesService(map);
            console.log(service);
            service.getDetails({
                placeId: placeId
            }, function(result, status) {
                resolve(result)
            });
        })
    }
}
