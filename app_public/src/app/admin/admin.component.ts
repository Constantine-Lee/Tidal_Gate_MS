import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { fadeInAnimation } from '../_animations';
import { Role } from '../_models/role';
import { Router } from '@angular/router';
import { LoggingService } from '../_services/logging.service';

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
    userExist = false;
    receive: boolean;

    _idToDelete: number;
    
    constructor(private userService: UserService,
                private formBuilder: FormBuilder,
                private logger: LoggingService) { }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            role: ['Supervisor']
        });

        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users.filter(user => user.role == 'User' || user.role == 'Supervisor');
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

    showConfirmationModal(id: number) {
        this.logger.info("Function: showConfirmationModal(id: string)");
        this.logger.info("id: string" + id);
    
        this._idToDelete = id;
        $('#confirmationModal').modal('show');
      }

    delete(): void {
        this.logger.info("Function: delete()");
        this.users = this.users.filter(l => l._id !== this._idToDelete);
        this.listedUsers = this.listedUsers.filter(user => user._id !== this._idToDelete);
        this.userService.deleteUser(this._idToDelete).subscribe();
    }

    onSubmit() {
        this.logger.info('this.loginForm.controls.username.value: ' + this.f.username.value);
        this.submitted = true;
        const operator = new User({
            username: this.f.username.value,
            password: this.f.password.value,
            role: this.f.role.value == "Supervisor" ? Role.Supervisor : Role.User
        })
        this.userService.addOperator(operator).subscribe(
            _ => {
                this.submitted = false;
                $('#exampleModal').modal('hide');
                this.ngOnInit();
            },
            err => {
                console.log('err: ' + err.error);
                if (err.error == 'Username exists.') {
                    this.userExist = true;
                }                             
            }
        );
    }

    reset() {
        this.userExist = false;
    }
}