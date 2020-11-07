import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
// Components
import { AuthSignUpComponent } from './sign-up.component';
// Mocks
import { materialModules } from '../../../../mocks/material-modules.mock';
describe('AuthSignUpComponent', () => {
  let component: AuthSignUpComponent;
  let fixture: ComponentFixture<AuthSignUpComponent>;
  const firstName = 'firstName';
  const lastName = 'lastName';
  const username = 'username';
  const email = 'test@test.com';
  const password = 'password';
  const privacy = true;
  const notifications = true;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ...materialModules
      ],
      declarations: [AuthSignUpComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the firstName field', () => {
    expect(component.firstName).toBeTruthy();
    component.firstName.setValue(firstName);
    expect(component.firstName.value).toBe(firstName);
  });
  it('should get the lastName field', () => {
    expect(component.lastName).toBeTruthy();
    component.lastName.setValue(lastName);
    expect(component.lastName.value).toBe(lastName);
  });
  it('should get the username field', () => {
    expect(component.username).toBeTruthy();
    component.username.setValue(username);
    expect(component.username.value).toBe(username);
  });
  it('should get the email field', () => {
    expect(component.email).toBeTruthy();
    component.email.setValue(email);
    expect(component.email.value).toBe(email);
  });
  it('should get the password field', () => {
    expect(component.password).toBeTruthy();
    component.password.setValue(password);
    expect(component.password.value).toBe(password);
  });
  it('should get the privacy field', () => {
    expect(component.privacy).toBeTruthy();
    component.privacy.setValue(privacy);
    expect(component.privacy.value).toBeTrue();
  });
  it('should get the notifications field', () => {
    expect(component.notifications).toBeTruthy();
    component.notifications.setValue(notifications);
    expect(component.notifications.value).toBeTrue();
  });
  it('should be able to submit form', () => {
    expect(component.submitForm()).toBeFalsy();

    component.signUpForm.patchValue({
      firstName,
      lastName,
      username,
      email,
      password,
      privacy,
      notifications
    });

    expect(component.submitForm()).toBeTruthy();
  });
});
