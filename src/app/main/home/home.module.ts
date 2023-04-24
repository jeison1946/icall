import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
//Modules
import { RouterModule } from '@angular/router';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
//Guard
import { LoginGuard } from 'src/app/shared/guards/login.guard';
//Services
import { ChatService } from 'src/app/shared/services/chat/chat.service';
import { MessageService } from 'src/app/shared/services/message/message.service';
//Component Import
import { ListChatsComponent } from 'src/app/shared/components/list-chats/list-chats.component';
import { InternalChatComponent } from 'src/app/shared/components/internal-chat/internal-chat.component';
import { ChatsComponent } from './chats/chats.component';
import { NavBarComponent } from 'src/app/shared/components/nav-bar/nav-bar.component';
import { NewChatComponent } from './new-chat/new-chat.component';
import { ListUserService } from 'src/app/shared/services/list-user/list-user.service';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


@NgModule({
  declarations: [
    HomeComponent,
    ChatsComponent,
    NewChatComponent
  ],
  imports: [
    //Modules
    CommonModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        canActivate: [LoginGuard],
      },
    ]),
    //Conponents
    ListChatsComponent,
    InternalChatComponent,
    NavBarComponent,
  ],
  providers:[
    ChatService,
    MessageService,
    ListUserService
  ]
})
export class HomeModule { }
