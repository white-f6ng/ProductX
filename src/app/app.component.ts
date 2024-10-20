import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: string = '';
  password: string = '';
  showProductLink: boolean = false;
  submitEnabled:boolean = false;
  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        filter((event: any) => event.url.startsWith('/product'))
      )
      .subscribe(() => {
        this.submitEnabled = true; 
      });
  }
  onSubmit() {
    if (this.username && this.password) {
      this.showProductLink = true;
      this.submitEnabled = true;
      this.router.navigate(['/product']);
    }
  }

  hideLink() {
    this.showProductLink = false; 
  }
}
