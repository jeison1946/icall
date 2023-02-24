import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
// Google login


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public form: FormGroup;  
  user?: SocialUser;

  constructor(private socialAuthService: SocialAuthService, private router: Router) {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    document.body.className = 'login-page';
    this.authSession();
  }

  async authSession() {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      if(user) {
        localStorage.setItem("token-session", btoa(user.idToken));
        localStorage.setItem("user-session", btoa(JSON.stringify(user)));
        this.router.navigateByUrl('/');
      }
    });
  }

}
