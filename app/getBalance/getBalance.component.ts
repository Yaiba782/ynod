﻿import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'getBalance.component.html'
})

export class getBalance implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService){}
    ngOnInit(){
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
            });
        return getBalance;
    }
}