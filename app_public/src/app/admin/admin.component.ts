import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { fadeInAnimation } from '../_animations';

@Component({ templateUrl: 'admin.component.html',
    
// make fade in animation available to this component
animations: [fadeInAnimation] })
export class AdminComponent implements OnInit {
    loading = false;
    users: User[] = [];

    loginForm: FormGroup;    
    submitted = false;
    returnUrl: string;
    error = '';    
    searchTerm: string = "";
    
    receive: boolean;

    constructor(private userService: UserService, private formBuilder: FormBuilder,) { }

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
        });
        this.receive = true;
    }

    delete(id: number): void {    
        this.users = this.users.filter(l => l._id !== id);
        this.userService.deleteUser(id).subscribe();    
      }
}