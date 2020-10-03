import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class UsersSignInComponent implements OnInit {
  public signInForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  public ngOnInit(): void {
  }
  public submitForm(): void {
    const { value, valid } = this.signInForm;
    if (valid) {
      console.log(value);
    }
  }
  get login(): AbstractControl {
    return this.signInForm.get('login');
  }
  get password(): AbstractControl {
    return this.signInForm.get('password');
  }
  get rememberMe(): AbstractControl {
    return this.signInForm.get('rememberMe');
  }
}
