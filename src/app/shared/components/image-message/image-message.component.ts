import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-message',
  templateUrl: './image-message.component.html',
  styleUrls: ['./image-message.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ]
})
export class ImageMessageComponent {

  @Input() imagepreview:string | null = null;

  @Output() callBack = new EventEmitter<any>();

  messageInput: string = '';

  sendCallBack(text: string) {
    this.callBack.emit(text);
  }
}
