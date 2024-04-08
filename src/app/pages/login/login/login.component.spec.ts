import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let service: LoginComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
