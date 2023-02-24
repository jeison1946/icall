import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listchats',
  templateUrl: './listchats.component.html',
  styleUrls: ['./listchats.component.scss']
})
export class ListchatsComponent {

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params['id']);
  }
}
