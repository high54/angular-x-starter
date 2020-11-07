import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
// Components
import { AuthSignInComponent } from './sign-in.component';
// Mocks
import { materialModules } from '../../../../mocks/material-modules.mock';
describe('AuthSignInComponent', () => {
  let component: AuthSignInComponent;
  let fixture: ComponentFixture<AuthSignInComponent>;
  const login = 'login';
  const password = 'password';
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ...materialModules
      ],
      declarations: [AuthSignInComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get the login field', () => {
    expect(component.login).toBeTruthy();
    component.login.setValue(login);
    expect(component.login.value).toBe(login);
  });
  it('should get the password field', () => {
    expect(component.password).toBeTruthy();
    component.password.setValue(password);
    expect(component.password.value).toBe(password);
  });
  it('should get the rememberMe field', () => {
    expect(component.rememberMe).toBeTruthy();
    expect(component.rememberMe.value).toBeFalse();
  });

  it('should be able to submit form', () => {
    expect(component.submitForm()).toBeFalsy();
    component.login.setValue(login);
    component.password.setValue(password);
    expect(component.submitForm()).toBeTruthy();
  });
});
