import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';
// Services
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-auth-sign-in',
  templateUrl: './sign-in.component.html'
})
export class AuthSignInComponent implements OnInit {
  public title = `Sign in`;
  public signInForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false]
  });
  public hide = true;
  constructor(
    private fb: FormBuilder,
    private appService: AppService
  ) { }

  public ngOnInit(): void {
    this.appService.title = this.title;
  }
  public submitForm(): boolean {
    const { valid } = this.signInForm;
    if (valid) {
      return true;
    }
    return;
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
