import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginGuard } from 'src/app/shared/guards/login.guard';
import { HomeComponent } from './home.component';
import { ListChatsComponent } from 'src/app/shared/components/list-chats/list-chats.component';
import { InternalChatComponent } from '../../../../shared/components/internal-chat/internal-chat.component';




@NgModule({
  declarations: [
    HomeComponent,
    ListChatsComponent,
    InternalChatComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        canActivate: [LoginGuard],
      },
    ]),
  ]
})
export class HomeModule { }
