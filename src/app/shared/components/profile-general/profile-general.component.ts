import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-general',
  templateUrl: './profile-general.component.html',
  styleUrls: ['./profile-general.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class ProfileGeneralComponent {
  @Input() user: any;

  ngOnInit(): void {
  }
}
