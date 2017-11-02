import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
 

import { BackendProvider } from './_services/backend'; 
import { BaseRequestOptions } from '@angular/http';

import { MockBackend, MockConnection } from '@angular/http/testing';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AuthGuard } from './_guards/index';
import { AuthenticationService, UserService } from './_services/index';
import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { getBalance } from './getBalance/index';
import { credit } from './credit/index';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        getBalance,
        credit
    ],
    providers: [
        AuthGuard,  
        AuthenticationService,
        UserService,
        BackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }