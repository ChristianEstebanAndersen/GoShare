import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl } from '@angular/forms';
import { Driver } from 'src/app/_models/driver';

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.scss'],
})
export class DriverCardComponent  implements OnInit, ControlValueAccessor {
  @Input() driver: Driver | undefined;
  @Input() asFinal: boolean = false;
  @Output() driverClicked: EventEmitter<{ selected: boolean, driver: Driver | undefined }> = new EventEmitter<{ selected: boolean, driver: Driver | undefined }>();

  checkedForm: FormControl;
  onChanged: (selected: boolean) => void;
  onTouched: () => void = () => {};

  constructor(
    formBuilder: FormBuilder
  ) { 
    this.onChanged = () => {};
    this.checkedForm = formBuilder.control({ checked: Boolean });
    this.checkedForm.setValue(false);

    this.checkedForm.valueChanges.subscribe(e => {
      this.driverClicked.emit({ selected: e, driver: this.driver });
      this.onChanged(e);
      this.onTouched();
    });
  }
  
  ngOnInit() { }

  selectDriver() {
    this.checkedForm.setValue(!this.checkedForm.value);
  }

  writeValue(obj: boolean): void {
    this.checkedForm.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.checkedForm.enable();
    }
    else {
      this.checkedForm.disable();
    }
  }
}
