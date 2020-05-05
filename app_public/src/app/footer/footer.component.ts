import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '.././_services/authentication.service';
import { User } from '.././_models/user';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})


export class FooterComponent implements OnInit {
  currentUser: User;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

}
