import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '.././_services/authentication.service';
import { User } from '.././_models/user';
import { fadeInAnimation } from '../_animations';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
    
  // make fade in animation available to this component
  animations: [fadeInAnimation]
})


export class FooterComponent implements OnInit {
  currentUser: User;
  receive: boolean;
  
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.receive = true;
  }

}
