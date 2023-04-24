import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class NavBarComponent {

  @Output() itemSelect = new EventEmitter<any>();

  @Input() listItems: any[] = [];

  public currentItem: string = 'chats'


  ngOnInit(): void {
    
  }

  onItemSelected(item: any) {
    this.itemSelect.emit(item);
    this.currentItem = item.id;
  }
}
