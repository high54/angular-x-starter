import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-users-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class UsersSignUpComponent implements OnInit {
  public title = 'Sign up';
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
    private fb: FormBuilder,
    private metaService: Meta,
    private titleService: Title
  ) { }

  public ngOnInit(): void {
    this.titleService.setTitle(this.titleService.getTitle() + ' - ' + this.title);
    this.metaService.addTags([
      { property: 'og:type', content: 'object' },
      { property: 'og:site_name', content: 'Angular X Starter' },
      { property: 'og:title', content: this.title },
      { property: 'og:description', content: 'github.com/high54/angular-x-starter' },
      { name: 'keywords', content: 'Angular, Universal, Example' },
      { name: 'description', content: 'Angular X Starter' },
      { name: 'robots', content: 'index, follow' }
    ]);
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
