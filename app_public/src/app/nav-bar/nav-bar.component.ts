import { Component, OnInit, Input } from '@angular/core';
import { User } from '.././_models/user';
import { Role } from '.././_models/role';
import { AuthenticationService } from '.././_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent implements OnInit {
  @Input ('currentUser')
  currentUser: User;
  
  constructor( private router: Router, private authenticationService: AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
