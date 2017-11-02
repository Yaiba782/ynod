import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { getBalance } from './getBalance/index';
import { HomeComponent } from './home/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'getBalance', component: getBalance},
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);