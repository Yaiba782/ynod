﻿import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http) { 
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) { 
                    this.token = token;

                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token}));
                    /*
                    *
                    *
                    *   GET THE CURRENT BALANCE OF THE USER HERE
                    *
                    * */
                    return true;
                } else { 
                    return false;
                }
            });
    }

    logout(): void { 
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}