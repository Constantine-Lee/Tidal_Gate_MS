import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';

import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { fadeInAnimation } from '../_animations';

@Component({
    templateUrl: 'user-profile.component.html',

    // make fade in animation available to this component
    animations: [fadeInAnimation]
})
export class UserProfileComponent {
    loading = false;
    currentUser: User;
    userFromApi: User;
    receive: boolean;
    
    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loading = true;
        /*this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.loading = false;
            this.userFromApi = user;
        });*/
        this.receive = true;
    }
}