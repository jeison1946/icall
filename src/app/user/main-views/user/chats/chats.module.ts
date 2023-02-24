import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListchatsComponent } from './listchats/listchats.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ListchatsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListchatsComponent
      },
    ]),
  ]
})
export class ChatsModule { }
