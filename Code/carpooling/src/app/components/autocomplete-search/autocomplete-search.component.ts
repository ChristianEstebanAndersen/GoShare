import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { GoogleApi } from 'src/app/_services/google/googleapi';

@Component({
  selector: 'app-autocomplete-search',
  templateUrl: './autocomplete-search.component.html',
  styleUrls: ['./autocomplete-search.component.scss'],
})
export class AutocompleteSearchComponent  implements OnInit {
  @Output() select: EventEmitter<google.maps.places.AutocompletePrediction> = new EventEmitter();

  input: FormGroup;
  suggestions: suggestion[] = [];

  constructor(private googleApi: GoogleApi, fb: FormBuilder) { 
    this.input = fb.group({
      searchString: ''
    });

    this.input.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.Search();
    });
  }

  ngOnInit() {
    document.getElementById("inputForm")?.click();
  }

  Search() {
    var searchString = this.input?.get('searchString')?.value;
    if (!searchString || searchString == '') {
      this.suggestions = [];
      return;
    }

    this.googleApi.AutoComplete(searchString).then(predictions => {
      if (predictions) {
        this.suggestions = predictions.map(p => new suggestion(p.description, p));
      }
    }).catch(err => {
      console.log("An error occured: ", err);
    });
  }

  selectItem(value: any) {
    console.log("Select value");
    this.select.emit(value);
  }
}

export class suggestion {
  label: string = "";
  value: any;

  constructor(label: string, value: any){
    this.label = label;
    this.value = value;
  };
}