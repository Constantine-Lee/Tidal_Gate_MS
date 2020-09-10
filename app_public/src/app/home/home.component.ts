import { Component } from '@angular/core';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { fadeInAnimation } from '../_animations';

@Component({
    templateUrl: 'home.component.html',

    // make fade in animation available to this component
    animations: [fadeInAnimation]
})
export class HomeComponent {
    loading = false;
    currentUser: User;
    userFromApi: User;
    receive: boolean;
    
    constructor(        
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loading = true;
        this.receive = true;
    }
}