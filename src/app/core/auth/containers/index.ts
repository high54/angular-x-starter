import { AuthSignUpComponent } from './sign-up/sign-up.component';
import { AuthSignInComponent } from './sign-in/sign-in.component';
import { AuthPasswordComponent } from './password/password.component';

export const containers: any[] = [
    AuthSignUpComponent,
    AuthSignInComponent,
    AuthPasswordComponent
];
export * from './sign-up/sign-up.component';
export * from './sign-in/sign-in.component';
export * from './password/password.component';
