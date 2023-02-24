import { Component } from '@angular/core';
import { ListUserService } from 'src/app/shared/services/list-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public listUserIcall: Array<any> = [];

  constructor() 
  {}

  ngOnInit(): void {
  }
}
