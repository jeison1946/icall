import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-image-message',
  templateUrl: './image-message.component.html',
  styleUrls: ['./image-message.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatIconModule
  ]
})
export class ImageMessageComponent {
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  imagepreview: string | ArrayBuffer | null;

  constructor() {
    this.imagepreview = null;
  }

  ngAfterViewInit() {
    this.fileInput?.nativeElement.click();
  }

  uploadFile(event:any) {
    const file:File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagepreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

}
