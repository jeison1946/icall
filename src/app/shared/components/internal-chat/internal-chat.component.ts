import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MessageService } from '../../services/message/message.service';
import { Socket } from 'ngx-socket-io';
import { FormControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-internal-chat',
  templateUrl: './internal-chat.component.html',
  styleUrls: ['./internal-chat.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class InternalChatComponent implements OnChanges{

  @Input() chat: any = {};

  @Input() idUser: string = '';

  public listChatsItems: Array<any> = [];

  public statusMessage: string = '';

  messageInput: string = '';

  constructor(private message: MessageService, private socket: Socket) {
  }

  ngOnInit(): void {
    this.socket.on('message', (data: any) => {  
      if(data.chat == this.chat._id) {
        this.listChatsItems.push(data)
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.listMessagesChat();
  }

  listMessagesChat() {
    this.message.getMessageByIdChat(this.chat._id).subscribe(response => {
      if (!response.error) {
        this.listChatsItems = response.message;
      }
    });
  }

  sendMessage(event: string) {

    const newMessage = {
      chat: this.chat._id,
      user: this.idUser,
      message: event
    }

    this.message.sendMessage(newMessage).subscribe(response => {
      if (!response.error) {
        this.messageInput = '';
      }
    });
  }
}
