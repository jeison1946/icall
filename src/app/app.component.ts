import { Component, Renderer2 } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  previousUrl: any;

  public loginUser: string | null = '';
  
  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit(): void {
    this.getClassCurrentPage();
    this.getSession()
  }

  getClassCurrentPage() {
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.previousUrl) {
          this.renderer.removeClass(document.body, this.previousUrl);
        }
        let currentUrlSlug = event.url.slice(1)
        if (currentUrlSlug) {
          this.renderer.addClass(document.body, currentUrlSlug);
        }
        this.previousUrl = currentUrlSlug;
      }
    });
  }

  getSession() {
    this.loginUser = localStorage.getItem('token-session')
  }
 }
