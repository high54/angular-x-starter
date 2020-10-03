import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-users-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class UsersSignUpComponent implements OnInit {
  public signUpForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    privacy: [false, Validators.requiredTrue],
    notifications: [false]
  });
  constructor(
    private fb: FormBuilder
  ) { }

  public ngOnInit(): void {
  }
  public submitForm(): void {
    const { value, valid } = this.signUpForm;
    if (valid) {
      console.log(value);
    }
  }
  get firstName(): AbstractControl {
    return this.signUpForm.get('firstName');
  }
  get lastName(): AbstractControl {
    return this.signUpForm.get('lastName');
  }
  get username(): AbstractControl {
    return this.signUpForm.get('lasusernameName');
  }
  get email(): AbstractControl {
    return this.signUpForm.get('email');
  }
  get password(): AbstractControl {
    return this.signUpForm.get('password');
  }
  get privacy(): AbstractControl {
    return this.signUpForm.get('privacy');
  }
  get notifications(): AbstractControl {
    return this.signUpForm.get('notifications');
  }
}
