import { Component } from '@angular/core';
import { UtilitiesService } from 'src/app/shared/services/utilities/utilities.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent {

  public chatSelect: any = {};
  public currentUser: any;
  public title = 'iCall';

  constructor(private utilities: UtilitiesService) 
  {}

  ngOnInit(): void {
    this.getSessionUser()
  }

  async getChatSelect(event: any) {
    this.chatSelect = event;
    if(event.users) {
      this.title = event.users[0].name
    }
  }


  getSessionUser() {
    this.currentUser = this.utilities.getLocalStorage('user-session', true);
  }

}
