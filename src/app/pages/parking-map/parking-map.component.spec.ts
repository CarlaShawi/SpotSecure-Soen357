import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingMapComponent } from './parking-map.component';

describe('ParkingMapComponent', () => {
  let component: ParkingMapComponent;
  let fixture: ComponentFixture<ParkingMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingMapComponent]
    });
    fixture = TestBed.createComponent(ParkingMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
