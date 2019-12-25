import { Component } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage {

  constructor(
      private router: Router
  ) { }

  onSubmit(values){
    console.log(values);
    this.router.navigate(["/form"]);
  }
}
