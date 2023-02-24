import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from 'src/app/shared/guards/login.guard';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate: [LoginGuard],
        component: HomeComponent
      },
      {
        path: 'chats/:id',
        loadChildren: () => import('./chats/chats.module').then(m => m.ChatsModule),
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      }
    ]),
  ],
})
export class UserModule { }
