import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-users-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class UsersPasswordComponent implements OnInit {
  public newPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });
  constructor(
    private fb: FormBuilder
  ) { }

  public ngOnInit(): void {
  }
  public submitForm(): void {
    const { value, valid } = this.newPasswordForm;
    if (valid) {
      console.log(value);
    }
  }
  get email(): AbstractControl {
    return this.newPasswordForm.get('email');
  }
}
