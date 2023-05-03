import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchNewUserComponent } from 'src/app/shared/components/search-new-user/search-new-user.component';
;
import { UtilitiesService } from 'src/app/shared/services/utilities/utilities.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent {

  public chatSelect: Object | null = null;
  public currentUser: any;
  public title = 'iCall';

  constructor(private utilities: UtilitiesService, private modalService: NgbModal) 
  {}

  ngOnInit(): void {
    this.getSessionUser();
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

  callbakcReturn() {
    this.chatSelect = null;
  }

  openSearchModal() {
    const modalRef = this.modalService.open(
      SearchNewUserComponent,
      {
        size:'lg',
        windowClass: 'modal-optionsw',
        backdropClass: 'fixed-block',
      }
    );
    modalRef.componentInstance.idUser = this.currentUser._id;
    modalRef.componentInstance.chatSelect.subscribe((response: any) => {
      this.title = response.users[0].name
      this.chatSelect = response;
      modalRef.close();
    });
    
  }

}
