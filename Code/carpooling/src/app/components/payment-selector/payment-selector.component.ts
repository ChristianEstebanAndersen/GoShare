import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Payment } from 'src/app/_models/payment';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-payment-selector',
  templateUrl: './payment-selector.component.html',
  styleUrls: ['./payment-selector.component.scss'],
})
export class PaymentSelectorComponent  implements OnInit {
  @ViewChild('ion_modal') modal: IonModal | undefined;
  @Output('selectedPayment') selected: EventEmitter<Payment> = new EventEmitter<Payment>();

  payment: Payment = new Payment();

  promotionCode: string = "";
  useGoshare: boolean = true;
  constructor() { }

  ngOnInit() {}

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<google.maps.places.AutocompletePrediction>>
    
  }

  cancel() {
    this.modal?.dismiss();
  }

  select(type: "paypal" | "mobilepay") {
    this.modal?.dismiss();
    
    var payment = new Payment();
    payment.type = type;
    payment.useGoshare = this.useGoshare;
    this.payment = payment;
    this.selected.emit(payment);
  }
}
