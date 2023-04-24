import { Component } from '@angular/core';
import { UtilitiesService } from 'src/app/shared/services/utilities/utilities.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public navItems: any[] = [
    {title: 'Chats', id: 'chats'},
    {title: 'Inicia un chat', id: 'new-chat'},
  ];

  selectedComponent: any = {};

  constructor() {}

  loadComponent(event: any) {
    this.selectedComponent = event;
  }
}
