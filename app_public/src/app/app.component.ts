import { Component } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  currentUser: User;
  title = 'prod-ready';

  constructor(    
    private authenticationService: AuthenticationService
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}

}
