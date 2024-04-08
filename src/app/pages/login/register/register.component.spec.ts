import { TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let service: RegisterComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
