import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class AuthSignInComponent implements OnInit {
  public signInForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false]
  });
  public hide = true;
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
