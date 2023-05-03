import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user/user.service';
// Google login


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public form: FormGroup;  

  constructor(private socialAuthService: SocialAuthService, private router: Router, private userService: UserService) {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.authSession();
  }

  async authSession() {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      
      if(user) {
        this.userService.getUserIcall(user.email).subscribe(response => {
          if (response.error || !response.message.length) {
            this.createUser(user);
          }
          else {
            const [userLoad] = response.message;
            this.setSessionLogin(user, userLoad);
          }
        });
      }
    });
  }

  createUser(user: SocialUser) {
    this.userService.createFile(user.photoUrl).subscribe(res => {
      this.userService.createUserIcall(user, res).subscribe(response => {
        if (!response.error) {
          this.setSessionLogin(user, response.message);
        }
      });
    });
  }

  setSessionLogin(user: SocialUser, userLoad: Object) {
    localStorage.setItem("token-session", btoa(user.idToken));
    localStorage.setItem("user-session", btoa(JSON.stringify(userLoad)));
    this.router.navigateByUrl('/'); 
  }

}
