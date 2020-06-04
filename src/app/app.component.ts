import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterEvent } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'E głosowanie';
  loading = false;
  helpTimeout = true;

  constructor(private router: Router) {
    this.resetTimeout();
    this.router.events.subscribe((event: RouterEvent) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          
          this.resetTimeout();
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  resetTimeout() {
      this.helpTimeout = true;
      timer(5000).subscribe(t => this.helpTimeout = false);
  }

  get isUpload() {
    return this.router.url === '/upload';
  }

  openUpload() {
    console.log('open upload');
  }
}
