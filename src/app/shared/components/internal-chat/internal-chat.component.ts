import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MessageService } from '../../services/message/message.service';
import { Socket } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-internal-chat',
  templateUrl: './internal-chat.component.html',
  styleUrls: ['./internal-chat.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatIconModule
  ]
})
export class InternalChatComponent implements OnChanges{

  @Input() chat: any = {};

  @Input() idUser: string = '';

  public listChatsItems: Array<any> = [];

  public statusMessage: string = '';

  public today: Date = new Date;
  public yesterday: Date = new Date(this.today.getTime() - (24 * 60 * 60 * 1000));
  

  messageInput: string = '';

  @ViewChild('nombreDelContenedor') contenedor: ElementRef | undefined;

  constructor(private message: MessageService, private socket: Socket) {
  }

  ngOnInit(): void {
    this.socket.on('message', (data: any) => {  
      if(data.chat == this.chat._id) {
        //this.listChatsItems.push(data);
        this.pushInfo(data);
        this.scroolTo();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.listMessagesChat();
    this.scroolTo(500);
    
  }

  listMessagesChat() {
    this.message.getMessageByIdChat(this.chat._id).subscribe(response => {
      if (!response.error && response.message) {
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

  scroolTo(time: number = 200) {
    setTimeout(() => {
      const container = this.contenedor?.nativeElement;
      container.scrollTop = container.scrollHeight;
    }, time);
  }

  pushInfo(data: any) {
    const dateCurrent = formatDate(this.today, 'YYYY-MM-d', 'en-GB');
    const posicion = this.listChatsItems.findIndex(elemento => elemento._id === dateCurrent);
    console.log(posicion)
    if(posicion && posicion !== -1) {
      this.listChatsItems[posicion]?.messages?.push(data)
    } else {
      const newMessage = {
        _id: dateCurrent,
        messages:[
          data
        ]
      }
      
      this.listChatsItems.push(newMessage)
    }
  }
}
