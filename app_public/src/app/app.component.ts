import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  currentUser: User;  

  constructor(private authenticationService: AuthenticationService,
              private titleService: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    const appTitle = this.titleService.getTitle();
    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;
          if (child.snapshot.data.title) {
            console.log('title: ' + child.snapshot.data.title);
            return child.snapshot.data.title;
          }
          return appTitle;
        })
      ).subscribe((ttl: string) => {        
        this.titleService.setTitle(ttl);
      });
  }

}
