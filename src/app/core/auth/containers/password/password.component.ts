import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-auth-password',
  templateUrl: './password.component.html'
})
export class AuthPasswordComponent implements OnInit {
  public newPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });
  constructor(
    private fb: FormBuilder
  ) { }

  public ngOnInit(): void {
  }
  public submitForm(): boolean {
    const { valid } = this.newPasswordForm;
    if (valid) {
      return true;
    }
    return;
  }
  get email(): AbstractControl {
    return this.newPasswordForm.get('email');
  }
}
