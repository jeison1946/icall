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
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-list-chats',
  templateUrl: './list-chats.component.html',
  styleUrls: ['./list-chats.component.scss'],
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
    MatIconModule
  ]
})

export class ListChatsComponent {
  public listUserItems: Array<any> = [];

  @Output() chatSelect = new EventEmitter<any>();

  @Input() idUser: string = '';

  public currentChat: string = '';

  options: any[] = [];

  myControl = new FormControl('');

  constructor(
    private listChats: ChatService,
    private listUserService: ListUserService
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

  ngOnInit(): void {
    this.listItemsUsers();
  }

  listItemsUsers(): void {
    this.listChats.getChatsById(this.idUser).subscribe(response => {
      if (!response.error) {
        this.buildInfoChats(response.message)
      }
    });
  }

  onChatSelected(chat: any) {
    this.chatSelect.emit(chat);
    this.currentChat = chat._id;
  }

  buildInfoChats(data: Array<any>) {
    data.forEach((element: any) => {
      this.listUserItems.push({
        _id: element._id,
        users: element.users.filter((e: any) => {
          return e._id != this.idUser
        })
      });
    });
  }

  selectUser(user: any): void {
    let existChat:any | boolean = false;
    this.listUserItems.forEach((element: any) => {
      if(element.users) {
        if(element.users.find((item: any) => item._id == user._id)) {
          existChat = element;
        }
      }
    });

    if(!existChat) {
      const newChat = [
        user._id,
        this.idUser
      ]
      this.createNewChat(newChat, user);
    }
    else {
      this.onChatSelected(existChat);
    }
    this.myControl.setValue('')
    this.options = [];
    
  }

  createNewChat(users: Array<any>, user:any): void{
    this.listChats.createdChat(users).subscribe(response => {
      if (!response.error) {
        let addNewChat = {
          _id: response.message._id,
          users: [
            user
          ]
        }
        this.listUserItems.push(addNewChat);
        this.chatSelect.emit(addNewChat);
        this.currentChat = response.message._id;
      }
    });
  }
}
