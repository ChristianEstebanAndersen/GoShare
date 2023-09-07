import { Component, OnInit } from '@angular/core';
import { Helper } from 'src/app/_helpers/helper';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent  implements OnInit {
  basePath: string = Helper.basePath;
  
  constructor() { }

  ngOnInit() {}

}
