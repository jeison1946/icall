import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GoogleLoginProvider, SocialLoginModule } from '@abacritt/angularx-social-login';
import { ReactiveFormsModule } from '@angular/forms';
import { SessionGuard } from 'src/app/shared/guards/session.guard';
import { UserService } from 'src/app/shared/services/user/user.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
        canLoad: [SessionGuard]
      },
    ]),
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    SocialLoginModule,
    HttpClientModule
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
    },
  },
  UserService
  ],
})
export class LoginModule { }
