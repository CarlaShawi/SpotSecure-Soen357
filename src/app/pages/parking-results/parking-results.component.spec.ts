import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingResultsComponent } from './parking-results.component';

describe('ParkingResultsComponent', () => {
  let component: ParkingResultsComponent;
  let fixture: ComponentFixture<ParkingResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingResultsComponent]
    });
    fixture = TestBed.createComponent(ParkingResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
