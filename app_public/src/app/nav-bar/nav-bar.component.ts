import { Component, OnInit, Input } from '@angular/core';
import { User } from '.././_models/user';
import { Role } from '.././_models/role';
import { AuthenticationService } from '.././_services/authentication.service';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../_animations';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',

  // make fade in animation available to this component
  animations: [fadeInAnimation]
})
export class NavBarComponent implements OnInit {
  @Input('currentUser')
  currentUser: User;
  receive: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.receive = true;
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
