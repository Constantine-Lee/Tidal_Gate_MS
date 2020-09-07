import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { fadeInAnimation } from '../_animations';
import { LoggingService } from '../_services/logging.service';

@Component({
    templateUrl: 'login.component.html',
    // make fade in animation available to this component
    animations: [fadeInAnimation]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    receive: boolean;
    // convenience getter for easy access to form fields
    get loginFormControls() {
        return this.loginForm.controls;
    }

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private logger: LoggingService
    ) {
        
    }

    ngOnInit() {
        this.logger.info('AuthenticationSerice.currentUserValue: '+this.authenticationService.currentUserValue);
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.logger.info("this.route.snapshot.queryParams['returnUrl']: "+this.route.snapshot.queryParams['returnUrl']);
        
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.receive = true;
    }



    onSubmit() {
        this.submitted = true;

        this.logger.info("this.loginForm.invalid: "+this.loginForm.invalid);

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        // start loading animation
        this.loading = true;

        this.logger.info("this.loginFormControls.username.value: "+this.loginFormControls.username.value);
        this.logger.info("this.loginFormControls.password.value: "+this.loginFormControls.password.value);
        
        this.authenticationService.login(this.loginFormControls.username.value, this.loginFormControls.password.value)
            .subscribe(
                _ => {
                    this.logger.info("this.returnUrl: "+this.returnUrl);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.logger.error("AuthenticationService Login Error: "+JSON.stringify(error));

                    this.error = error.error.message;
                    this.logger.info("this.error: "+this.error);
                    
                    this.loading = false;
                });
    }
}