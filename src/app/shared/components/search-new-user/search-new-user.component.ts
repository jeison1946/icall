import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { ListUserService } from '../../services/list-user/list-user.service';

@Component({
  selector: 'app-search-new-user',
  templateUrl: './search-new-user.component.html',
  styleUrls: ['./search-new-user.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
  ],
  providers: [
    ListUserService, 
    ChatService
  ]
})
export class SearchNewUserComponent {
  options: any[] = [];

  myControl = new FormControl('');

  @Input() idUser: string = '';

  @Output() chatSelect = new EventEmitter<any>();

  constructor(
    private listUserService: ListUserService,
    private listChats: ChatService,
    
  ) {
    this.myControl.valueChanges.subscribe(value => {
      if (value) {
        this.listUserService.getUserIcall(value, this.idUser).subscribe(response => {
          if (!response.error) {
            this.options = response.message
          }
        });
      }
      else {
        this.options = [];
      }
    })
  }

  selectUser(user: any): void {
    this.listChats.getChatsById(this.idUser).subscribe(value => {
      if(!value.message.length) {
        this.createNewChat(user);
      }
      else {
        value.message.forEach((element: any) => {
          if(element.users) {
            if(element.users.find((item: any) => item._id == user._id)) {
              this.onChatSelected(element);
            }
            else {
              this.createNewChat(user);
            }
          }
        });
      }
    });
  }

  createNewChat(user:any) {
    const newChat = [
      user._id,
      this.idUser
    ];
    this.listChats.createdChat(newChat).subscribe(response => {
      if (!response.error) {
        const modelChat = {
          _id: response.message._id,
          users: [
            user
          ]
        }
        this.onChatSelected(modelChat);
      }
    });
  }

  onChatSelected(chat: any) {
    this.chatSelect.emit(chat);
  }
}
