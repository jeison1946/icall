import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.isLoggedIn();
  }


  isLoggedIn(): any {
    const token = this.getLocalStorage("token-session");
    if(token) {
      this.userService.statusUser(atob(token)).pipe(
        catchError(error => {
          return this.router.navigateByUrl('/login');
        })
      ).subscribe(response => {
        return true;
      });
    }
    else {
      return this.router.navigateByUrl('/login');
    }
  }

  getLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }
  
}
