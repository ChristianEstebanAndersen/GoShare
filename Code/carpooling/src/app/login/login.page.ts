import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Helper } from '../_helpers/helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = "";
  password: string = "";

  basePath: string = Helper.basePath;
  constructor(private navCtrl: NavController) {}

  login() {
    // Perform login logic here, e.g., call an API to authenticate
    // the user with the entered email and password
    
    // Once the login is successful, navigate to the home page
    this.navCtrl.navigateForward('/home');
  }
}