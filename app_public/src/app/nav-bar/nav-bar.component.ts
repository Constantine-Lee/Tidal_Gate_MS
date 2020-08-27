import { Component, OnInit, Input } from '@angular/core';
import { User } from '.././_models/user';
import { Role } from '.././_models/role';
import { AuthenticationService } from '.././_services/authentication.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { fadeInAnimation } from '../_animations';
import { filter, map } from 'rxjs/operators';
import { LoggingService } from '../_services/logging.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: ['a.disabled { pointer-events: none; cursor: default; }'],
  // make fade in animation available to this component
  animations: [fadeInAnimation]
})
export class NavBarComponent implements OnInit {
  @Input('currentUser')
  currentUser: User;
  breadcrumb: [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private logger: LoggingService) { }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(_ => this.activatedRoute.firstChild.snapshot.data.breadcrumb)
      )
      .subscribe((bc: []) => {
        this.logger.debug(JSON.stringify(bc));
        this.breadcrumb = bc.sort(); 
      });
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
