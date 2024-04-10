import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualGaragePageComponent } from './individual-garage-page.component';

describe('IndividualGaragePageComponent', () => {
  let component: IndividualGaragePageComponent;
  let fixture: ComponentFixture<IndividualGaragePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualGaragePageComponent]
    });
    fixture = TestBed.createComponent(IndividualGaragePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
