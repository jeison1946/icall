import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
//Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GoogleLoginProvider, SocialLoginModule } from '@abacritt/angularx-social-login';
import { LoginGuard } from '../../../../shared/guards/login.guard';
//google


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent
      },
    ]),
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true, //keeps the user signed in
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('178464696864-i0f4el4n9miufh64hantcdgdphh9g391.apps.googleusercontent.com', {
            scopes: ['email']
            // hosted_domain: "nivelics.co",
          })
        }
      ]
    }
  }],
})
export class LoginModule { }
