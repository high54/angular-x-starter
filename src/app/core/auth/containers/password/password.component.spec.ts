import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
// Component
import { AuthPasswordComponent } from './password.component';
// Mocks
import { materialModules } from '../../../../mocks/material-modules.mock';

describe('AuthPasswordComponent', () => {
  let component: AuthPasswordComponent;
  let fixture: ComponentFixture<AuthPasswordComponent>;
  const email = 'test@test.com';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ...materialModules
      ],
      declarations: [AuthPasswordComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the email field', () => {
    expect(component.email).toBeTruthy();
    component.email.setValue(email);
    expect(component.email.value).toBe(email);
  });

  it('should be able to submit form', () => {
    expect(component.submitForm()).toBeFalsy();
    component.email.setValue(email);
    expect(component.submitForm()).toBeTruthy();
  });

});
