import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  public userCurrent:any;
  name = 'Angular';
  public isCollapsed = true;

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.userCurrent = JSON.parse(atob(localStorage.getItem("user-session") || "{}"));
  }
}
