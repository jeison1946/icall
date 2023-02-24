import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListchatsComponent } from './listchats.component';

describe('ListchatsComponent', () => {
  let component: ListchatsComponent;
  let fixture: ComponentFixture<ListchatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListchatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListchatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
