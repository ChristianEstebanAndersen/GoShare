import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Helper } from '../_helpers/helper';

@Component({
  selector: 'app-login',
  templateUrl: './_layout.html',
  styleUrls: ['./_layout.scss'],
})
export class Layout {
  basePath: string = Helper.basePath;

  constructor(private navCtrl: NavController) {}

}