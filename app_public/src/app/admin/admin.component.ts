import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { fadeInAnimation } from '../_animations';
import { Role } from '../_models/role';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

//for modal
declare var $: any;

@Component({
    templateUrl: 'admin.component.html',

    // make fade in animation available to this component
    animations: [fadeInAnimation]
})
export class AdminComponent implements OnInit {
    loading = false;
    users: User[] = [];
    listedUsers: User[] = [];
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;
    error = '';
    searchTerm: string = "";

    receive: boolean;

    constructor(private userService: UserService,
        private formBuilder: FormBuilder,
        private router: Router,
        private logger: NGXLogger) { }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users.filter(user => user.role == 'User');
            console.log(this.users);
            this.search();
        });
        this.receive = true;
    }

    search() {
        this.listedUsers = this.users;
        console.log(this.searchTerm);
        if (this.searchTerm != "") {
            this.listedUsers = this.users
                .filter(i =>
                    i.username.includes(this.searchTerm));
        }       
    }

    delete(id: number): void {
        this.users = this.users.filter(l => l._id !== id);
        this.listedUsers = this.listedUsers.filter(user => user._id !== id);
        this.userService.deleteUser(id).subscribe();
    }

    onSubmit() {
        this.logger.info('this.loginForm.controls.username.value: ' + this.f.username.value);
        this.submitted = true;
        const operator = new User({
            username: this.f.username.value,
            password: this.f.password.value,
            role: Role.User
        })
        this.userService.addOperator(operator).subscribe(
            _ => {
                this.submitted = false;
                $('#exampleModal').modal('hide');
                this.ngOnInit();
            }
        );
    }
}